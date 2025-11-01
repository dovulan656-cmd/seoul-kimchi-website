export default function ContactToggle({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open contact form"
      style={{
        position: 'fixed',
        right: '2rem',
        bottom: '10rem',
        width: '3.5rem',
        height: '3.5rem',
        background: '#C8102E',
        color: 'white',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#8B0000';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#C8102E';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <i className="fas fa-envelope" aria-hidden="true"></i>
    </button>
  );
}
