// Load model
const Post = require('../../models/Post');

/*
  __ADD COMMENT
*/
exports.addComment = (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id)
    .then(post => {
      // Post not found
      if (!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      // Create new post payload
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

/*
  __DELETE COMMENT
*/
exports.deleteComment = (req, res) => {
  const { post_id, comment_id } = req.params;

  Post.findById(post_id)
    .then(post => {
      // No post found
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
};
