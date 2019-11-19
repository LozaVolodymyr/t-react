export default {
    data: {
        sidebar: [
            {
                key: 'SB_initialSetup',
                text: 'Setup PPH',
                classes: new Set(['pp-sidebar-option', 'pp-link']),
                selected: false,
            },
            {
                key: 'SB_paymentSteps',
                text: 'Take a Payment',
                classes: new Set(['pp-sidebar-option', 'pp-link']),
                selected: false,
                listItems: [
                    {
                        key: 'SB_identityInfo',
                        text: 'Merchant Identity',
                        classes: new Set(['pp-sidebar-option', 'pp-link']),
                        selected: false,
                    },
                    {
                        key: 'SB_paymentOptions',
                        text: 'Payment Options',
                        classes: new Set(['pp-sidebar-option', 'pp-link']),
                        selected: false,
                    },
                    {
                        key: 'SB_eventHandlers',
                        text: 'Subscribe Events',
                        classes: new Set(['pp-sidebar-option', 'pp-link']),
                        selected: false,
                    },
                ]
            },
        ],
            identity: { 
                environment: { label: 'Select environment to run on', value: 'mock' },
                accessToken: { label: 'Access token to authorize payments with', value: '@access_token'},
                refreshUrl: { label: 'Refresh url to refresh access token on expiry', value: '@refresh_url' },
                clientId: { label: 'Client ID to authorize payments with', value: '@client_id' },
                clientSecret: { label: 'Client Secret to authorize payments with', value: '@client_secret' },
            },
            checkboxes:[
            {
                id: 'quickChip',
                text: 'Quick Chip',
                commentString: '// Configure for Quick Chip',
                api: (configObject) => `${configObject}.useQuickChip();`
            },
            {
                id: 'skipReceipt',
                text: 'Skip Receipt',
                commentString: '// Configure for Skip Receipt',
                api: (configObject) => `${configObject}.tag(\'skipReceipt\');`
            },
            {
                id: 'showPromptInReader',
                text: 'Show Prompt in Reader',
                commentString: '// Configure for showing prompts in reader',
                api: (configObject) => `${configObject}.showPromptInReader();`
            },
            {
                id: 'showPromptInApp',
                text: 'Show Prompt in App',
                commentString: '// Configure for showing prompts in App',
                api: (configObject) => `${configObject}.showPromptInApp();`
            },
            {
                id: 'fakeapi',
                text: 'Fake API Response',
                commentString: '// Configure for Fake API Responses',
                api: (configObject) => `${configObject}.useFakeAPIServer();`
            },
        ],
            selectionGroup: [
                {
                    label: 'Payment Success',
                    name: 'onPaymentSuccess',
                    id: 'eh_ps',
                    alertText: '\'success\'',
                    functionParam: 'txnRecord'
                },
                {
                    label: 'Payment Failure',
                    name: 'onPaymentFailure',
                    id: 'eh_pf',
                    functionParam: 'err',
                    alertText: '\'failed with\' + err',
                },
                {
                    label: 'Merchant Init Success',
                    name: 'onMerchantInitializeSuccess',
                    id: 'eh_mis',
                    functionParam: 'merchant',
                    alertText: '\'merchant logged in!\'',
                },
                {
                    label: 'Merchant Init Failure',
                    name: 'onMerchantInitializeFailure',
                    id: 'eh_mif',
                    functionParam: 'err',
                    alertText: '\'Merchant Init failed with\' + err',
                },
                {
                    label: 'Reader Connection Success',
                    name: 'onConnectReaderSuccess',
                    id: 'eh_crs',
                    functionParam: 'reader',
                    alertText: '\'Connected with\' + reader',
                },
                {
                    label: 'Reader Connection Failure',
                    name: 'onConnectReaderFailure',
                    id: 'eh_crf',
                    functionParam: 'err',
                    alertText: '\'reader connection failed with\' + err',
                },
                {
                    label: 'No Devices Found',
                    name: 'NoDevicesFound',
                    id: 'eh_ndf',
                    functionParam: '',
                    alertText: '\'No Devices Found\'',
                },
            ],
                orderOptions: [
                    {
                        key: 'amount', label: 'Choose item amount', value: '@amount',
                    },
                    {
                        key: 'tip', label: 'Choose tip for order', value: '@tip',
                    }
                ],
                    selections:
        [
            /*{
              id: 'vaultingOptions',
              label: 'Vault Options', placeholder: 'Enable vaulting', helperText: 'Choose which vault option to enable',
              options: [
                {
                  label: 'Vault Only', value: 'vaultOnly',
                }, {
                  label: 'Vault and Pay', value: 'vap',
                }
              ],
            },*/
            /*{
              id: 'simulatorOptions',
              label: 'Reader Simulator', placeholder: 'Pick mock reader', helperText: 'Choose which reader to mock',
              options: [
                {
                  label: 'Swipe', value: 'rs_swipe', checked: true,
                }, {
                  label: 'Chip', value: 'rs_chip', checked: true,
                }, {
                  label: 'Contact Less', value: 'rs_cl', checked: true,
                }
              ],
            },*/
            {
                id: 'paymentType',
                label: 'Payment Types', helperText: 'Choose the payment type',
                options: [
                    {
                        label: 'Card', value: 'pt_card', text: 'CARD',
                    }, {
                        label: 'Key In', value: 'pt_keyin', text: 'KEYIN',
                    }, {
                        label: 'Check', value: 'pt_check', text: 'CHECK',
                    }, {
                        label: 'Cash', value: 'pt_cash', text: 'CASH',
                    }
                ],
            },
        ]
    },
    generatedJS: 'empty'
}
