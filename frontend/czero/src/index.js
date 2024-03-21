// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductDetailsPage from './ProductDetailsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Product/:id',
    element: <ProductDetailsPage />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
