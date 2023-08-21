import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home/Home";
import CheckoutPage from "../components/checkout/ChecoutPage";
import Layout from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
