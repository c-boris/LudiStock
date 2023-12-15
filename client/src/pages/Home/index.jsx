import Hero from "../../components/Hero";
import ReadListings from "../../components/Listings/ReadListings";
import fetchAPI from "../../components/FetchAPI/fetchAPI";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { categoryAtom } from "../../utils/categoryAtom";
import { stateAtom } from "../../utils/stateAtom";
import { ageAtom } from "../../utils/ageAtom";

export default function Home() {
  const [, setCategories] = useAtom(categoryAtom);
  const [, setAge] = useAtom(ageAtom);
  const [, setState] = useAtom(stateAtom);

  useEffect(() => {
    setCategories(fetchAPI("categories"));
    setAge(fetchAPI("ages"));
    setState(fetchAPI("states"));
  }, []);

  return (
    <div id="home">
      <Hero />
      <ReadListings />
    </div>
  );
}
