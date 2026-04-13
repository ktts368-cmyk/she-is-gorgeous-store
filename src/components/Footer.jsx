import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>She is Gorgeous</h3>
          <p>Redefining elegance with every drape. Discover premium ethnic wear crafted for the modern woman.</p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Bridal Collection</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Join the Club</h4>
          <p>Subscribe for exclusive updates, new arrivals, and insider-only discounts.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} She is Gorgeous. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
