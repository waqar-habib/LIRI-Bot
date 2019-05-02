require("dotenv").config();
var util = require("util");
// Linking the API key file
const keys = require("./keys");

// Linking Node packages
var axios = require("axios");

// Storing user input in a variable
var searchOperator = process.argv[2];
var input = process.argv.slice(3).join(" ");

// Build a queryURL to get results from OMDB API

function getMovieInfo() {
    
    var queryUrl = "http://www.omdbapi.com/?t="+ input + "&apikey=ff3a90d9";

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

if (searchOperator === 'search-omdb') {
    getMovieInfo();
} else {
    console.log("Error!");
}

