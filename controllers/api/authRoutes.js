const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.get('/logout',(req,res) => {
    req.session.destroy((error) => {
        res.redirect('/');
        console.log(error, "destroy err");
    });
    
    console.log("\n", "----logout successful----", "\n")
});

router.use((req, res, next) => {
    if (req.session && req.session.user_id) {
        res.redirect("/");
    } else {
        next();
    }
});

router.get("/login", (req, res) => {
    res.render("login.handlebars");
    console.log(req.session.user_id);
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    let { username, password } = req.body;
    
    let userData = await User.findOne({where: {username}});
    if (userData == null) {
        console.log("\n", "----login failed----", "\n");
        res.redirect("/auth/login");
    } else {
        
        bcrypt.compare(password, userData.password, function(err, result) {
            if (result === true) {
                req.session.user_id = userData.dataValues.id
                console.log("\n", "----login successful----", "\n")
                res.redirect("/")
            }   else {
                console.log("\n", "----login failed----", "\n")
                res.redirect("/auth/login")
            }
        });
    }
    
});

router.get("/signup", (req, res) => {
    res.render("signup.handlebars");
});

router.post("/signup", (req, res) => {
    let { username, password, email } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        User.create({ username, password:hash, email })
        .then(function(data) {
            res.redirect("/auth/login");
            console.log(data);
            console.log("\n", "----create successful----", "\n");
        }).catch(function(err) {
            console.error(err);
            console.log("\n", "----create unsuccessful----", "\n");
            res.redirect("/auth/signup");
        });
    });
});

module.exports = router;