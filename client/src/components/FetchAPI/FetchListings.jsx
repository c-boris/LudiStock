import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { listingsAtom } from "../../utils/listingsAtom";
import API_URL from "../../utils/environment";

const FetchListings = () => {
  const [, setListingsAtom] = useAtom(listingsAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/listings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setListingsAtom(() => responseData);
        } else {
          toast.error("Error reading Listings");
        }
      } catch (error) {
        toast.error("An error occurred during Listings reading");
      }
    }

    setListingsAtom(() => []);

    fetchData();
  }, [setListingsAtom]);

  return null;
};

export default FetchListings;
