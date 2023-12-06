import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { ageAtom } from "../../utils/ageAtom";

const FetchAge = () => {
  const [data, setData] = useState(null);
  const [ageAtomValue, setAgeAtom] = useAtom(ageAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/ages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          setAgeAtom([
            {
              id: responseData.id,
              label: responseData.label,
            },
          ]);
          console.log("responseData in fetchAge", responseData);
          console.log("ageAtom in fetch", ageAtomValue);
          toast.success("Table Age read successfully!");
          return responseData;
        } else {
          toast.error("Error reading Age");
        }
      } catch (error) {
        toast.error("An error occurred during Age reading");
      }
    }
    fetchData();
  }, [setAgeAtom]);
  console.log("ageAtom outside fetch", ageAtomValue);

  return { ageAtom: ageAtomValue };
};

export default FetchAge;
