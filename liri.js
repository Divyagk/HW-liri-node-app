require("dotenv").config();

var spotify = new Spotify(keys.spotify);
// the axios npm package
var axios = require("axios");

// `node liri.js movie-this '<movie name here>'`
// empty variable for holding the movie name.
var movieName = "";
console.log(movieName);
for (i = 2; i < process.argv.length; i++) {
    if (i > 2 && process.argv.length) {
        movieName = process.argv[i] + "+" + process.argv[i];


    }
    else {
        movieName += process.argv[i];
    }
}
console.log(movieName);

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl)

axios.get(queryUrl).then(function(response){

console.log(response);

});



