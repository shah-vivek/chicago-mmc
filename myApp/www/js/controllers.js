angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {

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
})
.controller('TicketsCtrl', function($scope, $stateParams) {

	$scope.products = [
		{
			productId: 1,
			type: 'membership',
			title: 'MMC Family Membership',
			description: 'MMC Family Membership for Calendar Year 2016.',
			validity: {
				from: '01-01-2016',
				to: '31-12-2016'
			},
			price: 30
		},
		{
			productId: 2,
			type: 'membership',
			title: 'MMC Single Membership',
			description: 'MMC Single Membership for Calendar Year 2016.',
			validity: {
				from: '01-01-2016',
				to: '31-12-2016'
			},
			price: 15
		},
		{
			productId: 3,
			type: 'membership',
			title: 'MMC Lifetime Membership',
			description: 'MMC Lifetime Membership for Calendar Year 2016.',
			validity: {
				from: null,
				to: null
			},
			price: 350
		},
		{
			productId: 4,
			type: 'event',
			title: 'New Year Celebration',
			description: 'MMC New Year Celebration 2017.',
			validity: {
				from: '01-01-2017',
				to: '01-01-2017'
			},
			price: 30
		}
	];
})
.controller('MembershipCtrl', function($scope, $stateParams) {
})
.controller('PlaylistCtrl', function($scope, $stateParams) {

}).controller('LogInCtrl', function($scope, $stateParams , $ionicSideMenuDelegate) {

		$ionicSideMenuDelegate.canDragContent(false);
});
