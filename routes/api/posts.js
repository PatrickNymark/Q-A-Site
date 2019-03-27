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

// @route   GET api/posts/:user_id
// @desc    Get posts by user route
// @access  Private
router.get(
  '/user',
  passport.authenticate('jwt', { session: false }), postController.getPostByUser
);

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
// @desc    Add comment route
// @access  Private
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  postController.comments.addComment
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment route
// @access  Private
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  postController.comments.deleteComment
);

// @route   POST api/posts/like/:post_id
// @desc    Like or unlike post route
// @access  Private
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  postController.likes.likePost
);

module.exports = router;
