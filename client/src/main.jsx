import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import LostPassword from "./pages/LostPassword";
import PasswordEdit from "./pages/PasswordEdit";
import MyListings from "./pages/MyListings";
import Listings from "./pages/Listings";
import ErrorPage from "./pages/Error/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewListing from "./components/Listings/NewListing.jsx";
import UpdateListing from "./components/Listings/UpdateListing.jsx";
import ShowListing from "./components/Listings/ShowListing.jsx";
import TranslationProvider from "./utils/TranslationProvider";
import ProtectedRoute from "./utils/ProtectedRoute";
import TermsConditions from "./pages/TermsAndConditions/TermsAndConditions.jsx";
import "./index.css";

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
        element: <Listings />,
      },
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
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/password/edit",
        element: <PasswordEdit />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "listings/:id",
        element: <ShowListing />,
      },
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
        element: (
          <ProtectedRoute>
            <NewListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: <TermsConditions />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TranslationProvider>
      <ToastContainer position="bottom-center" theme="dark" />
      <RouterProvider router={router} />
    </TranslationProvider>
  </React.StrictMode>
);
