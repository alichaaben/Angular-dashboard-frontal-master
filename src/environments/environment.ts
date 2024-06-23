/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // serverHost: 'https://rmint.dev.aax2.net/referral-service',
  // serverHost: 'https://rmint-referral.dev.aax2.net/referral-service',
  serverHost: 'http://localhost:1337',
  // serverHost: 'https://referral-rakuten.herokuapp.com',
  serverPort: '',
  googleApi: {
    apiKey: 'AIzaSyANOxq8_09RpJXgmm49g1Tj0u2eAMkhu_c',
    clientId: '908956920677-p1t31rlcjq8vmfppk2u1q89kmj5vkcq9.apps.googleusercontent.com'
  }
};
