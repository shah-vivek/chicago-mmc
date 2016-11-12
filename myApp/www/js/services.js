
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
});
