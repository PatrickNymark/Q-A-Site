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
  const { title, text, category, tags } = req.body;
  const { isValid, errors } = postValidator(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const tagsArray = tags.split(', ');

  // Create new post
  const newPost = new Post({
    creator: req.user,
    title,
    text,
    category,
    tags: tagsArray
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

/*

  __GET POSTS BY USER
  
*/
exports.getPostByUser = (req, res) => {
  Post.find({ creator: req.user._id.toString() }).then(posts => {
    if (!posts) {
      return res.status(400).json({ msg: 'No posts' });
    }

    res.json(posts);
  });
}

/*

  __GET ALL POSTS

*/
exports.getAllPosts = (req, res) => {
  Post.find({}).then(posts => {
    res.json(posts);
  }).catch(err => res.status(400).json(err.message));
}

/*

  __GET POST BY ID

*/
exports.getPostById = (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    if (!post) {
      return res.status(404).json({ notfound: 'Post not found' })
    }

    res.json(post)
  })
}