
const FIREBASE_DOMAIN = 'https://us-central1-chillnfix-dev';

export const environment = {
    production: true,
    firebase: {
        apiKey: 'AIzaSyDmuamS5Fe_WcLnl8-EgA731dPR7tOdIEg',
        authDomain: 'chillnfix-dev.firebaseapp.com',
        databaseURL: 'https://chillnfix-dev.firebaseio.com',
        projectId: 'chillnfix-dev',
    },
    firebaseDomain: FIREBASE_DOMAIN,
    cloudFunctionsDomain: `${FIREBASE_DOMAIN}/cloudfunctions.net`
};
