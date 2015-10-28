// Home ctrl
angular
    .module('app.home', [])
    .controller('HomeController', ['Movie', HomeController]);

function HomeController(Movie) {
  var home = this;
  home.sortType = 'name';
  home.reversed = false;

  // get all the Movies and bind them to home.movies
  Movie.all()
    .then(function(data) {
      home.movies = data.instance;
    });
}