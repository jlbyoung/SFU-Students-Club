var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Club = require("./models/club"),
	seedDB = require("./seed")

seedDB();

mongoose.connect('mongodb://localhost:27017/SFU_Students_Club')
.then(() => console.log('connecting to database successful'))
.catch(err => console.error('could not connect to mongo DB', err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))

app.set("view engine", "ejs");


app.get('/', (req,res) => {
	res.render("landing");
});

app.get("/clubs", function(req, res){
	//res.render("clubs", {clubs:clubs});
	Club.find({}, function(err, allClubs){
		if(err){
			console.log(err);
		} else {
			res.render("clubs/index", {clubs:allClubs});
		}
	});
});

app.post("/clubs", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newClub = {name: name, image: image, description: desc}
	//clubs.push(newClub)
	
	//Create new club and save to DB
	Club.create(newClub, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/clubs");
		}
	});
});

app.get("/clubs/new", function(req, res){
	res.render("clubs/new");
});

//--- SHOW route --- more info about a club

app.get("/clubs/:id", function(req, res){
	//find club with provided ID
	//render show template
	Club.findById(req.params.id).populate("comments").exec(function(err, foundClub){
		if(err){
			console.log(err)
		} else {
			console.log(foundClub)
			res.render("clubs/show", {club: foundClub});
		}
	});
	
});

// --- Comment route ---
app.get("/clubs/:id/comments/new", function(req, res){
	Club.findById(req.params.id, function(err, club){
		if(err){
			console.log(err);
		} else {
			
			res.render("comments/new", {club: club});
		}
	})
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started!");
});
/*
reference

	var clubs = [
		{name: "SFU Hikers", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/f5e16310-0b3d-4a49-800d-4bb67a4abacc?sname=CampusSchema&size=medium"},
		{name: "Altered Reality", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/6e3ec2cb-5098-4bbb-9b43-0c055a48f5e3?sname=CampusSchema&size=medium"},
		{name: "SFU AI", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/76c4f4f5-46be-452a-b0e8-d3bc5d6ee631?sname=CampusSchema&size=medium"},
		{name: "SFU Boardgame", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/f492caab-c71f-43a2-9b79-e16df509a1e9?sname=CampusSchema&size=medium"},
		{name: "SFU Hikers", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/f5e16310-0b3d-4a49-800d-4bb67a4abacc?sname=CampusSchema&size=medium"},
		{name: "SFU Hikers 2", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/6e3ec2cb-5098-4bbb-9b43-0c055a48f5e3?sname=CampusSchema&size=medium"},
		{name: "SFU Hikers 3", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/f5e16310-0b3d-4a49-800d-4bb67a4abacc?sname=CampusSchema&size=medium"},
		{name: "Altered Reality", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/6e3ec2cb-5098-4bbb-9b43-0c055a48f5e3?sname=CampusSchema&size=medium"},
		{name: "SFU AI", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/76c4f4f5-46be-452a-b0e8-d3bc5d6ee631?sname=CampusSchema&size=medium"},
		{name: "SFU Boardgame", image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/f492caab-c71f-43a2-9b79-e16df509a1e9?sname=CampusSchema&size=medium"}
	]
*/