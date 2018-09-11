var path = require('path');

module.exports = function(app){
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });
};
//same as above
//A GET Route to `/survey` which should display the survey page.