/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//data importeren naar module
var request = require ("request");
var dal = require('./storage.js');

// verenvoudigen van url
var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";

//certificaat voor het site: http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//variabelen indentifieren met hun onderdelen
var Drone = function (id, mac, datum, locatie, files, files_count, name){
    this._id = id;
    this.mac = mac;
    this.datum = datum;
    this.locatie=locatie;
    this.files=files;
    this.files_count=files_count;
    this.name=name;
};
var File = function (id, datum_eerste_record, datum_laatste_record, datum_geladen, contents, contents_count, drone_id, ref, url){
    this._id =id;
    this.datum_eerste_record = datum_eerste_record;
    this.datum_laatste_record = datum_laatste_record;    
    this.datum_geladen = datum_geladen;
    this.contents= contents;
    this.contents_count = contents_count;
    this.drone_id =drone_id;
    this.ref=ref;
    this.url=url;
};
var Content = function (id, url, ref, rssi, drone_id, file_id, datum_tijd, mac){
    this._id =id;
    this.url=url;
    this.ref = ref;
    this.rssi = rssi;
    this.drone_id = drone_id;
    this.file_id = file_id;
    this.datum_tijd = datum_tijd;
    this.mac = mac;
};

//link meegeven waar data staat
var dronesSettings = new Settings("/drones?format=json");

//tabel leeg maken
dal.clearDrone();
dal.clearFile();
dal.clearContent();

//drone weergeven als JSON
request(dronesSettings, function(error, response, dronesString){
    var drones = JSON.parse(dronesString);
    //ForEach gebruiken om het weer te geven
    
    drones.forEach(function(drone){
        //drone
        var droneSettings =new Settings("/drones/" + drone.id + "?format=json");
        request(droneSettings, function(error, response, droneString){
            
            var drone = JSON.parse (droneString);
            //drone op geheugen zetten
            dal.insertDrone(new Drone(
                    drone.id,
                    drone.mac,
                    drone.datum,
                    drone.locatie,
                    drone.files,
                    drone.files_count,
                    drone.name
            ));
            //file
            var filesSettings = new Settings("/files?drone_id.is=" + drone.id + "&format=json&date_loaded.greaterOrEqual=2016-12-07T12:00:00");
            console.log(filesSettings);
            request(filesSettings, function(error, response, filesString){
                
                var files = JSON.parse(filesString);
                files.forEach(function (file){
                    var fileSettings = new Settings("/files/" + file.id + "?format=json");
                    request(fileSettings, function(error, response, fileString){
                        var file = JSON.parse(fileString);
                        //file op geheugen zetten
                        dal.insertFile(new File(
                                file.id,
                                file.datum_eerste_record,
                                file.datum_laatste_record,    
                                file.datum_geladen,
                                file.contents,
                                file.contents_count,
                                file.drone_id,
                                file.ref,
                                file.url,
                                drone.id
                                ));
                        //content
                        var contentsSettings = new Settings("/files/" + file.id + "/contents?format=json");
                        request(contentsSettings, function(error, response, contentsString){
                            //JSON
                            var contents = JSON.parse(contentsString);
                            //foreach
                            contents.forEach(function(content){
                                var contentSettings = new Settings("/files/" + file.id + "/contents/" + content.id + "?format=json");
                                request(contentSettings, function (error, response, contentString){
                                    var content = JSON.parse(contentString);
                                    //geheugen content
                                    dal.insertContent(new Content(
                                            content.id,
                                            content.url,
                                            content.ref,
                                            content.rssi,
                                            content.drone_id,
                                            content.file_id,
                                            content.datum_tijd,
                                            content.mac,
                                            drone.id,
                                            file.id
                                            ));
                                    
                                });
                            });
                        });
                        
                        
                        
                    });
                });
            });
            
            
            
        });
    });
});