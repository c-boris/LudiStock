import React, { useState } from "react";
import { useAtom } from "jotai";
import { NavLink, useLocation } from "react-router-dom";
import API_URL from "../../utils/environment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SellerModal from "../Modal/SellerModal";
import { userAtom } from "../../utils/atom";

function ShowListing() {
  const location = useLocation();
  const item = location.state.item;
  const deleteList = location.state.delete;
  const navigate = useNavigate();
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [error, setError] = useState(null);
  const [user] = useAtom(userAtom);

  const openSellerModal = () => {
    setShowSellerModal(true);
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/listings/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/my-listings");
        toast.success("Toy deleted with success");
      } else {
        toast.error("Error deleting toy");
        setError("Invalid credentials");
        console.log(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during toy delete");
      console.log(error.message);
    }
  };
  console.log("User:", user);
  return (
    <>
      {item && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32">
          <div className="mx-auto grid max-w-full gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-full">
              <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl">
                View toy
              </h2>
              <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
                Details of {item.id}
              </p>
            </div>
            <div className="max-w-full mx-auto">
              <div className="shadow-md rounded-lg max-w-full dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="rounded-t-lg p-8"
                    src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp"
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5 flex flex-col items-center justify-between">
                  <div>
                    <h2 className="text-gray-900 font-semibold text-2xl tracking-tight dark:text-white">
                      {item.title}
                    </h2>
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                      {item.description}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.user} €<p>Add other categories</p>
                    </span>
                  </div>
                  {deleteList ? (
                    <form onSubmit={handleDelete}>
                      <button
                        type="submit"
                        className="grid place-items-center w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Confirm deletion
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center mt-4">
                      {user.isLoggedIn ? (
                        <>
                          <button
                            onClick={openSellerModal}
                            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-indigo-500 first-line:font-medium rounded-lg text-white text-sm"
                          >
                            Contact the seller
                          </button>
                          {showSellerModal && (
                            <SellerModal
                              setShowSellerModal={setShowSellerModal}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <NavLink
                            to="/signup"
                            className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-indigo-500 font-medium rounded-lg text-white py-2 text-sm"
                          >
                            Login or create an account to contact seller
                          </NavLink>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowListing;
