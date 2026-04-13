import { useState, useEffect } from 'react';
import './FeaturedCollections.css';

const FeaturedCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from our new Express API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="collections" className="collections-section">
      <div className="collections-header">
        <h2 className="section-title">Trending Styles</h2>
        <p className="section-subtitle">Curated masterpieces for the modern woman</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading stunning collections...</p>
      ) : (
        <div className="collections-grid">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCollections;
