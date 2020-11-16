// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  apiURL: "http://localhost:3030/",

  firebaseConfig : {
    apiKey: "AIzaSyAwhwLzRksa18UiEoeL1uaLGOdSlnaxDA8",
    authDomain: "projecto-tipp.firebaseapp.com",
    databaseURL: "https://projecto-tipp.firebaseio.com",
    projectId: "projecto-tipp",
    storageBucket: "projecto-tipp.appspot.com",
    messagingSenderId: "689892886644",
    appId: "1:689892886644:web:5f0ab9492c729d827de921",
    measurementId: "G-42TX61F5D9"
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
