//data importeren naar module
var express = require('express');//WEBSERVER NODE JS
var parser = require('body-parser');//BODY UIT LEZEN, EXTENSIE OP EXPRESS
var mongoose = require('mongoose');//GELIJKACHTIG AAN MONGOCLIENT --> JONAS

//connectie naar mongoose
mongoose.connect('mongodb://localhost:27017/MyAPI');//DATABANK IN ROBOMONGO

//datastore
//bewaren van state
//LOCATION
var dalLocation = require('./storagelocations.js');
var validationLocations = require('./validatelocations.js');

//AANWEZIGHEDEN
var dalAanwezig = require('./storageaanwezigheden.js');
var validationAanwezigheden = require('./validateaanwezigheden.js');

//BEWEGINGEN
var dalBeweging = require('./storagebewegingen.js');
var validationBewegingen = require('./validatebewegingen.js');

//webserver variabele aanmaken
var app = express();

//json formaat
app.use(parser.json());