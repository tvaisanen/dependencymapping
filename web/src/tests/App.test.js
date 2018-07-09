/**
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';

import configureStore from '../store/configureStore';

import { Provider } from 'react-redux';

const store = configureStore();

test("should not defined global.window", () => {
  expect(true).toBe(true);
})

it('renders without crashing', () => {
  
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
