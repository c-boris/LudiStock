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
          setAgeAtom(() => responseData);
        } else {
          toast.error("Error reading Age");
        }
      } catch (error) {
        toast.error("An error occurred during Age reading");
      }
    }

    setAgeAtom(() => []);

    fetchData();
  }, [setAgeAtom]);

  return null;
};

export default FetchAge;
