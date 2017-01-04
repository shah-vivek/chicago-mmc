// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',  'ionic-sidemenu' , 'ionMdInput',  'mmc.services' , 'mmc.directives', 'ion-gallery'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('signup', {
        url: '/login',
        templateUrl: 'templates/sign-up.html',
        controller: 'SignUpCtrl'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.mmc', {
        url: '/mmc',
        views: {
            'menuContent': {
                templateUrl: 'templates/mmc.html',
                controller: 'MmcCtrl'
            }
        }
    })

    .state('app.president', {
        url: '/president',
        views: {
            'menuContent': {
                templateUrl: 'templates/president.html',
                controller: 'PresidentCtrl'
            }
        }
    })

    .state('app.committee', {
        url: '/committee',
        views: {
            'menuContent': {
                templateUrl: 'templates/committee.html',
                controller: 'CommitteeCtrl'
            }
        }
    })

    .state('app.notifications', {
        url: '/notifications',
        views: {
            'menuContent': {
                templateUrl: 'templates/notifications.html',
                controller: 'NotificationsCtrl'
            }
        }
    })

    .state('app.album', {
        url: '/album',
        views: {
            'menuContent': {
                templateUrl: 'templates/album.html',
                controller: 'AlbumCtrl'
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            }
        }
    })
    .state('app.membership', {
        url: '/membership',
        views: {
            'menuContent': {
                templateUrl: 'templates/membership.html',
                controller: 'MembershipCtrl'
            }
        }
    })

    .state('app.event', {
        url: '/event',
        views: {
            'menuContent': {
                templateUrl: 'templates/event.html',
                controller: 'EventCtrl'
            }
        }
    })

    .state('app.eventdetails', {
        url: '/eventdetails',
        views: {
            'menuContent': {
                templateUrl: 'templates/edetail.html',
                controller: 'EventDetailCtrl'
            }
        }
    })

    .state('app.contact', {
        url: '/contact',
        views: {
            'menuContent': {
                templateUrl: 'templates/contact.html',
                controller: 'ContactCtrl'
            }
        }
    })
    .state('app.cart', {
        url: '/cart',
        views: {
            'menuContent': {
                templateUrl: 'templates/cart.html',
                controller: 'CartCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
