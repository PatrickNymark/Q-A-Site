// Load model
const Post = require('../../models/Post');

/* 

  __LIKE OR UNLIKE 
  
*/
exports.likePost = (req, res) => {
  const { post_id } = req.params;

  Post.findById(post_id)
    .then(post => {
      // No post found
      if (!post) {
        return res.status(400).json({ notfound: 'Post not found' });
      }

      // Check if already liked
      if (post.likes.map(like => like._id === req.user.id).length > 0) {
        // Get remove index
        const removeIndex = post.likes
          .map(like => like._id)
          .indexOf(req.user.id);

        // Remove like
        post.likes.splice(removeIndex, 1);

        // Save updated post
        return post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(500).json(err.message));
      }

      // Add to beginning of array
      post.likes.unshift(req.user);

      // Save updated post
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(500).json(err.message));
    })
    .catch(err => res.status(500).json(err.message));
};
