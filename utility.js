function capitalize(){
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login")
}

function isAdmin(req,res,next){
    if(req.user.role === "admin"){
        return next()
    }
    req.flash("error", "Not Authorized")
    res.redirect('back');
}

function isInstructor(req,res,next){
    if(req.user.role === "instructor"){
        return next() 
    }
    res.redirect('back');
}

function enrollcheck(req,res,next){
    if(req.user){
        if(req.user.role === 'student'){
            return next() 
        }
        req.flash("error", "Kindly login as a student")
        res.redirect('back')
    }
        req.flash("error", "You need to be logged in to do that")
        res.redirect('/login');
}

module.exports = {
    capitalize,
    isLoggedIn,
    isAdmin,
    isInstructor,
    enrollcheck
}



