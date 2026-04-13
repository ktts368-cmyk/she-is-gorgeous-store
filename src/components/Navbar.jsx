import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar animate-slide-down">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#">She is Gorgeous</a>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#collections">Collections</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div className="nav-actions">
          <button className="cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-count">2</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
