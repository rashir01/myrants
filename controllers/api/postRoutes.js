const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const userData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });


    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {

    //get all comments associated with a post
    const commentsData = await Comment.findAll(
      {
        attributes: ['content', 'date_created'],
        include: [
          {
            model: User,
            attributes: ['user_name'],
          }
        ],
        where: {
          post_id: req.params.id,
        }
      });
    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );

    //get the post data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },

      ],
    });
    //sanitize
    const post = postData.get({ plain: true });
    console.log(`post ${post}`);

    //render post and comments using handlebars
    res.render('post', {
      ...post,
      comments: comments,
      logged_in: req.session.logged_in,
      logged_in_user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(`error with plain ${err}`)
    res.status(500).json(err);
  }
});

//update post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      logged_in_user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
