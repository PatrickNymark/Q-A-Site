// Load model
const Post = require('../../models/Post');

/*
  __COMMENTS CONTROLLER
*/
exports.comments = require('./comments');

/* 
  __ADD NEW POST
*/
exports.addNewPost = (req, res) => {
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
};

/*
  __DELETE POST
*/
exports.deletePost = (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id).then(post => {
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    // Check if user is associated to post
    if (post.creator.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not assicated with post' });
    }

    post.remove().then(post => res.json(post));
  });
};
