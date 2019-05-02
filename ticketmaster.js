require("dotenv").config();

// Linking the API key file
const keys = require("./keys");

// Linking Node packages
var axios = require("axios");

/* Remove this if you figure out how to put them in .env files
// TM API key
var ticketmaster = new ticketmaster({
    id: "VxvcN1vhCx6B4wxM9bk5EG2AnEDUF1vz",
    secret: "Ae0yDVTAT0vCU5KL"
});
*/

// Storing user input in a variable
var searchOperator = process.argv[2];
var input = process.argv[3];

// Function that'll enter if the user enters "ticketmaster" as the operator

function getEventsFromTM () {
    console.log("Please wait while I search for your query...");
    var queryUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=VxvcN1vhCx6B4wxM9bk5EG2AnEDUF1vz&keyword=armin+van+buuren';

    axios.get(queryUrl).then(
        function(response) {
            // Make separate clg for each of the reqd items here
            console.log('Venue: ' + response.data._embedded.venues.name);
            console.log('Date of Event: ' + response.data._embedded.events[0].dates.start.localDate);
            //console.log('Venue:');
            //venues.city.name, .country.name, .name
            
        }
    )
}      

if (searchOperator === 'ticketmaster') {
    getEventsFromTM();
} else {
    console.log("Error!");
}
