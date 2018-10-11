const express = require('express');
const router = express.Router();

const Post = require('../../models/Post');

// router.get('/test', (req, res) => res.json({msg: 'Posts work'}));

// @route  POST api/posts
// @desc   Create posts
// @access Private

    router.post('/', (req, res) => {
        console.log(req.body);

        const newPost = new Post({
            user: {
                id: req.body.user
            },
            text: {
                body: req.body.text
            },
            name: req.body.name,
            avatar: req.body.avatar
        });

        newPost.save().then(post => res.json(newPost));
    }
);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID '})
        );
});

module.exports = router;