import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
import "react-responsive-carousel/lib/styles/carousel.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
