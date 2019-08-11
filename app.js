const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds")

const commentRoutes = require("./routes/comments");
const campgroundsRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index")

app.use(require("express-session")({
    secret: "Secret saying.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

seedDB();
mongoose.connect("mongodb://localhost/campgrounds");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
