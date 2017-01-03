/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//npm install
var mongoose = require("mongoose");

//schema aanmaken in mongoose
var locationSchema = mongoose.Schema({
    name_drone:{
        type: String,
        required: true,
        unique:true
    },
    name_location:{
        type: String,
        required: true,
        unique:true
    },
    mac_address_drone:{
        type: String,
        required: true,
        unique:true
    },
    beschrijving:{
        type: String,
        required: true
    }
});
