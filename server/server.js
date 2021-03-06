const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const fs = require('fs');

// Initialize
const app = express();

// Routes
const posts = require('./routes/api/posts');
const profiles = require('./routes/api/profiles');
const users = require('./routes/auth/users');

// .env config
require('dotenv').config()

// Passport Config
app.use(passport.initialize());
require('./config/passport')(passport);

// Database config
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(res => console.log('Database connected'))
  .catch(err => console.log(err));

// Body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router middleware
app.use('/api/posts', posts);
app.use('/api/profiles', profiles);
app.use('/api/auth', users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on ${port}`));
