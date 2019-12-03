export default {
payments:
`/* Creating Payment Configuration */
const paymentConfig = pphwebsdk
.PaymentConfiguration.create();
paymentConfig.reader();
console.log('paymentConfig', paymentConfig);
{{#if checkboxes.quickChip.state}}
/* Configure for Quick Chip */ 
paymentConfig.useQuickChip();
{{/if}}

{{#if checkboxes.skipReceipt.state}}
/* Configure for skip receipt */ 
paymentConfig.skipReceipt();
{{/if}}

{{#if checkboxes.showPromptInReader.state}}
/* Configure for showing prompts in reader */
paymentConfig.showPromptInReader();
{{/if}}

{{#if checkboxes.showPromptInApp.state}}
/* Configure for showing prompts in App */ 
paymentConfig.showPromptInApp();
{{/if}}

{{#if checkboxes.fakeapi.state}}
/* Configure for Mock API Responses */ 
paymentConfig.useFakeAPIServer();
{{/if}}
            
/* Create Order */
const order = pphwebsdk.Order.create();
order
.item('test-item')
.price({{orderOptions.amount.value}})
.quantity(1);

order.tip({{orderOptions.tip.value}});

/* Making Payments */
pphwebsdk.Payment
.create(identity, paymentConfig)
.for(order)
.as(pphwebsdk.Types.PaymentMethod.{{active.text}})
.sale();`,
identity: 
`const identity = pphwebsdk.Identity
.environment({{{environment.value}}})
.create({{{accessToken.value}}})           
.refreshUrl({{{refreshUrl.value}}});`,
setup:
`/* Returns a Promise of whether 
the setup is complete or not */
console.log('START==>')
pphwebsdk.Setup
  .isSetupComplete()
  .then(function() {
    console.log('setup complete'); 
  })
  .catch(function(err) {
    console.log(err);
  })
  
/* Starts the UI Flow to download, setup and 
*test the Web Interface  */
pphwebsdk.Setup.startUIFlow(function(err) {
   console.log('done with setup');
});
 `,
events:
`/* Configure for Mock API Responses */ 
paymentConfig.subscribeOnEvent
{{#if onPaymentSuccess.state}}
.onPaymentSuccess(function(txnRecord) {
    console.log('txnRecord', txnRecord);
})
{{/if}}
{{#if onPaymentFailure.state}}
.onPaymentFailure(function(err) {
    console.log('error', err);
})
{{/if}}
{{#if onMerchantInitializeSuccess.state}}
.onMerchantInitializeSuccess(function(merchant) {
    console.log('Logged in as', merchant);
})
{{/if}}
{{#if onMerchantInitializeFailure.state}}
.onMerchantInitializeFailure(function(err) {
    console.log('error', err);
})
{{/if}}
{{#if onConnectReaderSuccess.state}}
.onConnectReaderSuccess(function(details) {
    console.log('reader connected successfully', details)
})
{{/if}}
{{#if onConnectReaderFailure.state}}
.onConnectReaderFailure(function(err) {
    console.log('Could not connect to device: ' + err);
})
{{/if}}
{{#if NoDevicesFound.state}}
.NoDevicesFound(function() {
    console.log('No devices to connect');
})
{{/if}}`
}





  