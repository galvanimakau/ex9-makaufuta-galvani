//data importeren naar module
var express = require('express');//WEBSERVER NODE JS
var parser = require('body-parser');//BODY UIT LEZEN, EXTENSIE OP EXPRESS
var mongoose = require('mongoose');//GELIJKACHTIG AAN MONGOCLIENT --> JONAS

//connectie naar mongoose
mongoose.connect('mongodb://localhost:27017/MyAPI');//DATABANK IN ROBOMONGO

//datastore
//bewaren van state
//LOCATION
var dalLocation = require('./storageLocations.js');
var validationLocations = require('./validateLocations.js');

//AANWEZIGHEDEN
var dalAanwezig = require('./storageAanwezigheden.js');
var validationAanwezigheden = require('./validateAanwezigheden.js');

//BEWEGINGEN
var dalBeweging = require('./storageBewegingen.js');
var validationBewegingen = require('./validateBewegingen.js');

//webserver variabele aanmaken
var app = express();

//json formaat
app.use(parser.json());

// --> LOCATION <--

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
app.post("/locations", function(request, response){
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
    //bestaan van velden in de bewaarplaats
    dalLocation.saveLocations(location, function(err, location){
        if(err){
            throw err;
        }
        response.send(location);
    });
});

//locations/:id
app.put("locations/:id", function (request, response){
    var location = request.body;
    //bestaan van velden validate
    var errors = validationLocations.fieldsNotEmpty(location,"name_drone", "name_location", "mac_address_drone", "beschrijving");
    //functie om error te push
    if (errors){
        response.status(400).send({
            msg: "De Volgende velden zijn fout of verplicht: " + errors.concat()       
        });
        return;
    }
     //updaten velden in de bewaarplaats
    dalLocation.updateLocations(request.params.id,location, function(err, location){
        if(err){
            throw err;
        }
        response.send(location);
    });
});

// --> AANWEZIGHEDEN <--

//opvangen van GET op /aanwezigheden
app.get('/aanwezigheden', function(request, response){
    dalAanwezig.AllAanwezigheden(function(err, aanwezig){
        if(err){
            throw err;
        }
        response.send(aanwezig);
    });
});

//opvangen van GET op /aanwezigheden/:id
app.get('/aanwezigheden/:id', function(request, response){
    dalAanwezig.findAanwezigheden(request.params.id, function(err, aanwezig){
        if(aanwezig){
        response.send(aanwezig);
        }else{
            err;
        }
    });
});

//opvangen van POST op /aanwezigheden
app.post("/aanwezigheden", function(request, response){
    //data toegekend aan aanwezig variabele
    //enkel opgevuld als het JSON formaat is.
    var mensen =request.body;
    //Bestaan van velden validate
    var errors = validationAanwezigheden.fieldsNotEmpty(mensen,"name_drone", "name_location", "aantal", "uur", "ID");
    //functie om error te push
    if (errors){
        response.status(400).send({
            msg: "De Volgende velden zijn fout of verplicht: " + errors.concat()       
        });
        return;
    }
    //bestaan van velden in de bewaarplaats
    dalAanwezig.saveAanwezigheden(mensen, function(err, mensen){
        if(err){
            throw err;
        }
        response.send(mensen);
    });
});

//--> BEWEGINGEN <--

//opvangen van GET op /bewegingen
app.get('/bewegingen', function(request, response){
    dalBeweging.AllBewegingen(function(err, beweging){
        if(err){
            throw err;
        }
        response.send(beweging);
    });
});

//opvangen van GET op /aanwezigheden/:id
app.get('/bewegingen/:id', function(request, response){
    dalBeweging.findBewegingen(request.params.id, function(err, beweging){
        if(beweging){
        response.send(beweging);
        }else{
            err;
        }
    });
});

//opvangen van POST op /bewegingen
app.post("/bewegingen", function(request, response){
    //data toegekend aan beweging variabele
    //enkel opgevuld als het JSON formaat is.
    var beweging =request.body;
    //Bestaan van velden validate
    var errors = validationBewegingen.fieldsNotEmpty(beweging,"beweging", "begin_location", "end_location", "duur", "beweging_id", "weer");
    //functie om error te push
    if (errors){
        response.status(400).send({
            msg: "De Volgende velden zijn fout of verplicht: " + errors.concat()       
        });
        return;
    }
    //bestaan van velden in de bewaarplaats
    dalBeweging.saveBewegingen(beweging, function(err, beweging){
        if(err){
            throw err;
        }
        response.send(beweging);
    });
});

//starten van server op poort 4567
app.listen(4567);

//Controle
console.log("Server started");