import { useLocation } from "react-router-dom";

function ShowListing() {
  const location = useLocation();
  const item = location.state.item;

  return (
    <>
      {item && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32 h-screen">
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
                    <a href="#">
                      <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                        {item.description}
                      </h3>
                    </a>
                  </div>
                  <div className="flex flex-col items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.price} €
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <button className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-blue-700 font-medium rounded-lg text-white text-sm">
                      Add to cart
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                    <button className="group relative h-10 mr-2 px-2.5 py-0.5 overflow-hidden bg-green-700 font-medium rounded-lg text-white text-sm">
                      Contact the seller
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </button>
                  </div>
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
