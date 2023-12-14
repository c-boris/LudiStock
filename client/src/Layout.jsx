import Header from "./components/Header/";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import fetchAPI from "./components/FetchAPI/fetchAPI";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { categoryAtom } from "./utils/categoryAtom";
import { stateAtom } from "./utils/stateAtom";
import { ageAtom } from "./utils/ageAtom";
function Layout() {
  const [, setCategories] = useAtom(categoryAtom);
  const [, setAge] = useAtom(ageAtom);
  const [, setState] = useAtom(stateAtom);

  useEffect(() => {
    setCategories(fetchAPI("categories"));
    setAge(fetchAPI("ages"));
    setState(fetchAPI("states"));
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default Layout;
