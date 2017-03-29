/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $state, $timeout, $ionicPush ) {
    // Form data for the login modal

    var userInfo = JSON.parse(localStorage.getItem('user'));
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.userName = userInfo.firstName + ' ' + userInfo.lastName;
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

    $scope.logout = function() {
        localStorage.removeItem("user");
        $state.go('login');
    };


     $ionicModal.fromTemplateUrl('custom-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
    });

})
.controller('SideMenuCtrl', function($scope ) {

    $scope.theme = 'ionic-sidemenu-stable';
    $scope.tree =
    [
    {
        id: 0,
        name: "Home",
        icon: "ion-home",
        level: 0,
        state: 'app.home'
    },
    {
        id: 1,
        level: 0,
        name: 'About Us',
        icon: "ion-information-circled",
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
        name: "Membership",
        icon: "ion-person-add",
        level: 0,
        state: 'app.membership'
    },
    {
        id: 3,
        name: "Events",
        icon: "ion-calendar",
        level: 0,
        state: 'app.event'
    },
    {
        id: 4,
        name: "Albums",
        icon: "ion-images",
        level: 0,
        state: 'app.album'
    }];

})
.controller('LoginCtrl', function($scope, $timeout, $state, $stateParams, $ionicLoading, $ionicModal, Login) {

    $ionicModal.fromTemplateUrl('custom-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.user = {
        email: '',
        password: ''
    };

    $scope.login = function() {
        $ionicLoading.show();
        Login.enter($scope.user).then(function(response){
            $ionicLoading.hide();
            if( response.data.userDetails ) {
                localStorage.setItem( "user" , JSON.stringify(response.data.userDetails));
                $state.go('app.home');
            } else {
                $scope.modal.msg = response.data.status.statusMsg;
                $scope.modal.show();
            }
        },function(error){
            $ionicLoading.hide();
            $scope.modal.msg = "Internal server error";
            $scope.modal.show();
        });
    };

})
.controller('MembershipCtrl', function($scope, $timeout, $stateParams) {


    $scope.open = function() {
        cordova.InAppBrowser.open('http://shop.mahamandalchicago.org/main.sc' , '_blank');
    };
})

.controller('SignUpCtrl', function($scope, $timeout, $stateParams, $ionicModal , $ionicLoading, $state , SignUp) {

     $ionicModal.fromTemplateUrl('custom-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.user = {
        firstName: '',
        lastName: '',
        pass: '',
        email: '',
        type: 'user',
        cpass: '',
        pin: ''
    };

    $scope.signup = function() {
        if( $scope.user.cpass.trim() == $scope.user.pass.trim() ){

            $ionicLoading.show();
            SignUp.enter($scope.user).then(function(response){
                $ionicLoading.hide();
                if(response.data.status == 'SUCCESS') {
                    localStorage.setItem('user' , JSON.stringify($scope.user));
                    $state.go('app.home');
                } else {
                    $scope.modal.msg = response.data.statusMsg;
                    $scope.modal.show();
                }
            }, function(response){
                    $ionicLoading.hide();
                    $scope.modal.msg = "Internal server error";
                    $scope.modal.show();
            });
        }else {
            $scope.modal.msg = "Passwords do not match.";
            $scope.modal.show();
        }
    };
})

.controller('EventCtrl', function($scope, $timeout, $stateParams,$state , $location , $ionicLoading  , Events ) {

        $ionicLoading.show();
        Events.get().then(function(response){
            $scope.eventSource = response.data;
            $ionicLoading.hide();
        },function(error){
            $ionicLoading.hide();
        });



})


.controller('EventdetailsCtrl', function($scope, $stateParams,  $timeout, $ionicLoading, Events) {

    $ionicLoading.show();
    Events.get($stateParams.id).then(function(response){
        var event = $scope.event = response.data;
        var getTimeInfo = function (dateStr){
              var dateArr = dateStr.split('T')[0].split('-');
              var timeArr = dateStr.split('T')[1].split('.')[0].split(':');
              var info = {
                      year : dateArr[0],
                      month : dateArr[1],
                      date : dateArr[2],
                      hours : timeArr[0],
                      minutes :  timeArr[1],
                      sec : timeArr[2]
              	}
              return info;
        };
        $scope.startDateInfo = getTimeInfo(event.eventStart);
        $scope.endDateInfo = getTimeInfo(event.eventEnd);
        $ionicLoading.hide();

    },function(error){
        $ionicLoading.hide();
    });

    var latLng = new google.maps.LatLng(41.7582711, -88.1910167);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var options = {timeout: 10000, enableHighAccuracy: true};


        $scope.open = function() {
            cordova.InAppBrowser.open('https://www.tugoz.com/mmc/' , '_blank');
        };


})

.controller('NotificationsCtrl', function($scope, $stateParams, $timeout ) {

})


.controller('HomeCtrl', function($scope, $stateParams, $timeout ) {
   if(window.pushRegistered === true){
       $scope.message = window.pushToken;
   }else{
       $scope.message = "Push did not work";
   }


})

.controller('MmcCtrl', function($scope, $stateParams, $timeout ) {

})

.controller('AlbumCtrl', function($scope, $stateParams, $state, $timeout, $ionicLoading, Albums ) {

    $ionicLoading.show();
    Albums.get().then(function(response){
        var albumYearColl = $scope.albumYearColl = response.data;
        var yearsOpen = $scope.yearsOpen = {};
        albumYearColl.forEach(function(albumYearInfo){
            yearsOpen[albumYearInfo.yearNumber] = false;
        });
        $scope.closeYear = function(year){
            yearsOpen[year] = !yearsOpen[year];
        }


        $ionicLoading.hide();
    },function(error){
        $ionicLoading.hide();
    });



})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, $ionicLoading, Albums ) {

    $ionicLoading.show();

    Albums.get($stateParams.year, $stateParams.id).then(function(response){
        $scope.images = response.data.albumImagePaths.map(function(imagePath){
            return {
                src : imagePath,
                sub : ''
            }
        });
        $ionicLoading.hide();
    },function(error){
        $ionicLoading.hide();
    });
})

.controller('ContactCtrl', function($scope, $stateParams, $timeout, $ionicLoading, Message) {

   $scope.message = {
        subject: "",
        messageBody: "",
        sender: "",
        date : ""
    };

   $scope.send = function () {

        $scope.date = new Date();
        $scope.message.sender = JSON.parse(localStorage.getItem('user')).email;
        $scope.message.date = $scope.date.toJSON();
        $ionicLoading.show();

        Message.send($scope.message).then(function(response){
            $ionicLoading.hide();
            $scope.message = {
                subject: "",
                messageBody: "",
                sender: "",
                date : ""
            };
        }, function(response){
            $ionicLoading.hide();
        });

   };


})

.controller('CartCtrl', function($scope, $stateParams, $timeout) {

   $scope.items = Cart.get();

})

.controller('PresidentCtrl', function($scope, $stateParams, $timeout  ) {




})

.controller('TicketsCtrl', function($scope, $stateParams, $timeout  ) {




})

.controller('CommitteeCtrl', function($scope, $stateParams, $timeout ) {


})

;
