//In git bash type npm install axios,npm install dotenv,npm install moment,npm install --save node-spotify-api

// require and configure dotenv.
require("dotenv").config();

var Spotify = require('node-spotify-api');
// Using the require keyword lets us access all of the exports in our keys.js file
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// fs is a core Node package for reading and writing files
var fs = require("fs");

// moment
var moment = require('moment');
// moment().format();
// the axios npm package
var axios = require("axios");

// `node liri.js movie-this '<movie name here>'`

// Store all of the arguments in an array
var action = process.argv[2];

switch (action) {
    case "movie-this":
        var movie = " "
        moviethis(movie);
        break;

    case "concert-this":
        var event = " ";
        concert(event);
        break;

    case "spotify-this-song":
        var song = " ";
        spotify(song);
        break;

    case "do-what-it-says":
        dowhatitsays();
        break;


}

function moviethis(movie) {
    // empty variable to hold movie name
    var movieName = "";

    if (process.argv.length === 3 && process.argv[2] != "do-what-it-says") {
        nomoviein();
    }
    else if (process.argv.length > 3) {
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



    }
    else if (process.argv.length === 3 && process.argv[2] === "do-what-it-says") {

        var movieName = movie;
    }

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

function nomoviein() {

    console.log("Mr.Nobody");
    console.log("If you haven't watched Mr. Nobody, then you should: " + " http://www.imdb.com/title/tt0485947/" + " It's on Netflix!")
}


// `node liri.js concert-this <artist/band name here>`

function concert(event) {

    //empty variable to hold artist name or band name.
    var artistband = "";
    if (process.argv.length > 3) {
        for (var i = 3; i < process.argv.length; i++) {

            if (i > 3 && i < process.argv.length) {
                artistband = artistband + "+" + process.argv[i];
            }
            else {
                artistband += process.argv[i];

            }


        }
    }
    else if (process.argv.length === 3 && process.argv[2] === "do-what-it-says") {

        var artistband = event;
    }

    console.log(artistband);

    var queryUrl = "https://rest.bandsintown.com/artists/"+ artistband +"/events?app_id=codingbootcamp"
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            // console.log(JSON.stringify(response.data, null, 2));
            if (JSON.stringify(response.data) === "[]") {
                console.log("sorry!,not found");

            }
            else {

                for (i = 0; i < response.data.length; i++) {
                    console.log('\nVenue name-  ' + JSON.stringify(response.data[i].venue.name) + '\nVenue(country,region,city)- ' + JSON.stringify(response.data[i].venue.country) + "," + JSON.stringify(response.data[i].venue.region) + "," + JSON.stringify(response.data[i].venue.city)
                        + '\nDate of the Event- ' + moment(response.data[i].datetime).format("MM/DD/YYYY"));

                    // console.log(JSON.stringify(response.data[i].venue.country)+"," +JSON.stringify(response.data[i].venue.region) + "," +JSON.stringify(response.data[i].venue.city ))
                }
            }
        })
        .catch(function (error) {
            console.log(error + '\n Please provide a artist name');

        })
    




}


// `node liri.js spotify-this-song '<song name here>'`

function spotify(song) {

    var spotify = new Spotify(keys.spotify);

    // empty variable to hold songname.
    var songname = "";

    if (process.argv.length === 3 && process.argv[2] != "do-what-it-says") {
        nosongnamein();
    }

    else if (process.argv.length > 3) {


        // Loop through all the words in the node argument
        for (var i = 3; i < process.argv.length; i++) {

            if (i > 3 && i < process.argv.length) {
                songname = songname + " " + process.argv[i];
            }
            else {
                songname += process.argv[i];

            }

        }


        // console.log(songname);


    }
    else if (process.argv.length === 3 && process.argv[2] === "do-what-it-says") {

        var songname = song;
    }
    spotify
        .search({ type: 'track', query: songname, limit: 20 })
        .then(function (response) {
            for (i = 0; i < response.tracks.items.length; i++) {
                console.log('\nArtists-  ' + JSON.stringify(response.tracks.items[i].artists[0].name) + '\nSongs name - ' + JSON.stringify(response.tracks.items[i].name) + '\nPreview URL- ' + JSON.stringify(response.tracks.items[i].preview_url) + '\nAlbum name- ' + JSON.stringify(response.tracks.items[i].album.name));
                // console.log(JSON.stringify(response.tracks.items[i].artists[0].name, null, 2));
                // console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
                // console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
                // console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));

            }

        })
        .catch(function (err) {
            console.log(err);
        });




}


function nosongnamein() {

    console.log('\nThe Sign by Ace of Base.' + '\nPreview URL- ' + 'https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=bbb414111db841ebbc9a7005416b36f8 ');

}

// `node liri.js do-what-it-says`
function dowhatitsays() {
    // var userin=" "
    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        if (dataArr[0] === 'spotify-this-song') {
            var song = dataArr[1];
            spotify(song);
        }
        else if (dataArr[0] === 'concert-this') {
            var event = dataArr[1].replace(/['"]+/g, '');
        
        
            concert(event);
        }

        else if (dataArr[0] === 'movie-this') {
            var movie = dataArr[1];
            moviethis(movie);
        }



    });

}
