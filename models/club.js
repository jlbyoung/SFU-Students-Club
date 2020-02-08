var mongoose = require("mongoose");
//schema setup
var clubsSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Club", clubsSchema);