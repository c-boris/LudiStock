import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FetchAge from "../FetchAge/FetchAge";
import MyFormComponent from "./MyFormComponent";

function ReadListings() {
  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await fetch(`http://localhost:3001/listings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      setData(responseData);
    } else {
      console.error("Une erreur s'est produite");
    }
  }
  if (data == null) fetchData();

  return (
    <>
      {data && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl">
                List of toys
              </h2>
              <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
                All you are looking for is here below.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-4 gap-y-2 sm:grid-cols-2 sm:gap-y-4 xl:col-span-2"
            >
              {data.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/listings/${item.id}`}
                    state={{ item: item }}
                    className="w-full"
                  >
                    <div className="flex flex-col justify-center">
                      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
                        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                          <div className="overflow-x-hidden rounded-2xl relative">
                            <img
                              className="h-40 rounded-2xl w-full object-cover"
                              src="https://m.media-amazon.com/images/I/81+QNejuvqL._AC_SY300_SX300_.jpg"
                              alt="Product"
                            />
                            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 group-hover:opacity-50 opacity-70"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="black"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </p>
                          </div>
                          <div className="mt-4 pl-2 mb-2 flex justify-between">
                            <div>
                              <p className="text-lg font-semibold text-gray-900 mb-0">
                                Product Name
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                ${item.price}
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 group-hover:opacity-70"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="gray"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ReadListings;
