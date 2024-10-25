import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './component/home/home';
import Admin from './component/admin/admin';
import Customers from './component/admin/tables/customer';
import Order from './component/admin/tables/orders';
import Payment from './component/admin/tables/payment';
import Review from './component/admin/tables/reviews';
import Supplier from './component/admin/tables/supplier';
import Product from './component/admin/tables/products';

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
