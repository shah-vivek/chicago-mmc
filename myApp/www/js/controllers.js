/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout , Cart) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.numberOfItems = 0;

    $scope.$on('addedToCart', function(event, data) {
      $scope.numberOfItems = Cart.get().length;
    });

    $scope.$on('deletedFromCart', function(event, data) {
      $scope.numberOfItems = Cart.get().length;
    });
})
.controller('SideMenuCtrl', function($scope ) {

    $scope.theme = 'ionic-sidemenu-stable';
    $scope.tree =
    [{
        id: 1,
        level: 0,
        name: 'About Us',
        icon: "",
        items: [
              {
                id: 10,
                level: 1,
                name: 'MMC',
                icon: null,
                items: null,
                state: 'app.mmc'
              },
              {
                id: 11,
                level: 1,
                name: 'President Corner',
                icon: null,
                items: null,
                state: 'app.president'
              },
              {
                id: 12,
                level: 1,
                name: 'Executive Committee',
                icon: null,
                items: null,
                state: 'app.committee'
              }]
    }, 
    {
        id: 2,
        name: "Memmbership",
        icon: null,
        level: 0,
        state: 'app.membership'
    },
    {
        id: 3,
        name: "Events",
        icon: null,
        level: 0,
        state: 'app.event'
    },
    {
        id: 4,
        name: "Albums",
        icon: null,
        level: 0,
        state: 'app.album'
    },
    {
        id: 5,
        name: "Notifications",
        icon: null,
        level: 0,
        state: 'app.notifications'
    },
    {
        id: 6,
        name: "Contact Us",
        icon: null,
        level: 0,
        state: 'app.contact'
    }];
    
})
.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    
})

.controller('SignUpCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    
})

.controller('EventCtrl', function($scope, $timeout, $stateParams, $location , $ionicLoading , ionicMaterialInk , ionicMaterialMotion , Events , Cart) {

    $scope.calendar = {};
    $scope.calendar.eventSource = Events.get();
        $ionicLoading.show({
          template: 'Loading...',
          duration: 3000
        });
       

        $scope.onViewTitleChanged = function (title) {
            $scope.viewTitle = title;
        };

        $scope.today = function () {
            $scope.calendar.currentDate = new Date();
        };

        $scope.isToday = function () {
            var today = new Date(),
                currentCalendarDate = new Date($scope.calendar.currentDate);

            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
        };

        $scope.changeDate = function(n) {
            $scope.$broadcast('changeDate' , n);
        };

        $scope.onEventSelected = function( event ) {
            Events.selectedEvent = event;
            $location.path('/app/event-detail');
        };

        $scope.onTimeSelected = function(selectedTime, events) {
            console.log( "Event called" );
            $scope.events = events;
        };

        $scope.addToCart = function( event ) {
            event.added = true;
            Cart.add( event  );
            $scope.$emit('addedToCart', true);
        };

        $scope.remove = function( event ) {
            event.added = false;
            Cart.remove( event.id );
            $scope.$emit('deletedFromCart', true);
        };
})


.controller('EventDetailCtrl', function($scope, $stateParams,  $timeout, ionicMaterialMotion, ionicMaterialInk , Events) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.event = Events.selectedEvent;

    var options = {timeout: 10000, enableHighAccuracy: true};
 
   
 
        var latLng = new google.maps.LatLng(41.7582711, -88.1910167);
     
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
     
      
})

.controller('NotificationsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('HomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('MmcCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('AlbumCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.items = [
    {
      src:'http://www.mahamandalchicago.org/wp-content/gallery/gudhipadwa_2016/DSC_0065.JPG'
    },
    {
      src:'http://www.mahamandalchicago.org/wp-content/gallery/gudhipadwa_2016/DSC_0067.JPG'
    },
    {
      src:'http://www.mahamandalchicago.org/wp-content/gallery/gudhipadwa_2016/DSC_0066.JPG'
    },
    {
      src:'http://www.mahamandalchicago.org/wp-content/gallery/gudhipadwa_2016/DSC_0068.JPG'
    },
    {
      src:'http://www.mahamandalchicago.org/wp-content/gallery/gudhipadwa_2016/DSC_0069.JPG'
    },
    {
      src:'http://www.mahamandalchicago.org/wp-content/gallery/gudhipadwa_2016/DSC_0084.JPG'
    }
  ];

  
})

.controller('ContactCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

   
  

})

.controller('CartCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion , Cart) {

   $scope.items = Cart.get();
   
})

.controller('PresidentCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ) {

// Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
   
   
})

.controller('CommitteeCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

   // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
  

})

;
