const express               = require('express'),
      app                   = express(),
      port                  = process.env.port || 3000,
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      flash                 = require('connect-flash'),
      User                  = require("./models/user"),
      authRoutes            = require("./routes/auth"),
      lessonRoutes          = require("./routes/lessons"),
      instructorRoutes      = require("./routes/instructors"),
      enrollmentRoutes      = require("./routes/enrollments"),
      reviewRoutes          = require("./routes/reviews"),
      methodOverride        = require('method-override'),
      {capitalize}          = require("./utility");
      capitalize();
     







app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://admin:admin123@cluster0-kq8m3.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
app.use(require("express-session")({
    secret:"Harmony and Melody",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
})
 
// ROUTES
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secretdevpage/resetdb', (req,res) => {
    const dbseed = require("./dbseed");
    dbseed();
    res.redirect('back')
})


app.use(authRoutes);
app.use(lessonRoutes);
app.use(instructorRoutes);
app.use(enrollmentRoutes);
app.use(reviewRoutes);





app.listen(port, () => {
    console.log(`app started, listening on port ${port}`);
})


