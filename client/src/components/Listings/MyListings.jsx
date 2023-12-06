import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import { Link } from "react-router-dom";
import API_URL from "../../utils/environment";

function MyListings() {
  const [user] = useAtom(userAtom);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

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
          setFilteredData(
            responseData.filter((item) => item.user_id == user.id)
          );
        } else {
          setError("Identifiants invalides");
          console.log(error.message);
        }
      } catch (error) {
        setError("Une erreur s'est produite");
        console.log(error.message);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      {error && <p>{error}</p>}
      {filteredData && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32 h-screen">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl">
                MY toys
              </h2>
              <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
                All toys belonging to user:{user.id}
              </p>
              <Link to={`newListing`} className="font-semibold text-accent">
                Create new toy
              </Link>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {filteredData.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center gap-x-6">
                    <h2 className="text-base font-semibold leading-7 tracking-tight text-primary dark:text-dprimary">
                      {item.title}
                    </h2>
                    <h2 className="text-sm font-semibold leading-6 text-secondary dark:text-dsecondary">
                      <p>Price: {item.price}</p>
                      <p>Description: {item.description}</p>
                      <p>Age_id : {item.age_id}</p>
                      <p>State_id : {item.state_id}</p>
                      <p>Category_id : {item.category_id}</p>
                      <p>User #:{item.user_id}</p>
                    </h2>
                    <div className="flex-col">
                      <Link
                        to={`/listings/${item.id}`}
                        state={{ item: item }}
                        className="font-semibold text-accent"
                      >
                        Details
                      </Link>
                      <br></br>
                      <Link
                        to={`/listings/update/${item.id}`}
                        state={{ item: item }}
                        className="font-semibold text-accent"
                      >
                        Modify
                      </Link>
                      <br></br>
                      <Link
                        to={`/listings/delete/${item.id}`}
                        state={{ item: item }}
                        className="font-semibold text-accent"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default MyListings;
