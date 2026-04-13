import { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  
  // Basic mock auth state just so it feels like a real admin panel
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect password. Try admin123');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) return alert('Please fill all fields');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setName('');
        setPrice('');
        setImage(null);
        // Reset file input
        document.getElementById('file-input').value = "";
        fetchProducts();
      } else {
        alert('Failed to upload product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this beautiful saree from the store?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2 style={{ fontFamily: 'var(--font-italian)', fontSize: '3rem', color: 'var(--accent-gold)' }}>Store Admin</h2>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login to Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2 style={{ fontFamily: 'var(--font-italian)', fontSize: '2.5rem', color: 'var(--accent-gold)' }}>She is Gorgeous</h2>
        <span className="admin-badge">Admin Dashboard</span>
        <a href="/" className="back-store-btn">View Storefront</a>
      </header>

      <main className="admin-main">
        <section className="add-product-section">
          <h3>Add New Product</h3>
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Saree Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Royal Pink Silk" required />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. $450" required />
            </div>
            <div className="form-group">
              <label>Product Photo</label>
              <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} required />
            </div>
            <button type="submit" className="submit-btn">Upload to Store</button>
          </form>
        </section>

        <section className="manage-products-section">
          <h3>Manage Store Inventory</h3>
          <div className="admin-product-list">
            {products.map(p => (
              <div key={p.id} className="admin-product-card">
                <img src={p.image} alt={p.name} />
                <div className="admin-product-info">
                  <h4>{p.name}</h4>
                  <p>{p.price}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Remove</button>
              </div>
            ))}
            {products.length === 0 && <p>No products in store. Add some above!</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
