import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import Register from "../Pages/login/Register";
import Login from "../Pages/Login";
import Productlist from "@/Pages/Productlist";
import AddProducts from "../Pages/AddProducts";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Dashboard from "@/Pages/Dashboard";
import Home from "@/Pages/Home";
import Cart from "@/Pages/Cart";
import NotFound from "@/Pages/NotFound";
import AppLayout from "@/layout/AppLayout";
import AuthLayout from "@/layout/AuthLayout";
import ProductDetail from "@/Pages/ProductDetail";


const AppRouter = () => {
  const router = createBrowserRouter([
    // {

    //   element: <Layout />,   // Navbar always shows
    //   children: [

    //     { path: "/login", element: <Login /> },   // Main page = Login

    //     { path: "/dashboard", element: <Dashboard /> },
    //     { path: "/register", element: <Register /> },
    //     { path: "/add-product", element: <AddProducts /> },
    //     { path: "/productlist", element: <Productlist /> },
    //     { path: "/about", element: <About /> },
    //     { path: "/contact", element: <Contact /> },
    //     { path:  "/", element:<Home/> },
    //   ],
    // },

    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/productlist", element: <Productlist /> },
        { path: "/product/:id", element: <ProductDetail /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/cart", element: <Cart /> }
      ]
    },

    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> }
      ]
    },

    // 404 Not Found - catch all routes
    {
      path: "*",
      element: <NotFound />
    }

  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
