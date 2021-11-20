const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const seedPosts = async () => {
    
    const idCalc = (array) => array[Math.floor(Math.random() * array.length)].id;
    const [ users ] = await Promise.all([ User.findAll() ]);

    const postData = [
        {
            postTitle: "Post one",
            postContents: "These are the contents of a post",
            user_id: idCalc(users),
            dateCreated: new Date()
        },
    ];

    try {
        await Post.bulkCreate(postData, { logging: console.log });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = seedPosts;