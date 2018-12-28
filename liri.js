//In git bash type npm install axios,npm install dotenv

// require and configure dotenv.
require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// the axios npm package
var axios = require("axios");

// `node liri.js movie-this '<movie name here>'`
// Store all of the arguments in an array

// empty variable to hold movie name
var movieName = "";
// var action=process.argv[2];

// Loop through all the words in the node argument
for (var i = 2; i <process.argv.length; i++) {

  if (i > 2 && i < process.argv.length) {
    movieName = movieName + "+" + process.argv[i];
  }
  else {
    movieName += process.argv[i];

  }

}
console.log(movieName)

// the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    // console.log(response.data);
    console.log(JSON.stringify(response.data, null, 2));

    console.log('\nTitle of the movie is '+JSON.stringify(response.data.Title)+'\nYear the movie came out-  '+ JSON.stringify(response.data.Year) 
    +'\nIMDB Rating of the movie- '+ JSON.stringify(response.data.imdbRating)+'\nRotten Tomatoes Rating of the movie- '
    +JSON.stringify(response.data.Ratings[1])+'\nCountry where the movie was produced- '+JSON.stringify(response.data.Country)+
    '\nLanguage of the movie- '+JSON.stringify(response.data.Language)+'\nPlot of the movie- '+JSON.stringify(response.data.Plot)+'\nActors in the movie- ' +JSON.stringify(response.data.Actors) );

    
    
}
);




