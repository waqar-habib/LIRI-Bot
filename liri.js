require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var Ticketmaster = require("ticketmaster");
var fs = require("fs");

var spotify = new Spotify({
    id: process.env.spotify_ID,
    secret: process.env.spotify_secret
});
var ticketmaster = new Ticketmaster({
    id: process.env.ticketmaster_ID,
    secret: process.env.ticketmaster_secret
});

var omdbID = process.env.omdb_ID;


// Storing user input in a variable

var searchOperator = process.argv[2];
var input = process.argv.slice(3).join(" ");


// Function that'll execute if the user enters "spotify" as the operator

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


// OMDB
var queryUrl = "http://www.omdbapi.com/?t="+ input + "&apikey=" + omdbID;

function getMovieInfo() {
    
    var queryUrl = "http://www.omdbapi.com/?t="+ input + "&apikey=" + omdbID;

    axios.get(queryUrl).then(
        function(response) {
            console.log("Please wait while I search for your query...");
            console.log('Here is what I found for: ' + '"' + input + '"');
            // Title
            console.log('Title: ' + response.data.Title);
            // Year
            console.log('Release Year: ' + response.data.Year);
            // IMDB Rating
            console.log('IMDB Rating: ' + response.data.imdbRating);
            // Rotten Tomatoes Rating
            console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
            // Country
            console.log('Country of Production: ' + response.data.Country);
            // Language
            console.log('Language: ' + response.data.Language);
            // Plot of the movie
            console.log('Plot: ' + response.data.Plot);
            // Actors
            console.log('Actors: ' + response.data.Actors);


        }) 
        .catch(function (error){
            console.log(error);
    });
}

// Ticketmaster

function getEventsFromTM () {
    console.log("Please wait while I search for your query...");
    console.log('Here is what I found for: ' + '"' + input + '"');
    var queryUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + ticketmaster.apikey.id + '&keyword=' + input;

    axios.get(queryUrl).then(
        function(response) {
            // Make separate clg for each of the reqd items here
            console.log('Venue: ' + response.data._embedded.events[0]._embedded.venues[0].name);
            console.log('Date of Event: ' + response.data._embedded.events[0].dates.start.localDate);
            //console.log('Venue:');
            //venues.city.name, .country.name, .name
            
        })
        .catch(function (error){
            console.log(error);
    });        
}


if (searchOperator === 'spotify') {
    searchSpotify();
} else if (searchOperator === 'ticketmaster') {
    getEventsFromTM();
} else if (searchOperator === 'omdb') {
    getMovieInfo();
} else {
    console.log("Invalid Command Provided");
}
