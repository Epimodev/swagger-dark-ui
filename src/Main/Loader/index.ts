import * as style from './style.scss';

const appElement = document.getElementById('app');
const loaderContainerElement = document.createElement('div');
const loaderElement = createLoader();

export function initBackground() {
  loaderContainerElement.className = style.background;
  loaderContainerElement.appendChild(loaderElement);
  document.body.insertBefore(loaderContainerElement, appElement);

  setTimeout(() => {
    loaderContainerElement.className = `${style.background} ${style.background_enabled}`;
  }, 0);
}

export function showLoader() {
  loaderElement.className = style.mainLoader;
}

export function hideLoader() {
  loaderElement.className = `${style.mainLoader} ${style.mainLoader_hidden}`;
}

export function removeBackground() {}

function createLoader() {
  const mainLoader = document.createElement('div');
  const loaderContainer = document.createElement('div');
  const loader = document.createElement('div');
  mainLoader.className = `${style.mainLoader} ${style.mainLoader_hidden}`;
  loaderContainer.className = style.loaderContainer;
  loader.className = style.loader;

  loaderContainer.appendChild(loader);
  mainLoader.appendChild(loaderContainer);

  return mainLoader;
}
