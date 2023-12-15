import { createContext, useEffect, useState } from "react";
import * as i18n from "./i18n";
import { useTranslation } from "react-i18next";
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
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewListing from "./components/Listings/NewListing.jsx";
import UpdateListing from "./components/Listings/UpdateListing.jsx";
import ShowListing from "./components/Listings/ShowListing.jsx";
import ProtectedRoute from "./utils/ProtectedRoute";
import TermsConditions from "./pages/TermsAndConditions/TermsAndConditions.jsx";
export const LanguageContext = createContext(null);

const App = () => {
  const [lng, setLng] = useState("fr");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  const toggleLng = () => {
    setLng((lng) => (lng === "en" ? "fr" : "en"));
  };
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
          element: <Admin />,
        },
        {
          path: "my-listings",
          element: <MyListings />,
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
        {
          path: "/terms-and-conditions",
          element: <TermsConditions />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);
  return (
    <LanguageContext.Provider value={{ lng, toggleLng, t, i18n }}>
      <ToastContainer position="bottom-center" theme="dark" />
      <RouterProvider router={router} />
    </LanguageContext.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
