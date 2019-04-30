require("dotenv").config();

// Linking the API key file
const keys = require("./keys");

// Linking Node packages
var Spotify = require("node-spotify-api");
var axios = require("axios");
var ticketmaster = require("ticketmaster");
var fs = require("fs");

const spotify = new Spotify({
    id: "ae024fd2335140a48ceaf1bc3684c27c",
    secret: "eb6c86916f07443e91d5f3cf8d35dd41"
});

// Storing user input in a variable

var searchOperator = process.argv[2];
var input = process.argv[3];

function searchSpotify() {
    console.log("Please wait while I search for your query...");
    spotifySong = input;
    spotify.search({
        type: 'track',
        query: spotifySong
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            
            console.log('Here is what I found for: ' + '"' + input + '"');
            // Print Artist Name 
            console.log('Artist: ' + JSON.stringify(data.tracks.items[0].album.artists[0].name));

            // Print Song Name 
            console.log('Song: ' + JSON.stringify(data.tracks.items[0].name));

            // Print Album Name
            console.log('Album Name: ' + JSON.stringify(data.tracks.items[0].album.name));

            // Print Song Preview URL
            console.log('Preview: ' + JSON.stringify(data.tracks.items[0].preview_url));
        }
    });
}

if (searchOperator === 'spotify') {
    searchSpotify();
} else {
    console.log("Error!");
}

