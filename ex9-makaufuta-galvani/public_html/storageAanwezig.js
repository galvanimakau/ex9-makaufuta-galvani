/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//npm install
var mongoose = require("mongoose");

//schema aanmaken in mongoose
var aanwezigSchema = mongoose.Schema({
    name_drone:{
        type: String,
        required: true
    },
    name_location:{
        type: String,
        required: true
    },
    aantal:{
        type: Number,
        required: true
    },
    uur:{
        type: String,
        required: true
    },
    ID:{
        type: Number,
        required: true,
        unique: true
    }
});

//gegevens bijhouden
var Aanwezig = module.exports = mongoose.model('Aanwezig', aanwezigSchema);

//gegeven exporteren naar mongoose
module.exports = {
    saveAanwezigheden: function (aanwezig, callback){
        Aanwezig.create(aanwezig, callback);
    },
    AllAanwezigheden: function(callback){
        Aanwezig.find(callback);
    },
    findAanwezigheden: function(id, callback){
        Aanwezig.find({ID:id}, callback);
    }
        };