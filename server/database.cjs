const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    // Create the products table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL
    )`, (err) => {
      if (!err) {
        // Seed the database if it's empty
        db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
          if (row.count === 0) {
            console.log('Seeding initial products...');
            const stmt = db.prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
            stmt.run('Champagne Gold Silk', '$240', '/saree_gold_1776086696414.png');
            stmt.run('Midnight Blue Sequined', '$320', '/saree_blue_1776086753423.png');
            stmt.run('Maroon Bridal Classic', '$450', '/hero_saree_1776086628380.png');
            stmt.finalize();
          }
        });
      }
    });
  }
});

module.exports = db;
