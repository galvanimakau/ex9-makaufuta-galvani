//data importeren naar module
var express = require('express');//WEBSERVER NODE JS
var parser = require('body-parser');//BODY UIT LEZEN, EXTENSIE OP EXPRESS
var mongoose = require('mongoose');//GELIJKACHTIG AAN MONGOCLIENT --> JONAS

//connectie naar mongoose
mongoose.connect('mongodb://localhost:27017/MyAPI');//DATABANK IN ROBOMONGO


