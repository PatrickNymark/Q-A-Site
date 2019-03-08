const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const postController = require('../../controllers/posts/postController');

router.get('/', (req, res) => {
  Post.find().then(posts => {
    res.json(posts);
  });
});

// POST => add new post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.addNewPost
);

// POST => add comment to post
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id } = req.params;

    Post.findById(post_id)
      .then(post => {
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
      })
      .catch(err => res.status(400).json(err));
  }
);

// POST => delete comment from post
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id, comment_id } = req.params;

    Post.findById(post_id)
      .then(post => {
        if (!post) {
          return res.status(400).json({ msg: 'Post not found' });
        }

        // Check if comment exists
        if (
          post.comments.filter(comment => comment._id.toString() === comment_id)
            .length === 0
        ) {
          return res.status(400).json({ msg: 'Comment not found' });
        }

        // Get index of comment to remove
        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(comment_id);

        // Delete comment from original array
        post.comments.splice(removeIndex, 1);

        // Save updated post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json(err));
  }
);

// POST => like post
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id } = req.params;
    Post.findById(post_id).then(post => {
      if (!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      post.likes.unshift(req.user);

      post.save().then(post => res.json(post));
    });
  }
);

// POST => unlike post
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id } = req.params;

    Post.findById(post_id).then(post => {
      if (!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      if (post.likes.filter(like => console.log(like + '////' + req.user)))
        // Get index to remove
        //const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

        // Remove like
        post.likes.splice(removeIndex, 1);

      // Save updated post
      //post.save().then(post => res.json(post));
    });
  }
);

module.exports = router;
