// Load model
const Post = require('../../models/Post');

exports.likePost = (req, res) => {
  const { post_id } = req.params;
  Post.findById(post_id).then(post => {
    // No post found
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    // Add to beginning of array
    post.likes.unshift(req.user);

    // Save updated post
    post.save().then(post => res.json(post));
  });
};

exports.unlikePost = (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id).then(post => {
    // No post found
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    // Check if already liked
    if (post.likes.find(like => like._id.toString() !== req.user.id)) {
      return res
        .status(400)
        .json({ notliked: 'You have not yet liked this post' });
    }

    // Get index to remove
    const removeIndex = post.likes
      .map(item => item._id.toString())
      .indexOf(req.user.id);

    // Remove like
    post.likes.splice(removeIndex, 1);

    // Save updated post
    post.save().then(post => res.json(post));
  });
};
