// ===== FORM SUBMISSION HANDLER =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value || 'Không có tiêu đề',
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                showErrorMessage();
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showErrorMessage();
                return;
            }

            // Phone validation (Vietnam)
            const phoneRegex = /(0[1-9])\d{8,9}\b/;
            if (!phoneRegex.test(formData.phone)) {
                showErrorMessage();
                return;
            }

            // Submit to Formspree (already configured in HTML form action)
            // The form will automatically submit to the action URL
            console.log('Form data to submit:', formData);
            
            // Show success message after 2 seconds
            setTimeout(() => {
                showSuccessMessage();
                contactForm.reset();
            }, 500);
        });
    }
});

// ===== SHOW SUCCESS MESSAGE =====
function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    if (successMsg) {
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// ===== SHOW ERROR MESSAGE =====
function showErrorMessage() {
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    if (errorMsg) {
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 5000);
    }
}

// ===== FLOATING BAR ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const floatingBar = document.getElementById('floatingBar');
    if (floatingBar) {
        // Fade in animation
        floatingBar.style.opacity = '0';
        floatingBar.style.animation = 'fadeIn 1s ease-in forwards';
    }
});

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('button.md\\:hidden');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            alert('Menu di động: Thêm menu responsif tại đây');
        });
    }
});