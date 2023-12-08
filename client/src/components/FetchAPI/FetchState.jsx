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
          setStateAtom(() => responseData);
        } else {
          toast.error("Error reading State");
        }
      } catch (error) {
        toast.error("An error occurred during State reading");
      }
    }

    setStateAtom(() => []);

    fetchData();
  }, [setStateAtom]);

  return null;
};

export default FetchState;
