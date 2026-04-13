const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./database.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve static frontend assets for seed compatibility
app.use(express.static(path.join(__dirname, '../public')));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new product (handles multipart/form-data with image)
app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, price } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }
  const imagePath = `/uploads/${req.file.filename}`;
  
  const stmt = db.prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
  stmt.run([name, price, imagePath], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, price, image: imagePath });
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Deleted successfully', changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
