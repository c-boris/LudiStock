import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../utils/allUserAtom";

function ShowProperty() {
  const location = useLocation();
  const item = location.state.item;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await fetchAllUsers();
        // Recherche de l'utilisateur correspondant à l'`user_id` de la propriété
        const user = users.find((user) => user.id === item.user_id);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    if (item) {
      fetchData();
    }
  }, [item]);
  return (
    <>
      {item && userData && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32 h-screen">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl">
                View property
              </h2>
              <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
                Details on a given property
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              <li key={item.id}>
                <div className="flex items-center gap-x-6">
                  <h2 className="text-base font-semibold leading-7 tracking-tight text-primary dark:text-dprimary">
                    {item.title}
                  </h2>
                  <h2 className="text-sm font-semibold leading-6 text-accent">
                    <p>Price: {item.price}</p>
                    <p>{item.description}</p>
                    <p>Contact :{userData.email}</p>{" "}
                  </h2>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowProperty;
