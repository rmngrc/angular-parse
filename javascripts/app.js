'use strict';

// Initialize parse
Parse.initialize('gvJHxg9BnzbWSpkFJtvwNZb63pHPslc4qqXXC2UD', 'N82b9rY9aMPFyXWfQpe0HVxgP6gxLq8uZzmS1dtF');

// ----------------------------------------------
// App declaration and dependencies.
// ----------------------------------------------

angular.module('app', [
  'ngRoute',
  'app.controllers',
  'app.services',
  'app.directives'
]).

// ----------------------------------------------
// Constants.
//
// Use them for routing in the whole app. 
// Inject Routes in every place you need it.
// ----------------------------------------------

constant('Routes', {
  baseurl: '',
  dashboard: {
    index: '/dashboard'
  },
  users: {
    signin: '/login',
    signout: '/logout'
  }
}).

// ----------------------------------------------
// Routing.
// ----------------------------------------------

config(function($routeProvider, $locationProvider, Routes) {
  $routeProvider
    .when(Routes.dashboard.index, {controller: 'DashboardIndex', templateUrl: 'views/dashboard/index.html'})
    .when(Routes.users.signin, {controller: 'SignIn', templateUrl: 'views/users/signin.html'})
    .otherwise({redirectTo: Routes.users.signin});
}).

// ----------------------------------------------
// Global scope utilities.
// ----------------------------------------------

run(function($rootScope, $location, $templateCache, Routes) {
  $rootScope.currentUser = Parse.User.current();

  if ($rootScope.currentUser === null) {
    $location.path(Routes.users.signin);
  }

  // Sign in
  $rootScope.signIn = function(form) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        $rootScope.currentUser = user;
        $location.path(Routes.dashboard.index);
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
      },
      error: function(user, error) {
        alert('Unable to log in: ' + error.code + ' ' + error.message);
      }
    });
  };

  // Sign up
  $rootScope.signUp = function(form) {
    var user = new Parse.user();
    user.set('email', form.email);
    user.set('username', form.username);
    user.set('password', form.password);

    user.signUp(null, {
      success: function(user) {
        $rootScope.currentUser = user;
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }        
      },
      error: function(user, error) {
        alert('Unable to sign up: ' + error.code + ' ' + error.message);
      }
    });
  };

  // Sign out
  $rootScope.signOut = function(form) {
    Parse.User.logOut();
    $rootScope.currentUser = null;
    $location.path(Routes.users.signin);
  };

  // Get menu link active class
  // Usage: <li ng-class="getClass('/dashboard')"><a href="#/dashboard">Dashboard</a></li>
  $rootScope.activeClass = function(path) {
    return $location.path().substr(0, path.length) === path ? 'active' : '';
  };

})