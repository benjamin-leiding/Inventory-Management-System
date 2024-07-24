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
    colors:{
        sand: [
            "#fcf6e6",
            "#f2eada",
            "#e0d2b9",
            "#cdba95",
            "#bea576",
            "#b59762",
            "#b09157",
            "#9b7d46",
            "#8b6f3c",
            "#785f2e"
        ],
        rot: [
            "#fbefee",
            "#f1dcda",
            "#e5b5b1",
            "#dd8c84",
            "#d4695e",
            "#cf5346",
            "#ce483a",
            "#b73a2c",
            "#a33227",
            "#8f281f"
        ],
        emerald: [
            "#e4fff5",
            "#d3f9eb",
            "#a8f0d8",
            "#7ce8c2",
            "#57e1af",
            "#3edda4",
            "#2eda9e",
            "#1cc189",
            "#07ac79",
            "#009666"
        ],
        orange: [
            "#ffeee6",
            "#feddd2",
            "#f6baa5",
            "#ef9375",
            "#e9744c",
            "#e65f31",
            "#e55423",
            "#cc4417",
            "#b63b11",
            "#9f3009"
        ]
    }
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


