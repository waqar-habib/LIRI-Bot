require("dotenv").config();

// Linking the API key file
const keys = require("./keys");

// Linking Node packages
var spotify = require("node-spotify-api");
var axios = require("axios");
var ticketmaster = require("ticketmaster");
var fs = require("fs");

// Storing user input in a variable

var searchOperator = process.argv[2];
var input = process.argv[3];


