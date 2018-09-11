//API ROUTES
//DEPENDENCIES
var path = require("path");
var friends = require("../data/friends");

// Your `apiRoutes.js` file should contain two routes:
// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends. 
// Return friends as JSON
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);
    var user = req.body;

// 6. Determine the user's most compatible friend using the following as a guide:
//    * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
//    * With that done, compare the difference WITH A LOOP between current user's scores against those from other users, question by question.
    for (var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var bestFriendIndex = 0;
    var minimumDifference = 40;

//Add up the differences to calculate the `totalDifference`.
//      * Example:
//        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//        * Total Difference: **2 + 1 + 2 =** **_5_**
//    * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
//    * The closest match will be the user with the least amount of difference.
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      if (totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }
//ADDING FRIENDS TO THE DATABASE
    friends.push(user);

    res.json(friends[bestFriendIndex]);
  });
};
