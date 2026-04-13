import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content animate-fade-in">
        <span className="hero-subtitle delay-100">The Modern Ethnicity</span>
        <h1 className="hero-title delay-200">Embrace Your Inner Elegance</h1>
        <p className="hero-desc delay-300">
          Discover our exclusive collection of premium silk and modern sarees. 
          Crafted for the woman who owns the room.
        </p>
        <button className="cta-button delay-500">Shop The Collection</button>
      </div>
      <div className="hero-image-wrapper animate-fade-in delay-200">
        <img 
          src="/hero_saree_1776086628380.png" 
          alt="Elegant deep maroon saree" 
          className="hero-image"
        />
        <div className="hero-glass-accent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
