import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import Marketplace from "./pages/Marketplace";
// import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LostPassword from "./pages/LostPassword";
import ErrorPage from "./pages/Error/";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReadProperties from "./components/Properties/properties.jsx";
import ShowProperty from "./components/Properties/showproperty.jsx";
import MyProperties from "./components/Properties/MyProperties.jsx";
import NewProperty from "./components/Properties/NewProperty.jsx";
import UpdateProperty from "./components/Properties/UpdateProperty.jsx";
import DeleteProperty from "./components/Properties/DeleteProperty.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "listings",
        element: <ReadProperties />,
      },
      // {
      //   path: "marketplace",
      //   element: <Marketplace />,
      // },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "lost-password",
        element: <LostPassword />,
      },
      {
        path: "my-listings",
        element: <MyProperties />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      { path: "Properties/:id", element: <ShowProperty /> },
      {
        path: "/properties/update/:id",
        element: <UpdateProperty />,
      },
      {
        path: "/properties/delete/:id",
        element: <DeleteProperty />,
      },
      {
        path: "my-listings/newProperty",
        element: <NewProperty />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer position="bottom-center" theme="dark" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
