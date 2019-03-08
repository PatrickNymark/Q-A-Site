// Load model
const Post = require('../../models/Post');

exports.addComment = (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id)
    .then(post => {
      if (!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      // New post payload
      const newComment = {
        text: req.body.text,
        creator: req.user
      };

      // Add to beginning of comments array
      post.comments.unshift(newComment);

      // Save updated post
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(400).json(err));
};
