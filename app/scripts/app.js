'use strict';

/**
 * @ngdoc overview
 * @name ChaserApp
 * @description
 * # ChaserApp
 *
 * Main module of the application.
 */
angular
  .module('ChaserApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/test',
        controller: 'TestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
