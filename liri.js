require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var Ticketmaster = require("ticketmaster");
var fs = require("fs");

// Pulling the API keys from .env file

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

    spotifySong = input;
    spotify.search({
        type: 'track',
        query: spotifySong
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            
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

// Function that'll execute if the user enters "omdb" as the operator

var queryUrl = "http://www.omdbapi.com/?t="+ input + "&apikey=" + omdbID;

function getMovieInfo() {
    
    var queryUrl = "http://www.omdbapi.com/?t="+ input + "&apikey=" + omdbID;

    axios.get(queryUrl).then(
        function(response) {

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

// Function that'll execute if the user enters "ticketmaster" as the operator

function getEventsFromTM () {

    var queryUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=' + ticketmaster.apikey.id + '&keyword=' + input;

    axios.get(queryUrl).then(
        function(response) {
            // Venue Name
            console.log('Venue: ' + response.data._embedded.events[0]._embedded.venues[0].name);

            // Address - Street, City, State, Zip
            console.log('Address: ' + response.data._embedded.events[0]._embedded.venues[0].address.line1 + ', ' + response.data._embedded.events[0]._embedded.venues[0].city.name + ', ' + response.data._embedded.events[0]._embedded.venues[0].state.name + ' ' + response.data._embedded.events[0]._embedded.venues[0].postalCode);

            // Date of Event
            console.log('Date of Event: ' + response.data._embedded.events[0].dates.start.localDate);

        })
        .catch(function (error){
            console.log(error);
    });        
}

// Function that'll execute if the user enters "feeling-lucky" as the operator

function getLucky () {
    var fs = require("fs");
    fs.readFile('getLucky.txt', (err, data) => {
        if (err) throw err;
        var dataArray = data.toString().split(',');
        var inputType = dataArray[0];
        input = dataArray[1];
        searchSpotify();
      });
}

// Conditionals to check for the search operator so LIRI can execute the correct function

if (searchOperator === 'spotify') {
    
    console.log("Please wait while I search for your query...");
    console.log('Here is what I found for: ' + '"' + input + '"');
    searchSpotify();

} else if (searchOperator === 'ticketmaster') {

    console.log("Please wait while I search for your query...");
    console.log('Here is what I found for: ' + '"' + input + '"');
    getEventsFromTM();

} else if (searchOperator === 'omdb') {

    console.log("Please wait while I search for your query...");
    console.log('Here is what I found for: ' + '"' + input + '"');
    getMovieInfo();

} else if (searchOperator === 'feeling-lucky') {

    console.log('Here\'s cool EDM song you might enjoy');
    getLucky();

} else {

    console.log("Sorry, I didn't get that. Please try again.");
}
