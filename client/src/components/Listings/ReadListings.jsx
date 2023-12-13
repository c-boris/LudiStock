import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { listingsAtom } from "../../utils/listingsAtom";
import fetchAPI from "../FetchAPI/fetchAPI";
import { categoryAtom } from "../../utils/categoryAtom";
import { ageAtom } from "../../utils/ageAtom";
import { stateAtom } from "../../utils/stateAtom";

function ReadListings() {
  const [dataListings, setDataListings] = useAtom(listingsAtom);
  const [data, setData] = useState(dataListings);
  useEffect(() => {
    setDataListings(fetchAPI("listings"));
  }, []);
  useEffect(() => {
    setData(dataListings);
  }, [dataListings]);

  const [priceFilter, setPriceFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [categoryAtomValue] = useAtom(categoryAtom);
  const [categoriesSelected, setCategoriesSelected] = useState(
    categoryAtomValue.map((category) => {
      return { ...category, selected: false };
    })
  );
  const [ageAtomValue] = useAtom(ageAtom);
  const [agesSelected, setAgesSelected] = useState(
    ageAtomValue.map((age) => {
      return { ...age, selected: false };
    })
  );
  const [stateAtomValue] = useAtom(stateAtom);
  const [statesSelected, setStatesSelected] = useState(
    stateAtomValue.map((state) => {
      return { ...state, selected: false };
    })
  );

  function FilterData() {
    const filteredCategory = categoriesSelected
      .filter((category) => category.selected)
      .map((category) => category.label);
    const filteredAge = agesSelected
      .filter((age) => age.selected)
      .map((age) => age.label);
    const filteredState = statesSelected
      .filter((state) => state.selected)
      .map((state) => state.label);

    setData(
      dataListings.filter(
        (item) =>
          (priceFilter ? item.price <= priceFilter : true) &&
          (nameFilter ? item.title.includes(nameFilter) : true) &&
          (filteredCategory.length
            ? filteredCategory.find(
                (category) => category === item.category.label
              )
            : true) &&
          (filteredAge.length
            ? filteredAge.find((age) => age === item.age.label)
            : true) &&
          (filteredState.length
            ? filteredState.find((state) => state === item.state.label)
            : true)
      )
    );
  }
  //filteredCategory.find((category) => category === item.category.label) || filteredCategory.includes(item.category.label)
  function ReloadData() {
    setData(dataListings);
    setNameFilter(null);
    setPriceFilter(null);
    setCategoriesSelected(
      categoryAtomValue.map((category) => {
        return { ...category, selected: false };
      })
    );
    setAgesSelected(
      ageAtomValue.map((age) => {
        return { ...age, selected: false };
      })
    );
    setStatesSelected(
      stateAtomValue.map((state) => {
        return { ...state, selected: false };
      })
    );
  }

  return (
    <>
      <form className="px-8 pt-20 bg-light dark:bg-dark">
        <div className="mb-3 mt-6 flex flex-col sm:flex-row items-center gap-x-12">
          <label
            htmlFor="price"
            className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
          >
            Price filter max :
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="price-filter"
              value={priceFilter || ""}
              onChange={(e) => setPriceFilter(parseInt(e.target.value, 10))}
              required
              className="mx-11 block w-2/3 rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
            />
          </div>
          <label
            htmlFor="name"
            className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
          >
            Name filter on title :
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name-filter"
              value={nameFilter || ""}
              onChange={(e) => setNameFilter(e.target.value)}
              required
              className="mx-1 block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center text-secondary dark:text-dsecondary">
          {categoriesSelected.map((category, index) => (
            <div
              onClick={() => {
                setCategoriesSelected(
                  categoriesSelected.map((currentCategory) => {
                    if (currentCategory.value === category.value) {
                      return {
                        ...currentCategory,
                        selected: !category.selected,
                      };
                    }
                    return currentCategory;
                  })
                );
              }}
              key={index}
              style={
                category.selected
                  ? {
                      border: "solid 3px grey",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      margin: "5px",
                      cursor: "pointer",
                    }
                  : {
                      border: "solid 1px grey",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      margin: "5px",
                      cursor: "pointer",
                    }
              }
            >
              {category.selected ? `✅ ${category.label}` : category.label}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center text-secondary dark:text-dsecondary">
          {agesSelected.map((age, index) => (
            <div
              onClick={() => {
                setAgesSelected(
                  agesSelected.map((currentAge) => {
                    if (currentAge.value === age.value) {
                      return {
                        ...currentAge,
                        selected: !age.selected,
                      };
                    }
                    return currentAge;
                  })
                );
              }}
              key={index}
              style={
                age.selected
                  ? {
                      border: "solid 3px grey",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      margin: "5px",
                      cursor: "pointer",
                    }
                  : {
                      border: "solid 1px grey",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      margin: "5px",
                      cursor: "pointer",
                    }
              }
            >
              {age.selected ? `✅ ${age.label}` : age.label}
            </div>
          ))}
        </div>
        <div className="mb-2 flex flex-wrap items-center text-secondary dark:text-dsecondary">
          {statesSelected.map((state, index) => (
            <div
              onClick={() => {
                setStatesSelected(
                  statesSelected.map((currentState) => {
                    if (currentState.value === state.value) {
                      return {
                        ...currentState,
                        selected: !state.selected,
                      };
                    }
                    return currentState;
                  })
                );
              }}
              key={index}
              style={
                state.selected
                  ? {
                      border: "solid 3px grey",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      margin: "5px",
                      cursor: "pointer",
                    }
                  : {
                      border: "solid 1px grey",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      margin: "5px",
                      cursor: "pointer",
                    }
              }
            >
              {state.selected ? `✅ ${state.label}` : state.label}
            </div>
          ))}
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={FilterData}
            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-blue-700 font-medium rounded-lg text-white text-sm grid place-items-center"
          >
            Filter
            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
          <button
            type="button"
            onClick={ReloadData}
            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-green-700 font-medium rounded-lg text-white text-sm grid place-items-center"
          >
            Reload data
            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
        </div>
      </form>
      {!data.length ? (
        <div className="text-2xl px-8 text-primary dark:text-dprimary bg-light dark:bg-dark py-24 sm:py-32">
          <h1>Nothing found</h1>
        </div>
      ) : null}
      {data && (
        <div className="bg-light dark:bg-dark pt-8 sm:py-1">
          <div className="max-w-2xl">
            <h2 className=" font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl mx-8 pt-8">
              List of toys
            </h2>
            <p className="mx-8 text-lg leading-8 text-secondary dark:text-dsecondary">
              All you are looking for is here below.
            </p>
          </div>
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
            <ul
              role="list"
              className="grid gap-x-4 gap-y-2 sm:grid-cols-2 sm:gap-y-4 xl:col-span-2"
            >
              {data.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/listings/${item.id}`}
                    state={{ item: item, delete: false }}
                    className="w-full"
                  >
                    <div className="flex flex-col justify-center">
                      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
                        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                          <div className="overflow-x-hidden rounded-2xl relative">
                            <img
                              className="rounded-t-lg p-8r"
                              src={item.header_image}
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
                                {item.title}
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                €{item.price}
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                {item.description}
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                category: {item.category.label}
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                age: {item.age.label}
                              </p>
                              <p className="text-md text-gray-800 mt-0">
                                state: {item.state.label}
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
