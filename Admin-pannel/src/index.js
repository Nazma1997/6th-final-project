import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store, persistor as persister} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading='null' persistor={persister}>
       <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
