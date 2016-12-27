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

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    
})

.controller('SignUpCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    
})

.controller('EventCtrl', function($scope, $timeout, $stateParams, $ionicLoading , ionicMaterialInk , ionicMaterialMotion , Events , Cart) {

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

;
