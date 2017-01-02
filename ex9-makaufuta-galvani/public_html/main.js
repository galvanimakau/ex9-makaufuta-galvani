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

//opvangen van GET op /locations
app.get('/locations', function(request, response){
    dalLocation.AllLocations(function(err, location){
        if(err){
            throw err;
        }
        response.send(location);
    });
});

//opvangen van GET op /locations/:name_drone
app.get('/locations/:id', function(request, response){
    dalLocation.findLocations(request.params.id, function(err, location){
        if(location){
        response.send(location);
        }else{
            err;
        }
    });
});

//opvangen van POST op /locations
app.post("/locations", function(request, reponse){
    //data toegekend aan locatie variabele
    //enkel opgevuld als het JSON formaat is.
    var location =request.body;
    //Bestaan van velden validate
    var errors = validationLocations.fieldsNotEmpty(location,"name_drone", "name_location", "mac_address_drone", "beschrijving");
    //functie om error te push
    if (errors){
        response.status(400).send({
            msg: "De Volgende velden zijn fout of verplicht: " + errors.concat()       
        });
        return;
    }