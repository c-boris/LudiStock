import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { stateAtom } from "../../utils/stateAtom";
import API_URL from "../../utils/environment";

const FetchState = () => {
  const [, setStateAtom] = useAtom(stateAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/states`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("responseData in FetchSate", responseData);

          // Clear existing values before updating
          setStateAtom(() => responseData); // Update the atom with new data
          toast.success("Table State read successfully!");
        } else {
          toast.error("Error reading State");
        }
      } catch (error) {
        toast.error("An error occurred during State reading");
      }
    }

    // Clear the atom when the component mounts (optional)
    setStateAtom(() => []);

    fetchData();
  }, [setStateAtom]);

  return null;
};

export default FetchState;
