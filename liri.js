var fs = require('fs');
var keys = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');
var colors = require('colors');
var type = process.argv[2];
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

if (type == "tweets") {
  var params = { screen_name: 'ATXWarnock' };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      if (process.argv[3] == undefined) {
        for (i = 0; i < 20; i++) {
          console.log("\n@ATXWarnock said: ".red + "\n" + tweets[i].text.blue + "\n" + "On: " + tweets[i].created_at.green.underline + "." + "\n")
        }
      } else {
        for (i = 0; i < process.argv[3]; i++) {
          console.log("\n@ATXWarnock said: ".red + "\n" + tweets[i].text.blue + "\n" + "On: " + tweets[i].created_at.green.underline + "." + "\n")
        };
      };
    };
  });
};

if (type == "spotify") {
  var songTitle = process.argv[3]
  if (songTitle === undefined) {
    songTitle = "what's my age again";
  }
  spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    var items = data.tracks.items;
    for (i = 0; i < items.length; ++i) {
      console.log("\n" + "Song information for query".bold + ": " + '"' + songTitle + '"' + ".");
      console.log("Song Name: ".bold.green + items[i].name.rainbow);
      for (k = 0; k < items[i].artists.length; ++k) {
        console.log("Artist: ".bold.green + items[i].artists[k].name.red);
      }
      console.log("Album Name: ".bold.green + items[i].album.name.red);

      console.log("Spotify Link: ".bold.green + items[i].preview_url.blue);
    }
    console.log("\n");

  });
};

if (type == "movie") {
  var movie = process.argv[3];
  if (movie == undefined) {
    movie = "Mr. Nobody"
  }
  request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r==json', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      console.log("\nTitle".bold.underline + ": " + json.Title.rainbow.underline + ".");
      console.log("Year".bold.underline + ": " + json.Year.green + ".");
      console.log("IMDB Rating".bold.underline + ": " + json.imdbRating.green + ".");
      console.log("Country".bold.underline + ": " + json.Country.green + ".");
      console.log("Language".bold.underline + ": " + json.Language.green + ".");
      console.log("Plot".bold.underline + ": " + json.Plot.green);
      console.log("Actors".bold.underline + ": " + json.Actors.green + ".");
      console.log("Rotten Tomatoes rating".bold.underline + ": " + json.tomatoRating.green + ".");
      console.log("Rotten Tomatoes URL".bold.underline + ": " + json.tomatoURL.green + "." + "\n");
    };
  });
};
