var path = require("path");

let friendsdata = require("../data/friends.js")

module.exports = function(app){
	// Get all friends
	app.get("/api/friends", function(req, res) {
	  res.json(friendsdata);
	});

	app.post("/api/friends", function(req, res) {
	  // req.body hosts is equal to the JSON post sent from the user
	  // This works because of our body-parser middleware
	  var userData = req.body;
	  console.log(userData);

	  var userResponses = userData.scores;

	  var matchName = '';
	  var matchImage = '';
	  var totalDifference = 1000;

	  for (var i = 0; i < friendsdata.length; i++) {
	  	var diff = 0;
	  	for (var j = 0; j < userResponses.length; j++) {
	  		diff += Math.abs(friendsdata[i].scores[j] - userResponses[j]);
	  	}
		
		//if lowest difference, record friend match
	  	if (diff < totalDifference) {
	  		totalDifference = diff;
	  		matchName = friendsdata[i].name;
	  		matchImage = friendsdata[i].photo;
	  	}
	  }

	  friendsdata.push(userData);
	  res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
}