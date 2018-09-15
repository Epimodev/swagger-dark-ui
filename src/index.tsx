import * as MainLoader from './Main/Loader';

let mainLoaded = false;

MainLoader.initBackground();
setTimeout(() => {
  if (!mainLoaded) {
    MainLoader.showLoader();
  }
}, 1200);

import('./Main').then(module => {
  mainLoaded = true;
  MainLoader.hideLoader();
  module.renderApp();
});
