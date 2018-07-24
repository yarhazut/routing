let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        //template: '<h1>This is the default route</h1>'
        templateUrl: 'components/Home/home.html',
        controller : 'homeController as homeCtrl'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/service', {
            templateUrl: 'components/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .when('/reg', {
            templateUrl: 'components/Register/register.html',
            controller : 'registerController as regCtrl'
        })
        .when('/retrievePass', {
            templateUrl: 'components/Home/retrievePass.html',
            controller : 'retrievePassController as retrieveCtrl'
        })
        .when('/favorites', {
            templateUrl: 'components/RegUsers/favorites.html',
            controller : 'favoritesController as favoritesCtrl'
        })
        .when('/regHome', {
            templateUrl: 'components/RegUsers/regHome.html',
            controller : 'regHomeController as regHomeCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);










