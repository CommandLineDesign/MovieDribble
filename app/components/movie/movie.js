// movie.js
angular
  .module('app.movie', [])
  .controller('MovieController', ['Movie', '$stateParams', MovieController]);

function MovieController(Movie, $stateParams) {
  var movie = this;
  movie.createComment = createComment;
  // get the movie for this page and bind it to the movie.listing object
  Movie.get($stateParams.id)
    .then(function(data) {
      // since this is a singular Stamplay model that was returned, we can bind instance directly
      movie.listing = data.instance;
      movie.pictures = data.get('pictures');
      movie.categories = data.get('categories');
    });

    	// get all the comments and bind to product.comments
	Movie.getComments($stateParams.id)
		.then(function(data) {
			movie.comments = data.instance;
		});

	function createComment() {
		Movie.comment($stateParams.id, movie.commentData)
			.then(function(data) {
			// clear the comment form
			movie.commentData = {};

			// replace the comments with the new comments returned
			movie.listing.actions.comments = data.instance.actions.comments;
		});
	}
}