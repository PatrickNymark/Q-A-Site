const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const postController = require('../../controllers/posts/postController');

// @route   GET api/posts/
// @desc    Get all posts route
// @access  Public
router.get('/', (req, res) => {
  Post.find().then(posts => {
    res.json(posts);
  });
});

// @route   POST api/posts/
// @desc    Add new post route
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.addNewPost
);

// @route   DELETE api/posts/:post_id
// @desc    Delete post route
// @access  Private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  postController.deletePost
);

// @route   POST api/posts/comment/:post_id
// @desc    Comment on post route
// @access  Private
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  postController.comments.addComment
);

// POST => delete comment from post
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  postController.comments.deleteComment
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
