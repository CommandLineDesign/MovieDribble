// app.js
angular
  .module('MovieService', [])
  .factory('Movie', ['$stamplay', '$q', '$http', MovieService]);

function MovieService($stamplay, $q, $http) {

  return {
    all: all,
    get: get,
    create: create,
    update: update,
    destroy: destroy,
    getComments: getComments,
    comment: comment,
    createPicture: createPicture,
    getCategories: getCategories
  };

  /**
   * Get all the movies
   */
  function all() {
    var def = $q.defer();

    // instanticate a new movie collection from the stamplay js sdk
    var movies = new $stamplay.Cobject('movies').Collection;
    movies.populate().fetch()
      .then(function() {
        def.resolve(movies);
      });

    return def.promise;
  }

  /**
   * Get a single movie
   */
  function get(id) {
    var def = $q.defer();

    // instanticate a new movie model from the stamplay js sdk
    var movie = new Stamplay.Cobject('movies').Model;

    // get the movie in question and return it
    movie.fetch(id, { populate: true })
      .then(function() {
        def.resolve(movie);
      });

    return def.promise;
  }

  /**
   * Create a movie
   */
  function create(data) {
    var def = $q.defer();

    // instanticate a new movie model from the stamplay js sdk
    var movie = new $stamplay.Cobject('movies').Model;
     angular.forEach(data, function(value, key) {
        movie.set(key, value);
      });
    movie.save()
      .then(function() {
        def.resolve(movie);
      });

    return def.promise;
  }

  /**
   * Update an existing movie
   */
  function update(id, data) {
    var def = $q.defer();

    // instanticate a new movie model from the stamplay js sdk
    var movie = new $stamplay.Cobject('movies').Model;
    movie.fetch(id)
      .then(function() {
        // loop over the fields in data and update the movie
        angular.forEach(data, function(value, key) {
          movie.set(key, value);
        });
        return movie.save();
      })
      .then(function() {
        // return the movie
        def.resolve(movie);
      });

    return def.promise;
  }

  /**
   * DESTROY a movie
   */
  function destroy(id) {
    var def = $q.defer();

    // instanticate a new movie model from the stamplay js sdk
    var movie = new $stamplay.Cobject('movies').Model;
    movie.fetch(id)
      .then(function() {
        return movie.destroy();
      })
      .then(function() {
        // return true that the movie was deleted
        def.resolve({ 'success': true });
      });

    return def.promise;
  }

  /**
   * Get all the comments for a specific movie
   */
  function getComments(id) {
    var def = $q.defer();

    // instanticate a new movie model from the stamplay js sdk
    var movie = new $stamplay.Cobject('movies').Model;
    movie.fetch(id)
      .then(function() {
        // a user will comment on the found movie
        def.resolve(movie.getComments());
      });

    return def.promise;
  }

  /**
   * Comment on a movie
   */
  function comment(id, data) {
    var def = $q.defer();

    // instanticate a new movie model from the stamplay js sdk
    var movie = new $stamplay.Cobject('movies').Model;
    movie.fetch(id)
      .then(function() {
        // a user will comment on the found movie
        return movie.comment(data.text);
      })
      .then(function() {
        // return the movie
        def.resolve(movie);
      });

    return def.promise;
  }

  /**
   * Create a picture
   */
  function createPicture(files) {
    var def = $q.defer();

    // create an object for the ids
    var pictureIDs = [];

    // loop over the files and upload them via the Stamplay API
    angular.forEach(files, function(file) {

      // create a new formdata to store our image
      var fd = new FormData();
      fd.append('photo', file);

      // process the upload
      $http({
        method: 'POST',
        url: 'https://counsylmoviedribble.stamplayapp.com/api/cobject/v1/pictures',
        data: fd,
        headers: { 'Content-Type': undefined },
        photo: file
      })
        .then(function(response) {
          // push the given id into the pictureIDs array
          pictureIDs.push(response.data.id);
          def.resolve({ pictures: pictureIDs });
        });
    });

    return def.promise;
  }

  /**
   * Get all the movie categories
   */
  function getCategories() {
      var def = $q.defer();

      // instanticate a new movie collection from the stamplay js sdk
      var movies = new $stamplay.Cobject('categories').Collection;
      movies.fetch()
          .then(function() {
              def.resolve(movies);
          });

      return def.promise;
  }

}