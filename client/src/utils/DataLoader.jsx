import fetchAPI from "../components/FetchAPI/fetchAPI";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { categoryAtom } from "../utils/categoryAtom";
import { stateAtom } from "../utils/stateAtom";
import { ageAtom } from "../utils/ageAtom";

export default function DataLoader() {
  const [, setCategories] = useAtom(categoryAtom);
  const [, setAge] = useAtom(ageAtom);
  const [, setState] = useAtom(stateAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchAPI("categories");
        const agesData = await fetchAPI("ages");
        const statesData = await fetchAPI("states");

        setCategories(categoriesData);
        setAge(agesData);
        setState(statesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setCategories, setAge, setState]);

  return null;
}
