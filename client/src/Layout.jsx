import Header from "./components/Header/";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import FetchAge from "./components/FetchAPI/FetchAge";
import FetchCategory from "./components/FetchAPI/FetchCategory";
import FetchListings from "./components/FetchAPI/FetchListings";
import FetchState from "./components/FetchAPI/FetchState";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
      <FetchAge />
      <FetchCategory />
      <FetchListings />
      <FetchState />
    </>
  );
}

export default Layout;
