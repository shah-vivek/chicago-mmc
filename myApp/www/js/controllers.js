angular.module('mmc.controllers', ['mmc.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, Cart) {

	$scope.numberOfItems = Cart.get().length;
	$scope.$on('addedToCart', function(event, data) {
		$scope.numberOfItems = Cart.get().length;
	});
	$scope.$on('deletedFromCart', function(event, data) {
		$scope.numberOfItems = Cart.get().length;
	});
})
.controller('HomeCtrl', function($scope, $stateParams) {
})
.controller('ContactCtrl', function($scope, $stateParams) {
})
.controller('EventsCtrl', function($scope, $stateParams) {
	$scope.calendar = {};
        $scope.changeMode = function (mode) {
            $scope.calendar.mode = mode;
        };

        $scope.loadEvents = function () {
            $scope.calendar.eventSource = createRandomEvents();
            console.log($scope.calendar.eventSource);
        };

        $scope.onEventSelected = function (event) {
            console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
        };

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

        $scope.onTimeSelected = function (selectedTime, events) {
            console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
        };

        function createRandomEvents() {
            var events = [];
            for (var i = 0; i < 50; i += 1) {
                var date = new Date();
                var eventType = Math.floor(Math.random() * 2);
                var startDay = Math.floor(Math.random() * 90) - 45;
                var endDay = Math.floor(Math.random() * 2) + startDay;
                var startTime;
                var endTime;
                if (eventType === 0) {
                    startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                    if (endDay === startDay) {
                        endDay += 1;
                    }
                    endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                    events.push({
                        title: 'All Day - ' + i,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: true
                    });
                } else {
                    var startMinute = Math.floor(Math.random() * 24 * 60);
                    var endMinute = Math.floor(Math.random() * 180) + startMinute;
                    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                    endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                    events.push({
                        title: 'Event - ' + i,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: false
                    });
                }
            }
            return events;
        }
})
.controller('WalletCtrl', function($scope, $stateParams) {
})
.controller('NotificationCtrl', function($scope, $stateParams) {
})
.controller('ContactCtrl', function($scope, $stateParams) {
})
.controller('GalleryCtrl', function($scope, $stateParams) {

	$scope.items = [
	  {
	    src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
	    sub: 'This is a <b>subtitle</b>'
	  },
	  {
	    src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
	    sub: '' /* Not showed */
	  },
	  {
	    src:'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
	    thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
	  },
	  {
	    src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
	    sub: 'This is a <b>subtitle</b>'
	  },
	  {
	    src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
	    sub: '' /* Not showed */
	  },
	  {
	    src:'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
	    thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
	  }
	];
})
.controller('TicketsCtrl', function($scope, $stateParams , Product, Cart) {

	$scope.products = Product.get();

	$scope.addToCart = function(product) {
		Cart.add(product);
		$scope.$emit('addedToCart', true);
	};
})
.controller('MembershipCtrl', function($scope, $stateParams) {
})
.controller('PlaylistCtrl', function($scope, $stateParams) {

})
.controller('LogInCtrl', function($scope, $stateParams , $ionicSideMenuDelegate) {

		$ionicSideMenuDelegate.canDragContent(false);
})
.controller('CartCtrl', function($scope, $stateParams, Cart ) {

	$scope.items = Cart.get();
	$scope.totalPrice = Cart.getTotalPrice();

	$scope.delete = function( id ) {

		Cart.remove(id);
		$scope.totalPrice = Cart.getTotalPrice();
		$scope.$emit('deletedFromCart', true);
	};

	$scope.decrease = function(id) {
		Cart.addQty(id , -1);
		$scope.items = Cart.get();
		$scope.totalPrice = Cart.getTotalPrice();
	};

	$scope.increase = function(id) {
		Cart.addQty(id , 1);
		$scope.items = Cart.get();
		$scope.totalPrice = Cart.getTotalPrice();
	};
		
})
.controller('CheckoutCtrl', function($scope, $stateParams , $ionicSideMenuDelegate) {

		$ionicSideMenuDelegate.canDragContent(false);
});
