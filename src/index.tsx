import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';
import App from './App';

const appContainer = document.getElementById('app');
function renderApp() {
  if (appContainer) {
    appContainer.innerHTML = '';
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>,
      appContainer,
    );
  }
}

renderApp();

if (module.hot) {
  module.hot.accept();
}
