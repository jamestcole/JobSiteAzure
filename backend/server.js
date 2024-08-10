const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

// SQL Server configuration
const sqlConfig = {
  user: 'sqladmin',
  password: 'Password123!',
  database: 'jobsite-db',
  server: 'jobsitesqlserver.database.windows.net',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: false // Change to true for local development
  }
};

// Connect to SQL Server
sql.connect(sqlConfig, err => {
  if (err) console.error('SQL connection error:', err);
});

// Routes
app.post('/signup', async (req, res) => {
    const { username, password, qualifications, demographics, statement } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const query = `INSERT INTO Users (Username, PasswordHash, Qualifications, Demographics, Statement)
                   VALUES ('${username}', '${hashedPassword}', '${qualifications}', '${demographics}', '${statement}')`;
    sql.query(query, (err, result) => {
      if (err) return res.status(500).send({ message: 'Database error' });
      res.send({ message: 'User registered successfully' });
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM Users WHERE Username = '${username}'`;
    sql.query(query, async (err, result) => {
      if (err) return res.status(500).send({ message: 'Database error' });
      const user = result.recordset[0];
      if (!user) return res.status(404).send({ message: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.PasswordHash);
      if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.UserID }, 'yourSecretKey');
      res.send({ token });
    });
});

app.get('/applications', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'yourSecretKey');
    const query = `SELECT * FROM Applications WHERE UserID = '${decoded.id}'`;
    sql.query(query, (err, result) => {
      if (err) return res.status(500).send({ message: 'Database error' });
      res.send(result.recordset);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
