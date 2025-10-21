const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./data.db', (err) => {
  if (err) console.error('Database error:', err);
  else console.log('Connected to SQLite database');
});

// Create tables if they don't exist
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Company info table
  db.run(`
    CREATE TABLE IF NOT EXISTS company_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_name TEXT,
      location TEXT,
      email TEXT,
      phone1 TEXT,
      phone2 TEXT,
      phone3 TEXT,
      welcome_title TEXT,
      welcome_tagline TEXT,
      welcome_text TEXT
    )
  `);

  // Services table
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT,
      title TEXT,
      description TEXT,
      order_index INTEGER
    )
  `);

  // Initialize default data
  db.get('SELECT COUNT(*) as count FROM company_info', (err, row) => {
    if (row.count === 0) {
      db.run(`
        INSERT INTO company_info (owner_name, location, email, phone1, phone2, phone3, welcome_title, welcome_tagline, welcome_text)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        'Ihsan Alattar',
        'Büdingen',
        'ihsanalattar373@gmail.com',
        '+49 157 81518416',
        '+49 152 06027263',
        '+49 176 56942340',
        'Willkommen bei Blitz&Blank',
        'Ihrem zuverlässigen Partner für Qualität und Service',
        'Wir kümmern uns um gründliche Reinigung, Entsorgung und Pflege – von alten Gebäuden bis zu Dachflächen. Saubere Arbeit, faire Preise und zufriedene Kunden stehen bei uns an erster Stelle.'
      ]);
    }
  });

  db.get('SELECT COUNT(*) as count FROM services', (err, row) => {
    if (row.count === 0) {
      const services = [
        { icon: '🏢', title: 'Reinigung von Gebäuden', description: 'Professionelle Reinigung von alten Gebäuden und Wohnungen mit gründlicher Sorgfalt', order: 1 },
        { icon: '♻️', title: 'Entsorgung', description: 'Fachgerechte Entsorgung alter Möbel und Haushaltsgegenstände', order: 2 },
        { icon: '✨', title: 'Räum- & Grundreinigung', description: 'Umfassende Räum- und Grundreinigung für Ihre Immobilie', order: 3 },
        { icon: '🏠', title: 'Dachreinigung', description: 'Sichere und gründliche Reinigung von Dachflächen', order: 4 }
      ];

      services.forEach(service => {
        db.run(
          'INSERT INTO services (icon, title, description, order_index) VALUES (?, ?, ?, ?)',
          [service.icon, service.title, service.description, service.order]
        );
      });
    }
  });

  // Initialize default admin user if it doesn't exist
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (row.count === 0) {
      const hashedPassword = bcrypt.hashSync('ii2002alattar', 10);
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ['Ihsan2002', hashedPassword]
      );
    }
  });
});

// API Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful' });
  });
});

// Get company info
app.get('/api/company-info', (req, res) => {
  db.get('SELECT * FROM company_info LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(row || {});
  });
});

// Update company info (requires authentication)
app.post('/api/company-info', (req, res) => {
  const { username, password, ...data } = req.body;

  // Verify credentials
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const {
      owner_name,
      location,
      email,
      phone1,
      phone2,
      phone3,
      welcome_title,
      welcome_tagline,
      welcome_text
    } = data;

    db.run(
      `UPDATE company_info SET 
        owner_name = ?, location = ?, email = ?, phone1 = ?, phone2 = ?, phone3 = ?,
        welcome_title = ?, welcome_tagline = ?, welcome_text = ?
      WHERE id = 1`,
      [owner_name, location, email, phone1, phone2, phone3, welcome_title, welcome_tagline, welcome_text],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update' });
        }
        res.json({ success: true, message: 'Company info updated' });
      }
    );
  });
});

// Get all services
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services ORDER BY order_index', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// Update service (requires authentication)
app.post('/api/services/:id', (req, res) => {
  const { username, password, icon, title, description } = req.body;
  const serviceId = req.params.id;

  // Verify credentials
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    db.run(
      'UPDATE services SET icon = ?, title = ?, description = ? WHERE id = ?',
      [icon, title, description, serviceId],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update' });
        }
        res.json({ success: true, message: 'Service updated' });
      }
    );
  });
});

// Add new service (requires authentication)
app.post('/api/services', (req, res) => {
  const { username, password, icon, title, description } = req.body;

  // Verify credentials
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    db.get('SELECT MAX(order_index) as max_order FROM services', (err, row) => {
      const nextOrder = (row?.max_order || 0) + 1;

      db.run(
        'INSERT INTO services (icon, title, description, order_index) VALUES (?, ?, ?, ?)',
        [icon, title, description, nextOrder],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to add service' });
          }
          res.json({ success: true, message: 'Service added' });
        }
      );
    });
  });
});

// Delete service (requires authentication)
app.delete('/api/services/:id', (req, res) => {
  const { username, password } = req.body;
  const serviceId = req.params.id;

  // Verify credentials
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    db.run('DELETE FROM services WHERE id = ?', [serviceId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete' });
      }
      res.json({ success: true, message: 'Service deleted' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

