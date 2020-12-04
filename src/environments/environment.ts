// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://ec2-100-26-179-244.compute-1.amazonaws.com:5000/graphiql',
  firebase: {
    apiKey: 'AIzaSyDosGLagxaFgF54t8NBGCVwiGzJpZanCQw',
    authDomain: 'unraccon.firebaseapp.com',
    databaseURL: 'https://unraccon.firebaseio.com',
    projectId: 'unraccon',
    storageBucket: 'unraccon.appspot.com',
    messagingSenderId: '1014466017802',
    appId: '1:1014466017802:web:c1ba54664f6dea96c83df3',
    measurementId: 'G-8QX09PE4XN'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
