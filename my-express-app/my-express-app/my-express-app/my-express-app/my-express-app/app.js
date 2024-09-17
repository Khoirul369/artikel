// Import Express
const express = require('express');
const app = express();

// Rute sederhana
app.get('/', (req, res) => {
  res.send('Halo, dunia!');
});

// Menjalankan server di port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
