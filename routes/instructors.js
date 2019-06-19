const express  = require('express'),
      router   = express.Router(),
      Instructor = require('../models/instructor'),
      multer   = require("multer"),
      {isAdmin}  = require("../utility") 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/instructors')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})
    

router.get("/instructors", (req,res) => {
    Instructor.find({}, (err, Instructors) => {
        if(err){
            console.log(err)
        } else {
            res.render("instructors", {Instructors})
        }
    })
})

router.get("/instructors/new", isAdmin, (req,res) => {
    res.render('instructors/new');
})

router.post("/instructors", isAdmin, upload.single('image'), (req,res) => {
    let image = req.file ?  `/images/instructors/${req.file.originalname}` : '/images/instructors/noimg.png';

    let newins = {...req.body, image: image}

    Instructor.create(newins);

    res.redirect("/instructors");
})


router.put("/instructors/:id", isAdmin, upload.single('image'), (req,res) => {
    let update = {...req.body};

    if(req.file) {
        update.image = `/images/lessons/${req.file.originalname}`
    }

    Instructor.findOneAndUpdate({_id: req.params.id}, update, (err)=>{if(err){console.log(err)}});
    res.redirect("/instructors");
})



router.delete("/instructors/:id", isAdmin , (req,res) => {
    Instructor.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            console.log(err)
            res.redirect("/instructors")
        } else {
            res.redirect("/instructors")
        }
    })
})


    

module.exports = router;