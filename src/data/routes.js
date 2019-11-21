export default {
    setup: {
        path: '/',
        title: 'Setup PPH',
        id: 'setupPPH',
        isDisabled: false
    },
    identity:
    {
        path: '/merchant-identity',
        title: 'Merchant Identity',
        id: 'merchantIdentity',
        isDisabled: true
    },
    payments:
    {
        path: '/take-payments',
        title: 'Take Payments',
        id: 'takePayments',
        isDisabled: true
    },
    events:
    {
        path: '/subsribe-events',
        component: 'Events',
        title: 'Subsribe Events',
        id: 'subsribeEvents',
        isDisabled: true
    },
    complete:
    {
        path: '/complete-payment',
        component: 'Complete',
        title: 'Complete Transaction',
        id: 'completeTransaction',
        isDisabled: true
    },
}