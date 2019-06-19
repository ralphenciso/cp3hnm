const express  = require('express'),
      router   = express.Router(),
      Review   = require("../models/review"),
      Enrollment = require("../models/enrollment"),
      Instructor = require("../models/instructor"),
      {isLoggedIn} = require("../utility");



router.get("/reviews", isLoggedIn, (req,res) => {

    Review.find({}, (err, reviews) => {
        Enrollment.find({student: `${req.user.firstname} ${req.user.lastname}`}, (err, enrollments) => {
            Instructor.find({},(err, instructorsList) => {
                let approved = enrollments.filter(v => {
                    return (v.status.toLowerCase() ===  'approved') 
                }) 
                
                let instructorsEnrolled = [... new Set(approved.map(v => v.instructor))];
                let instructorsAll = [... new Set(reviews.map(v => v.instructor))];
                
                res.render('reviews', {reviews, instructorsEnrolled, instructorsAll, enrollments, instructorsList})

            })
            
        })
    })
})

router.post("/reviews", isLoggedIn, (req,res) => {


    Review.create(req.body, (err, review) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/reviews');
    })
    
})



router.delete("/reviews/:id", isLoggedIn, (req,res) => {
    Review.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            console.log(err)
            res.redirect("/reviews")
        } else {
            res.redirect("/reviews")
        }
    })
})


module.exports = router;