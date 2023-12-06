import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LostPassword from "./pages/LostPassword";
import ErrorPage from "./pages/Error/";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReadListings from "./components/Listings/ReadListings.jsx";
import MyListings from "./components/Listings/MyListings.jsx";
import NewListing from "./components/Listings/NewListing.jsx";
import UpdateListing from "./components/Listings/UpdateListing.jsx";
import ShowListing from "./components/Listings/ShowListing.jsx";

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
        element: <ReadListings />,
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
        element: <MyListings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      { path: "listings/:id", element: <ShowListing /> },
      {
        path: "/listings/update/:id",
        element: <UpdateListing />,
      },
      {
        path: "/listings/delete/:id",
        element: <ShowListing />,
      },
      {
        path: "my-listings/newListing",
        element: <NewListing />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer position="bottom-center" theme="dark" />
    <RouterProvider router={router} />
  </>
);
