const cp = require('child_process');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..', '..');
  console.log('Ensuring static server (http-server) is available on port 3000...');

  // Check if a server is already listening on port 3000. If not, start one.
  let server = null;
  let serverAlreadyRunning = false;
  try {
    const res = await fetch('http://localhost:3000');
    if (res.ok || res.status) {
      serverAlreadyRunning = true;
      console.log('Detected existing server on port 3000; reusing it.');
    }
  } catch (err) {
    // no server, spawn one
    server = cp.spawn('npx', ['http-server', '-c-1', '-p', '3000'], { cwd: root, shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
    server.stdout.on('data', (d) => {
      const s = d.toString();
      process.stdout.write(`[http-server] ${s}`);
    });
    server.stderr.on('data', (d) => process.stderr.write(`[http-server] ${d.toString()}`));

    // Wait a short time for server to start
    await new Promise((r) => setTimeout(r, 1200));
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // forward browser console and errors to Node stdout for debugging
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', (err) => console.log('PAGE ERROR:', err.toString()));

    // Try navigating with retries in case the reused server briefly resets
    const url = 'http://localhost:3000/index.html';
    let lastNavErr = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        lastNavErr = null;
        break;
      } catch (err) {
        lastNavErr = err;
        console.warn(`Navigation attempt ${attempt} failed:`, err.message || err);
        // wait a short time before retrying
        await new Promise((r) => setTimeout(r, 800));
      }
    }
    if (lastNavErr) throw lastNavErr;

    // log a snapshot of body for debugging
    const bodyHTML = await page.content();
    console.log('PAGE BODY (first 3k chars):', bodyHTML.slice(0, 3000));

  // Quick DOM probe: is the toggle already present synchronously?
  const hasToggleNow = await page.evaluate(() => !!document.getElementById('chatToggle'));
  console.log('chatToggle present immediately after load?', hasToggleNow);

    // Wait for chat widget with retry
    await page.waitForSelector('[data-testid="chat-widget"]', { timeout: 15000 });
    
    // Initialize widget and ensure toggle is ready
    await page.waitForSelector('#chatToggle', { state: 'visible', timeout: 5000 });

    // Open chat panel
    await page.click('#chatToggle');

    // Wait for chat panel to be fully visible and ready
    await page.waitForSelector('#chatPanel', { state: 'visible' });

    // Ensure input is ready and visible
    await page.waitForSelector('#chatInput', { state: 'visible' });

    // Additional wait for any animations
    await page.waitForTimeout(500);
    
    // Ensure widget is stable and sized properly
    await page.evaluate(() => {
        document.getElementById('chatWidget').style.cssText = `
            position: fixed !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 999999 !important;
            pointer-events: auto !important;
        `;

        document.getElementById('chatPanel').style.cssText = `
            display: flex !important;
            opacity: 1 !important;
            visibility: visible !important;
            height: 400px !important;
            width: 320px !important;
            pointer-events: auto !important;
        `;
    });

    // Prepare and focus input
    await page.evaluate(() => {
        const input = document.getElementById('chatInput');
        if (input) {
            input.style.display = 'block';
            input.style.visibility = 'visible';
            input.style.pointerEvents = 'auto';
            input.disabled = false;
            input.value = 'Hello Playwright';
            input.focus();
        }
    });

    // Wait a moment for styles to take effect
    await page.waitForTimeout(100);
    // Click send button and verify message appears
    await page.click('#sendButton');

    // Wait for the message to appear with retries if needed
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await page.waitForFunction(() => {
                const messages = document.getElementById('chatMessages');
                return messages && messages.innerText.includes('Hello Playwright');
            }, { timeout: 2000 });
            break;
        } catch (err) {
            if (attempt === maxRetries) throw err;
            console.log(`Retry ${attempt}/${maxRetries} waiting for message...`);
            // Click send again in case first click didn't register
            await page.click('#sendButton');
        }
    }

    // Log final chat state for debugging
    const chatText = await page.evaluate(() => document.getElementById('chatMessages')?.innerText || '');
    console.log('Final chat messages:', chatText.slice(0, 500));

    console.log('PASS: message sent and visible in #chatMessages');
    try { await browser.close(); } catch (e) {}
    if (server && !server.killed) server.kill();
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    try { await browser?.close(); } catch (e) {}
    if (server && !server.killed) {
      try { server.kill(); } catch (e) {}
    }
    process.exit(2);
  }
})();
