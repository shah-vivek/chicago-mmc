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
.controller('LoginCtrl', function($scope, $timeout, $stateParams) {
    
})
.controller('MembershipCtrl', function($scope, $timeout, $stateParams) {
    

    $scope.open = function() {
        window.open('http://shop.mahamandalchicago.org/main.sc' , '_blank');
    };
})

.controller('SignUpCtrl', function($scope, $timeout, $stateParams) {
    
})

.controller('EventCtrl', function($scope, $timeout, $stateParams,$state , $location , $ionicLoading  , Events , Cart) {

    
    $scope.eventSource = Events.get();
        $ionicLoading.show({
          template: 'Loading...',
          duration: 3000
        });
       

        
})


.controller('EventDetailCtrl', function($scope, $stateParams,  $timeout, Events) {

    $scope.event = Events.get( $stateParams.id );

    var options = {timeout: 10000, enableHighAccuracy: true};
 
   
 
        var latLng = new google.maps.LatLng(41.7582711, -88.1910167);
     
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $scope.open = function() {
            window.open('http://shop.mahamandalchicago.org/main.sc' , '_blank');
        };
     
      
})

.controller('NotificationsCtrl', function($scope, $stateParams, $timeout ) {
   
})


.controller('HomeCtrl', function($scope, $stateParams, $timeout ) {
   

    
})

.controller('MmcCtrl', function($scope, $stateParams, $timeout ) {
   
})

.controller('AlbumCtrl', function($scope, $stateParams, $timeout ) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout ) {

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

.controller('ContactCtrl', function($scope, $stateParams, $timeout) {

   
  

})

.controller('CartCtrl', function($scope, $stateParams, $timeout,  Cart) {

   $scope.items = Cart.get();
   
})

.controller('PresidentCtrl', function($scope, $stateParams, $timeout  ) {


   
   
})

.controller('CommitteeCtrl', function($scope, $stateParams, $timeout ) {


})

;
