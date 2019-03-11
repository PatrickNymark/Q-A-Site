// Load model
const Post = require('../../models/Post');

// Validator
const postValidator = require('../../validation/posts/post');

/*

  __COMMENTS AND LIKES CONTROLLERS

*/
exports.comments = require('./comments');
exports.likes = require('./likes');

/*

  __ADD NEW POST

*/
exports.addNewPost = (req, res) => {
  const { title, text } = req.body;
  const { isValid, errors } = postValidator(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create new post
  const newPost = new Post({
    creator: req.user,
    title,
    text
  });

  // Save post
  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.status(500).json(err.message));
};

/*

  __DELETE POST
  
*/
exports.deletePost = (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id)
    .then(post => {
      // Check if post exists
      if (!post) {
        return res.status(400).json({ notfound: 'Post not found' });
      }

      // Check if user is associated to post
      if (post.creator.toString() !== req.user.id) {
        return res.status(400).json({ assocation: false });
      }

      // Remove post
      post
        .remove()
        .then(post => res.json(post))
        .catch(err => res.status(500).json(err.message));
    })
    .catch(err => res.status(500).json(err.message));
};
