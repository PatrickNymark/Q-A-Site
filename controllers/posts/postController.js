// Load model
const Post = require('../../models/Post');

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
