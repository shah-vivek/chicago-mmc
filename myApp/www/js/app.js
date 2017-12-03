var initPushNotification = function(){
    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
    
    window.plugins.OneSignal
    .startInit("eff6e384-322d-4f30-bdef-da05e359b198")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
};
var envURL = 'http://mahamandalchicagomobile.org/mmc_ver_2/';
//var envURL = 'http://localhost:8082/';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic.cloud','ionic', 'ui.router' , 'starter.controllers',  'ionic-sidemenu' , 'ionMdInput',  'mmc.services' , 'mmc.directives', 'ion-gallery'])
.service('URLConfig', function(){
    var URLConfig = {
        authentication : {
            login : envURL+'login/',
            signUp : envURL+'members/signup/',
            verifyPin: envURL + 'members/verify-pin',
            resetPassword: envURL + 'members/reset-password'         
        },
        events : {
            getEvent : envURL + 'events/get?eventId=',
            getEventList : envURL + 'events/list/',
        },
        albums : {
            base : envURL + 'album/',
            getAlbumList : envURL + 'album/year/list',
        },
        messages : {
            sendMessage : envURL + 'message/send/'
        },
        homePage : {
            getHomePageInfo : envURL + 'home_page/list'
        },
        presidentCorner : {
            get : envURL + 'presidentCorner/get'
        },
        membership : {
            get : envURL + 'membership/list'
        },
        aboutMMC : {
            get : envURL + 'mmc/get'
        }
    };


    return URLConfig;
})
.run(function($ionicPlatform , $state, $rootScope, Login) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
        if( $rootScope.user) {
            Login.enter($rootScope.user).then(function(response){
               
                if( response.userDetails ) {
                    $state.go('app.mmc');
                }
            },function(error){
                
            });
        }

        //init push notification
        initPushNotification();
        
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
        url: '/signup',
        templateUrl: 'templates/sign-up.html',
        controller: 'SignUpCtrl'
    })
    .state('forgot-password',{
        url : '/forgot-password',
        templateUrl : 'templates/forgot-password.html',
        controller : 'ForgotPasswordCtrl'
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
                controller: 'MMCCtrl'
                
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
                templateUrl: 'templates/committee.html'
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
        url: '/:year/gallery/:id',
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

    .state('app.tickets', {
        url: '/tickets',
        views: {
            'menuContent': {
                templateUrl: 'templates/tickets.html',
                controller: 'TicketsCtrl'
            }
        }
    })

    .state('app.eventdetails', {
        url: '/eventdetails/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/edetail.html',
                controller: 'EventdetailsCtrl'
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
    $urlRouterProvider.otherwise(function($injector, $location){
       if(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).email){
            $location.path('/app/home')
       }
       else{
           $location.path('/login');
       }
    });
});
