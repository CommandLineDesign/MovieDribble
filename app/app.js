//Main App

angular.module('counsylmoviedribble', [
		'ngStamplay',
    'ngSanitize',
    'angular-toArrayFilter',
    'algoliasearch',
		'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
		'app.routes',
		'app.home',
    'app.movie',
    'app.admin',
		'app.authenticate',
		'app.grid',
		'UserService',
    'MovieService'
	])
.controller('MainController', ['User', '$rootScope', 'algolia', '$q', '$state', MainController])
.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
// App Controller

function MainController(User, $rootScope, algolia, $q, $state) {
  var main = this;
  main.logout = logout;

  $rootScope.currentUser = {}; // creating this object to hold our current users info

  var client = algolia.Client('O1TRXH3CDG', 'c9118a7aaca0d26ffcd28b3453589b35');
  var index = client.initIndex('movies');

  main.searchMovies = searchMovies;
  main.searchPicked = searchPicked;

    /**
   * Use algolia to search for movies
   * The typeahead function uses promises which is why we use $q
   */
  function searchMovies(query) {
    var def = $q.defer();

    // do the search
    index.search(query, { hitsPerPage: 10 })
      .then(function(data) {
        // return the found items
        def.resolve(data.hits);
      }, function(data) {
        // return no items
        def.resolve([]);
      });

    return def.promise;
  }

  /**
   * What to do when an item from the search box is clicked
   * Navigate to that movie using ui-routers $state.go
   */
  function searchPicked($item, $model, $label) {
    $state.go('movie', { id: $item.id, name: $item.name });
  }


  function logout() {
    User.logout();
    $rootScope.currentUser = {};
  }

  // get the current user and bind their data to $rootScope.currentUser object
  User.getCurrent()
    .then(function(data) {
      if (data.get('_id')) {
        $rootScope.currentUser.id    = data.get('_id');
        $rootScope.currentUser.name  = data.get('displayName');
        $rootScope.currentUser.image = data.get('profileImg');
      } else {
        // clear the current user just to be sure
        $rootScope.currentUser = {};
      }
    });
}