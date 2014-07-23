'use strict';

angular.module('app.controllers', [])
  
  /**
   * DashboardIndex
   */
  .controller('DashboardIndex', function($rootScope, $scope) {
    //console.log($rootScope.currentUser);
  })

  /**
   * UsersLogin
   */
  .controller('SignIn', function($rootScope, $location, Routes) {
    if ($rootScope.currentUser !== null) {
      $location.path(Routes.dashboard.index);
    }
  });