import MainLoader from './Main/Loader';

const loader = new MainLoader();
let mainLoaded = false;

setTimeout(() => {
  if (!mainLoaded) {
    loader.showSpinner();
  }
}, 1200);

import('./Main').then(module => {
  mainLoaded = true;
  loader.remove();
  module.renderApp();
});
