import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { BrowserRouter } from 'react-router-dom';
import {createTheme, MantineProvider} from '@mantine/core';

import { Provider } from 'react-redux';
import store from './Store';
import { BackendBaseUrl } from './Arch/Urls';
import axios from 'axios';
import { Keys } from './Arch/keys';
import { verifyAsync } from './state/UserState';
import { setSelectedPage } from './state/DashboardState';
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    /** Put your mantine theme override here */
});


store.dispatch(verifyAsync())
store.dispatch(setSelectedPage(1))


root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <MantineProvider theme={theme} defaultColorScheme="dark" >
                  <Notifications position="top-right"/>
                  <App />
              </MantineProvider>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);


