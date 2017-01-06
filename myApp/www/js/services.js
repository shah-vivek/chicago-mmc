
angular.module('mmc.services', [])

.service('Login',function ( $http) {

	this.enter = function( user ) {

		return $http.post("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/login/",user).then(
				function(response){
					return response.data;
				},
				function(response){
					return response;
				}
			);
	};
	
})
.service('Events', function( $http ){
	
	this.get = function( id ) {
		
		if( id ) {
			
			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/events/get?eventId="+id).then(
					function(response){
						return response.data;
					},
					function(data){
						return data;
					}
				);


		} else {

			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/events/list").then(
					function(response){
						return response.data;
					},
					function(data){
						return data;
					}
				);
		}
	};

	this.selectedEvent = null;
})
.service('Albums', function( $http ){
	
	this.get = function( id ) {
		
		if( id ) {
			
			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/archive/album/"+id).then(
					function(response){
						return response.data;
					},
					function(data){
						return data;
					}
				);


		} else {

			return $http.get("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/album").then(
					function(response){
						return response.data;
					},
					function(data){
						return data;
					}
				);
		}
	};

	this.selectedAlbum = null;
})
.service('Message', function( $http ){

	this.send = function( message ) {

		return $http.post("http://custom-env.kmxz8htasr.us-west-2.elasticbeanstalk.com/message/send/").then(
					function(response){
						return response.data;
					},
					function(data){
						return data;
					}
				);
	};
});
