//HTML ROUTES

//DEPENDENCIES
var path = require('path');

//A GET Route to `/home` which should display the home page.
module.exports = function(app){
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });
//A GET Route to `survey` which should display the survey page.
    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });
};


