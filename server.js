const express = require('express');
const mongoose = require('mongoose');

// Initialize
const app = express();

// Routes
const posts = require('./routes/api/posts');
const users = require('./routes/auth/users');

// Database config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(res => console.log('Database connected'))
  .catch(err => console.log(err));

// Body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router middleware
app.use('/api/posts', posts);
app.use('/api/auth', users);

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on ${port}`));
