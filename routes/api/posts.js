const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load model
const Post = require('../../models/Post');

router.get('/', (req, res) => {
  Post.find().then(posts => {
    res.json(posts);
  });
});

// POST => add new post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { title, text } = req.body;

    const newPost = new Post({
      creator: req.user,
      title,
      text
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(200).json(err.message));
  }
);

// POST => add comment to post
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id } = req.params;

    Post.findById(id).then(post => {
      if (!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      // New post payload
      const newComment = {
        text: req.body.text,
        user: req.user
      };

      // Add to beginning of comments array
      post.comments.unshift(newComment);

      // Save updated post
      post.save().then(post => res.json(post));
    });
  }
);

module.exports = router;
