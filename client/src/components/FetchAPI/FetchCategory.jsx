import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { categoryAtom } from "../../utils/categoryAtom";
import API_URL from "../../utils/environment";

const FetchCategory = () => {
  const [, setCategoryAtom] = useAtom(categoryAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setCategoryAtom(() => responseData);
        } else {
          toast.error("Error reading Category");
        }
      } catch (error) {
        toast.error("An error occurred during Category reading");
      }
    }

    setCategoryAtom(() => []);

    fetchData();
  }, [setCategoryAtom]);

  return null;
};

export default FetchCategory;
