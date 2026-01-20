const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/resume_ai');

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/resumes', require('./routes/resumes'));
app.use('/api/v1/templates', require('./routes/templates'));
app.use('/api/v1/uploads', require('./routes/uploads'));
app.use('/api/v1/jobs', require('./routes/jobs'));

// Basic healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
