import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

// Wrap ReactDOM.render call
const render = AppComponent => {
    ReactDOM.render(
        <AppContainer>
            <AppComponent />
        </AppContainer>,
        document.getElementById('root')
    );
};

// Mount component
render(App);

if (module.hot) {
    // Enable HMR updates
    module.hot.accept('./components/App', () => render(App));
}
