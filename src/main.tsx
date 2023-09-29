import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/error-page';
import Layout from '@/layout';
import './index.css';

const Root = React.lazy(() => import('@/pages/Root'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Goods = React.lazy(() => import('./pages/Goods'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Root />, index: true },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
      {
        path: 'goods',
        element: <Goods />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
