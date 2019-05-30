const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");

app.get('/', (req, res) => res.render('landing'))

app.get('/campgrounds', function(req, res){
    let campgrounds = [
        {name: 'Salmon Creek', image: 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg'},
        {name: 'Granite Hill', image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg'},
        {name: 'Mountains Rest', image: 'https://images.freeimages.com/images/large-previews/fc3/farmington-river-1346136.jpg'}
    ]

    res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
