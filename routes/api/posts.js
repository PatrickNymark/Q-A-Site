const express = require('express');
const router = express.Router();

// Load model
const Post = require('../../models/Post');

router.get('/test', (req, res) => {
  res.json({ msg: 'Success' });
});

router.post('/', (req, res) => {
  const { title, text } = req.body;

  const newPost = new Post({
    title,
    text
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.status(200).json(err.message));
});

module.exports = router;
