// app.routes.js
angular
    .module('app.routes', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

/**
 * Create all the application routes
 */
function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

    // pretty Angular URLs
    $locationProvider.html5Mode(true);

    // the route people are sent to when they are lost
    // the home page in this case
    $urlRouterProvider.otherwise('/');

    // create our routes, set the view, pull in the controller
    $stateProvider

        // home page
        .state('home', {
            url         : '/',
            templateUrl : '/app/components/home/home.html',
            controller  : 'HomeController as home'
        })

        // login/signup page
        .state('authenticate', {
            url         : '/authenticate',
            templateUrl : '/app/components/authenticate/authenticate.html',
            controller  : 'AuthenticateController as authenticate'
        })

        // Movie Page
        .state('movie', {
            url         : '/movie/{id}/{name}',
            templateUrl : '/app/components/movie/movie.html',
            controller  : 'MovieController as movie'
        })

        // Admin Page
        .state('admin', {
            url         : '/admin',
            templateUrl : '/app/components/admin/admin.html',
            controller  : 'AdminController as admin'
        })

        // profile page
        .state('profile', {
            url         : '/profile/{user_name}',
            templateUrl : '/app/components/profile/profile.html',
            controller  : 'ProfileController as profile'
        });
}