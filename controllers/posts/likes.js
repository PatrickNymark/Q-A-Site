// Load model
const Post = require('../../models/Post');

exports.addLike = (req, res) => {
  const { post_id } = req.params;
  Post.findById(post_id).then(post => {
    if (!post) {
      return res.status(400).json({ msg: 'Post not found' });
    }

    post.likes.unshift(req.user);

    post.save().then(post => res.json(post));
  });
};
