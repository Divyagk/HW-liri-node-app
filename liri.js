//In git bash type npm install axios,npm install dotenv

// require and configure dotenv.
require("dotenv").config();

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
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

        console.log(movieName);


        // the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);

        axios.get(queryUrl).then(
            function (response) {
                // console.log(response.data);
                console.log(JSON.stringify(response.data, null, 2));
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
    var queryUrl = "https://rest.bandsintown.com/artists/" + "Nelly" + "/events?app_id=codingbootcamp"
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log(JSON.stringify(response.data[0], null, 2));
            console.log('\nVenue name-  ' + JSON.stringify(response.data[0].venue.name) + '\nVenue-  ' + JSON.stringify(response.data[0].venue)
                + '\nDate of the Event- ' + JSON.stringify(response.data[0].datetime));





        }
    );
}



// * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")
