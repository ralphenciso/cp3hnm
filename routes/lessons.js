const express  = require('express'),
      router   = express.Router(),
      Lesson   = require("../models/lesson"),
      multer   = require("multer"),
      {isAdmin}  = require("../utility")   

      
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './public/images/lessons')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})


router.get("/lessons", (req, res) => {
    Lesson.find({}, (err, Lessons) => {
        if(err){
            console.log(err)
        } else {
            res.render("lessons", {Lessons})
        }
    })
})

router.post("/lessons", isAdmin, upload.single('image'), (req,res) => {

    let image = req.file ?  `/images/lessons/${req.file.originalname}` : '/images/lessons/noimg.png'

    let programs = [];
    req.body.pnames.forEach((name,i) => {
        let obj = {};
        obj.name = name;
        obj.duration = req.body.pduration[i]
        programs.push(obj);
    });

    

    Lesson.create({
        instrument: req.body.instrument,
        image: image,
        programs: programs
    })

    res.redirect("/lessons");
})


router.get("/lessons/new", isAdmin, (req,res) => {
    res.render('lessons/new');
})



router.put("/lessons/:id", isAdmin, upload.single('image'), (req,res) => {
    let update = {};
    update.instrument = req.body.instrument;


    let programs = [];
    req.body.pnames.forEach((name,i) => {
        let obj = {};
        obj.name = name;
        obj.duration = req.body.pduration[i]
        programs.push(obj);
    });

    update.programs = programs

    if(req.file) {
        update.image = `/images/lessons/${req.file.originalname}`
    }
    
    Lesson.findOneAndUpdate({_id: req.params.id}, update, (err)=>{if(err){console.log(err)}});

    res.redirect("/lessons");
})


router.delete("/lessons/:id", isAdmin, (req,res) => {
    Lesson.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            res.redirect("/lessons")
        } else {
            res.redirect("/lessons")
        }
    })
})





module.exports = router;