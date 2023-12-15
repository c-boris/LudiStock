import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import { Link } from "react-router-dom";
import fetchAPI from "../FetchAPI/fetchAPI";
import { listingsAtom } from "../../utils/listingsAtom";

function MyListingsForm() {
  const [user] = useAtom(userAtom);
  const [filteredData, setFilteredData] = useState([]);
  const [dataListings, setDataListings] = useAtom(listingsAtom);
  useEffect(() => {
    setDataListings(fetchAPI("listings"));
  }, []);
  useEffect(() => {
    setFilteredData(dataListings?.filter((item) => item.user_id == user.id));
  }, [dataListings]);
  return (
    <>
      {!filteredData.length && (
        <h1 className="text-2xl px-8 text-primary dark:text-dprimary bg-light dark:bg-dark py-24 sm:py-32">
          No data found
        </h1>
      )}
      {filteredData && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl mx-8 m-8">
              My listings
            </h2>
            <p className="mx-8 text-lg leading-8 text-secondary dark:text-dsecondary">
              {/* All toys belonging to me (user:{user.id}) */}
            </p>
            <Link
              to={`newListing`}
              className="group relative w-2/3 h-10 mr-3 px-2.5 py-0.5 overflow-hidden bg-blue-700 font-medium rounded-lg text-white text-lg grid place-items-center mx-8 mb-7"
            >
              Create a new listing
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </Link>
          </div>
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {filteredData.map((item) => (
                <li key={item.id}>
                  <div className="max-w-full mx-auto">
                    <div className="shadow-md rounded-lg max-w-full dark:bg-gray-800 dark:border-gray-700">
                      <img
                        className="rounded-t-lg p-8"
                        src={item.header_image}
                        alt="product image"
                      />
                      <div className="px-5 pb-5 flex flex-col items-center justify-between">
                        <h2 className="text-gray-900 font-semibold text-2xl tracking-tight dark:text-white">
                          {item.title}
                        </h2>
                        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                          {item.description}
                        </h3>
                        <div className="flex flex-col items-center justify-center mb-4">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {item.price} €
                          </span>
                        </div>
                        <div className="flex items-center mt-4">
                          <Link
                            to={`/listings/${item.id}`}
                            state={{ item: item, delete: false }}
                            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-blue-700 font-medium rounded-lg text-white text-sm grid place-items-center"
                          >
                            Details
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                          </Link>

                          <Link
                            to={`/listings/update/${item.id}`}
                            state={{ item: item }}
                            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-green-700 font-medium rounded-lg text-white text-sm grid place-items-center"
                          >
                            Modify
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                          </Link>

                          <Link
                            to={`/listings/delete/${item.id}`}
                            state={{ item: item, delete: true }}
                            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-red-700 font-medium rounded-lg text-white text-sm grid place-items-center"
                          >
                            Delete
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                          </Link>
                        </div>
                      </div>
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

export default MyListingsForm;
