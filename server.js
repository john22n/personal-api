var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');


var app = express();

app.use(bodyParser.json());
app.use(middleware.addHeaders);

app.get('/entireObject', mainCtrl.showUser);
app.get('/name', mainCtrl.getName);
app.get('/location', mainCtrl.getLocation);
app.get('/occupations', mainCtrl.getOccupations);
app.get('/occupations/latest', mainCtrl.getLatestOccupation);
app.get('/hobbies', mainCtrl.getHobbies);
app.get('/hobbies/:type', mainCtrl.getHobbies);
app.get('/family', mainCtrl.getFamily);
app.get('/family/:gender', mainCtrl.getGender);
app.get('/restaurants', mainCtrl.getRest);
app.get('/restaurants/:name', mainCtrl.getRestName);
app.get('/skills', mainCtrl.getSkillz);

app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.showUser);

app.put('/name/:name', mainCtrl.changeName);
app.put('/location/:place', mainCtrl.changeLocation);
app.post('/hobbies', mainCtrl.addHobbie);
app.post('/occupations', mainCtrl.postOccupation);
app.post('/family', mainCtrl.postFam);
app.post('/restaurants', mainCtrl.postRestaurants);

app.post('/skillz',middleware.generateID,  mainCtrl.postSkill);





app.listen(3000,  function() {
    console.log('listening on port 3000');
});