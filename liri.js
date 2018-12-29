//In git bash type npm install axios,npm install dotenv,npm install moment

// require and configure dotenv.
require("dotenv").config();

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// fs is a core Node package for reading and writing files
var fs = require("fs");

// moment
var moment = require('moment');
moment().format();
// the axios npm package
var axios = require("axios");

// `node liri.js movie-this '<movie name here>'`
// Store all of the arguments in an array


var action = process.argv[2];

switch (action) {
    case "movie-this":
        moviethis();
        break;

    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotify();
        break;

    // case "do-what-it-says":
    //     ();
    //     break;

}

function moviethis() {
    // empty variable to hold movie name
    var movieName = "";
    if (process.argv.length < 4) {
        nomoviein();
    }
    else {
        // Loop through all the words in the node argument
        for (var i = 3; i < process.argv.length; i++) {

            if (i > 3 && i < process.argv.length) {
                movieName = movieName + "+" + process.argv[i];
            }
            else {
                movieName += process.argv[i];

            }

        }

        // console.log(movieName);


        // the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        // console.log(queryUrl);

        axios.get(queryUrl).then(
            function (response) {
                
                // console.log(JSON.stringify(response.data, null, 2));
                // console the needed informations
                console.log('\nTitle of the movie is ' + JSON.stringify(response.data.Title) + '\nYear the movie came out-  ' + JSON.stringify(response.data.Year)
                    + '\nIMDB Rating of the movie- ' + JSON.stringify(response.data.imdbRating) + '\nRotten Tomatoes Rating of the movie- '
                    + JSON.stringify(response.data.Ratings[1].Value) + '\nCountry where the movie was produced- ' + JSON.stringify(response.data.Country) +
                    '\nLanguage of the movie- ' + JSON.stringify(response.data.Language) + '\nPlot of the movie- ' + JSON.stringify(response.data.Plot) + '\nActors in the movie- ' + JSON.stringify(response.data.Actors));



            }
        );
    }
}

function nomoviein() {

    console.log("Mr.Nobody");
    console.log("If you haven't watched Mr. Nobody, then you should: " + " http://www.imdb.com/title/tt0485947/" + " It's on Netflix!")
}


// `node liri.js concert-this <artist/band name here>`
function concert() {
    //empty variable to hold artist name or band name.
    var artistband = "";
    for (var i = 3; i < process.argv.length; i++) {

        if (i > 3 && i < process.argv.length) {
            artistband = artistband + "+" + process.argv[i];
        }
        else {
            artistband += process.argv[i];

        }

    }

    // console.log(artistband);



    var queryUrl = "https://rest.bandsintown.com/artists/" + artistband + "/events?app_id=codingbootcamp"
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            // console.log(JSON.stringify(response.data, null, 2));
            if (JSON.stringify(response.data) === "[]") {
                console.log("sorry!,not found");

            }
            else {

                for (i = 0; i < response.data.length; i++) {
                    console.log('\nVenue name-  ' + JSON.stringify(response.data[i].venue.name) + '\nVenue(country,region,city)- ' + JSON.stringify(response.data[i].venue.country)+"," +JSON.stringify(response.data[i].venue.region) + "," +JSON.stringify(response.data[i].venue.city )
                        + '\nDate of the Event- ' + moment(response.data[i].datetime).format("MM/DD/YYYY"));

// console.log(JSON.stringify(response.data[i].venue.country)+"," +JSON.stringify(response.data[i].venue.region) + "," +JSON.stringify(response.data[i].venue.city ))
                }
            }
        })
        .catch(function (error) {
            console.log(error);

        })




}


// `node liri.js spotify-this-song '<song name here>'`
// function spotify() {

// }
// `node liri.js do-what-it-says`
