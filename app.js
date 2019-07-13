const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require("mongoose")

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: 'Granite Hill', image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg'
// }
//     , function(err, campground){
//         if(err){
//             console(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log (campground);
//         }
//     });

let campgrounds = [
    {name: 'Salmon Creek', image: 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg'},
    {name: 'Granite Hill', image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg'},
    {name: 'Mountains Rest', image: 'https://images.freeimages.com/images/large-previews/fc3/farmington-river-1346136.jpg'},
    {name: 'Salmon Creek', image: 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg'},
    {name: 'Granite Hill', image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg'},
    {name: 'Mountains Rest', image: 'https://images.freeimages.com/images/large-previews/fc3/farmington-river-1346136.jpg'},
    {name: 'Salmon Creek', image: 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg'},
    {name: 'Granite Hill', image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg'},
    {name: 'Mountains Rest', image: 'https://images.freeimages.com/images/large-previews/fc3/farmington-river-1346136.jpg'}
]
mongoose.connect("mongodb://localhost/campgrounds");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (req, res) => res.render('landing'))

app.get('/campgrounds', function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
