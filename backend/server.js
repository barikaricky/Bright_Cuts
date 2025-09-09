const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Bright Cuts API Running!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/barber', require('./routes/barber'));
app.use('/api/booking', require('./routes/booking'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));