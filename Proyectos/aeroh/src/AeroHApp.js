import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'


import {store} from './store/store';
import {AppRouter} from './routers/AppRouter';

const AeroHApp = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
  )
}

export {
  AeroHApp as default
};
