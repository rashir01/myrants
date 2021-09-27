const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  console.log(`content ${req.body.content}, post_id ${req.body.post_id}`)
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id:req.session.user_id,
    });

    req.session.save(() => {
      req.session.user_id = commentData.user_id;
      req.session.logged_in = true;

      res.status(200).json(commentData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
