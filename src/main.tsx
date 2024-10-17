import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './component/home/home';
import Product from './component/home/product';
import Store from './component/home/store';
import Admin from './component/admin/admin';
import Customers from './component/admin/tables/customer';
import Order from './component/admin/tables/orders';
import Payment from './component/admin/tables/payment';
import Review from './component/admin/tables/reviews';
import Supplier from './component/admin/tables/supplier';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <Product />
      },
      {
        path: "/stores",
        element: <Store />
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin/customers",
            element: <Customers />
          },
          {
            path: "/admin/orders",
            element: <Order />
          },
          {
            path: "/admin/products",
            element: <Product />
          },
          {
            path: "/admin/payments",
            element: <Payment />
          },
          {
            path: "/admin/reviews",
            element: <Review />
          },
          {
            path: "/admin/stores",
            element: <Store />
          },
          {
            path: "/admin/suppliers",
            element: <Supplier />
          }
        ]
      }
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
