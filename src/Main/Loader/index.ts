import * as style from './style.scss';

function createSpinnerElement() {
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

class Loader {
  appElement = document.getElementById('app');
  containerElement = document.createElement('div');
  spinner: HTMLDivElement | null = null;
  BACKGROUND_ANIMATION_DURATION = 1000;
  SPINNER_ANIMATION_DURATION = 500;

  constructor() {
    this.containerElement.className = style.background;
    document.body.insertBefore(this.containerElement, this.appElement);

    setTimeout(() => {
      this.containerElement.className = `${style.background} ${style.background_enabled}`;
    }, 0);
  }

  showSpinner() {
    this.spinner = this.spinner ? this.spinner : createSpinnerElement();
    this.spinner.className = `${style.mainLoader} ${style.mainLoader_hidden}`;

    this.containerElement.appendChild(this.spinner);

    setTimeout(() => {
      this.spinner!.className = style.mainLoader;
    }, 0);
  }

  remove() {
    if (this.spinner) {
      this.spinner.className = `${style.mainLoader} ${style.mainLoader_hidden}`;
      setTimeout(() => {
        if (this.spinner && this.spinner.parentElement) {
          this.spinner.parentElement.removeChild(this.spinner);
        }
        if (this.containerElement.parentElement) {
          this.containerElement.parentElement.removeChild(this.containerElement);
        }
      }, this.SPINNER_ANIMATION_DURATION);
    }
  }
}

export default Loader;
