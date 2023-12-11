import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";

const sellerModal = ({ setShowSellerModal, seller_email }) => {
  const modalRef = useRef();

  const closeOnOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowSellerModal(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      closeOnOutsideClick(event);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowSellerModal]);
  console.log("seller email:", seller_email);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 focus:outline-none">
      <div className="flex justify-center items-end text-center min-h-screen sm:block">
        <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          ​
        </span>
        <div
          ref={modalRef}
          className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
        >
          <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24 bg-indigo-500 ">
            <div className="grid grid-cols-1">
              <div className="mt-4 mr-auto mb-4 ml-auto max-w-lg">
                <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                  <img
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                    className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                    alt="User Avatar"
                  />
                  <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                    Seller Contact
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    {seller_email}
                  </p>
                  <div className="w-full mt-6">
                    <button
                      onClick={() => setShowSellerModal(false)}
                      className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sellerModal;
