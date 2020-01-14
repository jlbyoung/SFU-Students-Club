var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/SFU_Students_Club')
.then(() => console.log('connecting to database successful'))
.catch(err => console.error('could not connect to mongo DB', err));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


//schema setup
var clubsSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Clubs = mongoose.model("Clubs", clubsSchema);
/*
Clubs.create(
	{
	name: "SFU Hikers",
	image: "https://hub.sfss.ca/Skeddy/rest/gem/v1/image/f5e16310-0b3d-4a49-800d-4bb67a4abacc?sname=CampusSchema&size=medium"
}, function(err, club){
	if(err){
		console.log(err);
	} else {
		console.log("NEW CREATED CLUB : ");
		console.log(club)
	}
	
});
*/

app.get('/', (req,res) => {
	res.render("landing");
});

app.get("/clubs", function(req, res){
	//res.render("clubs", {clubs:clubs});
	Clubs.find({}, function(err, allClubs){
		if(err){
			console.log(err);
		} else {
			res.render("clubs", {clubs:allClubs});
		}
	});
});

app.post("/clubs", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	console.log(name + " " + image)
	var newClub = {name: name, image: image}
	//clubs.push(newClub)
	//Create new club and save to DB
	Clubs.create(newClub, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/clubs");
		}
	});
});

app.get("/clubs/new", function(req, res){
	res.render("new.ejs");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started!");
});

/* reference

	/*
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
*/