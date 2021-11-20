const { User } = require('../models');



const userData = [
    {
        username: "thefastestman",
        email: "dfastman@fakemail.com",
        password: "password",
        dateCreated: new Date()
    },
];

const seedUsers = () => User.bulkCreate(userData);

 module.exports = seedUsers;