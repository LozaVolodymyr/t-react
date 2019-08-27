export default `
// Adding Event Handlers
  const eventhandler = {
  };

// Creating Identity
  const identity = pphwebsdk.Identity.create('@access_token')
				.environment('fake')
				.refreshUrl('@refresh_url');


// Creating Payment Configuration
  const payment_config = pphwebsdk.PaymentConfiguration.create();

// Subscribing Events
  payment_config.subscribeEvents(eventhandler);


// Create Order
  var order = pphwebsdk.Order.create();
  order.item("Test Item").price('@amount').quantity(1);
  order.tip('@tip');

//Making Payments
  var payment = pphwebsdk.Payment
          .create(identity, payment_config)
          .for(order)
          .sale();
`;


