import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import App from './App';

const appContainer = document.getElementById('app');
function renderApp() {
  if (appContainer) {
    appContainer.innerHTML = '';
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      appContainer,
    );
  }
}

renderApp();

if (module.hot) {
  module.hot.accept();
}
