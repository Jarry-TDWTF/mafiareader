import React from 'react'
import { render  } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import storeCreator from "./storeCreator";
import * as css from './stylesheet.css';
import * as favicon from './img/favicon.jpg';

// Create Redux store with initial state
const store = storeCreator();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
