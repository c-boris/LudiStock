import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { ageAtom } from "../../utils/ageAtom";
import API_URL from "../../utils/environment";

const FetchAge = () => {
  const [, setAgeAtom] = useAtom(ageAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/ages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("responseData in FetchAge", responseData);

          // Clear existing values before updating
          setAgeAtom(() => responseData); // Update the atom with new data
          toast.success("Table Age read successfully!");
        } else {
          toast.error("Error reading Age");
        }
      } catch (error) {
        toast.error("An error occurred during Age reading");
      }
    }

    // Clear the atom when the component mounts (optional)
    setAgeAtom(() => []);

    fetchData();
  }, [setAgeAtom]);

  return null;
};

export default FetchAge;
