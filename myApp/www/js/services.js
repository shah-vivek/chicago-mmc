
angular.module('mmc.services', [])

.service('Cart',function () {

	this.cart = [];

	this.add = function( product ) {

		var product_model = {
			id: product.id,
			price: product.price,
			title: product.title,
			qty: 1
		};
		this.cart.push( product_model );
	};

	this.get = function() {
		return this.cart;
	};

	this.remove = function(id) {
		var index ;
		for( var i=0 ; i < this.cart.length ; i++ ) {
			if( this.cart[i].id == id ) {
				index = i;
				break;
			}
		}
		this.cart.splice(index,1);
	};

	this.addQty = function( id , qty ) {
		for( var i=0 ; i < this.cart.length ; i++ ) {
			if( this.cart[i].id == id ) {

				this.cart[i].qty = this.cart[i].qty + qty;
				if( this.cart[i].qty == 0 ) {
					this.remove( id );
				}
				break;
			}
		}
	};

	this.getTotalPrice = function() {

		var totalPrice = 0;
		for( var i = 0 ; i < this.cart.length ; i++ ) {
			totalPrice = totalPrice + ( this.cart[i].qty * this.cart[i].price );
		}
		return totalPrice;
	};

	this.find = function( id ) {
		for( var i=0 ; i < this.cart.length ; i++ ) {
			if( this.cart[i].id == id ) {
				return true;
			}
		}
		return false;
	};
	
})

.service('Product', function() {

	this.get = function() {
		return [
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
});
