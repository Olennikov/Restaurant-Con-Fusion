'use strict';

angular.module('confusionApp', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider){


$stateProvider.state('app', { // route for the home page
                url:'/',
                views: {
                    'navbar':{
                      templateUrl: 'views/navbar.html'
                    },
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
                    // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                  'navbar@':{
                    templateUrl: 'views/navbar.html'
                  },
                    'header@':{
                      template: ''
                    },
                    'content@': {
                        templateUrl: 'views/aboutus.html',
                        controller  : 'AboutController'
                   }
                }
            })
                    // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                  'navbar@':{
                    templateUrl: 'views/navbar.html'
                  },
                    'header@':{
                      template: ''
                    },
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                     }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                  'navbar@':{
                    templateUrl: 'views/navbar.html'
                  },
                    'header@':{
                      template: ''
                    },
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                  'navbar@':{
                    templateUrl: 'views/navbar.html'
                  },
                    'header@':{
                      template: ''
                    },
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
            
            $urlRouterProvider.otherwise('/');



  // $routeProvider
  //   // route for the contactus page
  // .when('/contactus', {
  //   templateUrl:'contactus.html',
  //   controller:'ContactController'
  // })
  //   // route for the menu page
  // .when('/menu', {
  //   templateUrl:'menu.html',
  //   controller:'MenuController'
  // })
  //  // route for the dish details page
  //  .when('/menu/:id', {
  //    templateUrl:'dishdetail.html',
  //    controller:'DishDetailController'
  //  })
  //  .otherwise('/contactus');

});
