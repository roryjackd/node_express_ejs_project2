var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: 'Salmon Creek', 
        image: 'https://images.freeimages.com/images/large-previews/e4c/camping-tent-1058140.jpg',
        description: "fusdfu fdfasdf fdsaf"
    },
    {
        name: 'Granite Hill', 
        image: 'https://images.freeimages.com/images/large-previews/a25/empty-campground-1442093.jpg',
        description: "fusdfu fdfasdf fdsaf"
    },
    {
        name: 'Mountains Rest', 
        image: 'https://images.freeimages.com/images/large-previews/fc3/farmington-river-1346136.jpg',
        description: "fusdfu fdfasdf fdsaf"
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great.",
                            author: "John"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }); 
                    }     
            });
        });
    });

    
}

module.exports = seedDB;

