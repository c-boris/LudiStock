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
          console.log("responseData in FetchCategory", responseData);

          // Clear existing values before updating
          setCategoryAtom(() => responseData); // Update the atom with new data
          toast.success("Table Category read successfully!");
        } else {
          toast.error("Error reading Category");
        }
      } catch (error) {
        toast.error("An error occurred during Category reading");
      }
    }

    // Clear the atom when the component mounts (optional)
    setCategoryAtom(() => []);

    fetchData();
  }, [setCategoryAtom]);

  return null;
};

export default FetchCategory;
