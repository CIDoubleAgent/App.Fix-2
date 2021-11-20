const { User } = require("../models");
const Post = require("../models/Post");
const router = require('express').Router();

router.get('/', async (req, res) => {
    return Post.findAll(
        { include: {
            model: User,
            as: 'user'
        } }
    )
    .then((response) => {
        const posts = response.map(post => ({
            ...post.dataValues,
            user: post.user.dataValues.username
        }))
        console.log(posts);
        res.render('homepage', {
            posts, session:req.session
        });
    });
});


module.exports = router;