
angular.module('mmc.services', [])

.service('Login',function ( $http, URLConfig) {

	this.enter = function( user ) {

		return $http.post(URLConfig.authentication.login,user);
		
	};
	
})
.service('SignUp',function ( $http, URLConfig) {

	this.enter = function( user ) {

		return $http.post(URLConfig.authentication.signUp,user);
	};
	
})
.service('Events', function( $http, URLConfig ){
	
	this.get = function( id ) {
		
		if( id ) {
			
			return $http.get(URLConfig.events.getEvent+id);


		} else {

			return $http.get(URLConfig.events.getEventList);
		}
	};

	this.selectedEvent = null;
})
.service('Albums', function( $http, URLConfig ){
	
	this.get = function( year, id ) {
		
		if( id ) {
			
			return $http.get(URLConfig.albums.base+year+'/'+id);


		} else {

			return $http.get(URLConfig.albums.getAlbumList);
		}
	};

	this.selectedAlbum = null;
})
.service('Message', function( $http, URLConfig ){

	this.send = function( message ) {

		return $http.post(URLConfig.messages.sendMessage, message);
	};
})
.service('Authenticate', function($http, URLConfig){
	this.verifyPin = function(pinInfo){
		return $http.post(URLConfig.authentication.verifyPin, pinInfo);  
	}
	this.resetPassword = function(passInfo){
		return $http.post(URLConfig.authentication.resetPassword, passInfo);
	};
})
.service('HomePageService', function($http, URLConfig){
	this.getHomePageInfo = function(){
		return $http.get(URLConfig.homePage.getHomePageInfo);
	}
	
});


