
const express  = require('express'),
      router   = express.Router(),
      passport = require('passport'),
      User     = require("../models/user"),
      bodyParser = require('body-parser')




// Registration Routes
router.get("/register", (req,res) => {
    res.render("auth/register");
})
router.post("/register", (req,res) => {
    let newuser = {...req.body.user, username: req.body.username}
    User.register(new User(newuser), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render('auth/register');
        }
        passport.authenticate("local")(req,res, function(){
            console.log('success');
            res.redirect("/");
        });
    })
})

// Login Routes
router.get("/login", (req,res) => {
    res.render("auth/login");
})
router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true 
    }),
    (req,res) => {
    }
)

// Logout
router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/");
})


// Auth Check
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;