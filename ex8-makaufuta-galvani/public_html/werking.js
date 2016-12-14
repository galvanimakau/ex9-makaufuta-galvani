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