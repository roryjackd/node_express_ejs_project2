const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000

let campgrounds = [
    {name: 'Salmon Creek', image: 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg'},
    {name: 'Granite Hill', image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg'},
    {name: 'Mountains Rest', image: 'https://images.freeimages.com/images/large-previews/fc3/farmington-river-1346136.jpg'}
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (req, res) => res.render('landing'))

app.get('/campgrounds', function(req, res){
    

    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    campgrounds.push(newCampground);

    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
