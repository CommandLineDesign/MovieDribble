angular
    .module('app.admin', [])
    .controller('AdminController', ['Movie', AdminController]);

function AdminController(Movie) {
  var admin         = this;

  admin.datepicker = {};
  admin.datepicker.open = function($event) {
    admin.datepicker.opened = true;
  };

  admin.movieData = {};
  admin.uploadPictures = uploadPictures;

  // bind the create product function to the controller
  admin.createMovie = createMovie;

  /**
   * Get all the product categories so we can show them in our form
   */
  Movie.getCategories()
    .then(function(data) {
      admin.categories = data.instance;
    });

  /**
   * Create a new product
   */
  function createMovie() {
    Movie.create(admin.movieData)
      .then(function(data) {
        // clear the form
        admin.movieData = {};

        // show a message that the product was successfully created
        // show a link to view that product
        admin.successMessage = 'Movie created!';
        admin.newMovieId   = data.get('_id');
        admin.newMovieName = data.get('name');
      });
  }

  /**
   * Loop over the files being uploaded, save them to Stamplay
   * Store the ids into admin.productData.pictures
   */
  function uploadPictures(files) {
    // use our product service to pass the files to Stamplay
    Movie.createPicture(files)
      .then(function(data) {
        // add the pictures array to our productData
        admin.movieData.pictures = data.pictures;
      });
  }
}