const express  = require('express'),
      router   = express.Router(),
      Enrollment = require('../models/enrollment'),
      Lesson   = require('../models/lesson'),
      Instructor = require('../models/instructor'),
      User       = require('../models/user'),
      {enrollcheck, isLoggedIn, isAdmin} = require("../utility")
      




router.get("/enrollments/new", enrollcheck, (req,res) => {
    Lesson.findOne({_id: req.query.id}, (err, lesson) => {
        if(err){
            console.log(err)
            res.redirect('back')
        } else {
            
            Lesson.find({}, (error, lessons) => {
                if(err){
                    console.log(err)
                }
                Instructor.find({}, (err, instructors) => {
                    let map = [];

                    lessons.forEach(value => {
                        let obj = {}
                        obj.instrument = value.instrument
                        obj.programs = value.programs
                        obj.instructors = instructors.filter(instructor => instructor.instruments.includes(value.instrument.toLowerCase())).map(v => v.name);
                        map.push(obj);
                    })

                    Enrollment.find({}, (err, enrollments) => {
                        let instnames = instructors.map(v => v.name);
                        let schedule = [];
                        instnames.forEach(v => {
                            let obj = {}
                            obj.instructor = v;
                            obj.instschedule = enrollments.filter(enr => enr.instructor === v);
                            schedule.push(obj)
                        })
                        res.render('enrollments/new', {lesson, map, schedule});
                    })
                })
            });
        }
    })
})


router.get("/schedules", isLoggedIn, (req,res) => {

    if(req.user.role === "student") {
        Enrollment.find({student: `${req.user.firstname} ${req.user.lastname}`}, (err, enrollments) => {
            res.render('enrollments/schedules', {enrollments})
        })
    }

    if(req.user.role === "instructor") {
        Enrollment.find({instructor: `${req.user.firstname} ${req.user.lastname}`}, (err, enrollments) => {
            res.render('enrollments/schedules', {enrollments})
        })
    }

    if(req.user.role === "admin") {
        Enrollment.find({}, (err, enrollments) => {
            res.render('enrollments/enrollments', {enrollments})
        })
    }
    
    
})

router.post("/enrollments", enrollcheck, (req, res) => {

    Enrollment.create(req.body)
    
    res.redirect("/schedules")
})

router.put("/enrollments/:id",isAdmin, (req,res) => {
    Enrollment.findOneAndUpdate({_id: req.params.id}, {status: "Approved"}, (err) => {
        if(err) {
            console.log(err)
            res.redirect("/schedules")
        } else {
            res.redirect("/schedules")
        }
    })
})



router.delete("/enrollments/:id",isLoggedIn, (req,res) => {
    Enrollment.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            console.log(err)
            res.redirect("/schedules")
        } else {
            res.redirect("/schedules")
        }
    })
})


module.exports = router;