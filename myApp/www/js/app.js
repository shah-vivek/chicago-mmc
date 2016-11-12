// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'mmc.controllers', 'ui.rCalendar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

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

  .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        }
      }
    })
  .state('app.event-detail', {
      url: '/event-detail',
      views: {
        'menuContent': {
          templateUrl: 'templates/event-detail.html'
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
  .state('app.gallery', {
    url: '/gallery',
    views: {
      'menuContent': {
        templateUrl: 'templates/gallery.html',
        controller: 'GalleryCtrl'
      }
    }
  }).state('app.membership', {
    url: '/membership',
    views: {
      'menuContent': {
        templateUrl: 'templates/membership.html',
        controller: 'MembershipCtrl'
      }
    }
  }).state('app.notification', {
    url: '/notification',
    views: {
      'menuContent': {
        templateUrl: 'templates/notification.html',
        controller: 'NotificationCtrl'
      }
    }
  }).state('app.wallet', {
    url: '/wallet',
    views: {
      'menuContent': {
        templateUrl: 'templates/wallet.html',
        controller: 'WalletCtrl'
      }
    }
  }).state('app.about-us', {
    url: '/about-us',
    views: {
      'menuContent': {
        templateUrl: 'templates/about-us.html'
      }
    }
  }).state('app.contact-us', {
    url: '/contact-us',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
      }
    }
  }).state('app.log-in', {
    url: '/log-in',
    views: {
      'menuContent': {
        templateUrl: 'templates/log-in.html',
        controller: 'LogInCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
