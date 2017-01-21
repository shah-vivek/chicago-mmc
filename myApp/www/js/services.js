
angular.module('mmc.services', [])

.service('Login',function ( $http) {

	this.enter = function( user ) {

		//return $http.post("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/login/",user);
		return $http.get("data/user.json");
	};
	
})
.service('SignUp',function ( $http) {

	this.enter = function( user ) {

		return $http.post("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/members/signup",user);
	};
	
})
.service('Events', function( $http ){
	
	this.get = function( id ) {
		
		if( id ) {
			
			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/events/get?eventId="+id);


		} else {

			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/events/list");
		}
	};

	this.selectedEvent = null;
})
.service('Albums', function( $http ){
	
	this.get = function( id ) {
		
		if( id ) {
			
			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/archive/album/"+id);


		} else {

			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/album");
		}
	};

	this.selectedAlbum = null;
})
.service('Message', function( $http ){

	this.send = function( message ) {

		return $http.post("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/message/send", message);
	};
});
