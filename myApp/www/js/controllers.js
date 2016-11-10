angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {

})
.controller('HomeCtrl', function($scope, $stateParams) {
})
.controller('ContactCtrl', function($scope, $stateParams) {
})
.controller('EventsCtrl', function($scope, $stateParams) {
	$scope.events = [
		{ 'date' : '2012-03-04',
		  'name' : 'Event 1',
		  'description' : 'This is sample description'
		},
		{ 'date' : '2012-03-04',
		  'name' : 'Event 1',
		  'description' : 'This is sample description'
		},
		{ 'date' : '2012-03-04',
		  'name' : 'Event 1',
		  'description' : 'This is sample description'
		}
	];
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
})
.controller('MembershipCtrl', function($scope, $stateParams) {
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
