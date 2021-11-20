const sequelize = require('../config/connection');
const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log("***Database Synced***");

    await seedUsers();
    console.log("***Users Seeded***");

    await seedPosts();
    console.log("***Posts Seeded***");

    process.exit(0);
};

seedDatabase();