import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import LightToggle from "../LightToggle/";
import DarkImage from "../../assets/img/Login-Icon.png";
import LightImage from "../../assets/img/Login-Icon.jpg";
import { useAtom } from "jotai";

import { userAtom } from "../../utils/atom";

const navigation = [
  { name: "Product", to: "/product" },
  { name: "Features", to: "/features" },
  { name: "Marketplace", to: "/marketplace" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const savedTheme = localStorage.getItem("themePreference");
  const [user] = useAtom(userAtom);

  return (
    <header className="bg-light dark:bg-dark fixed inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink
            to="/"
            className="-m-1.5 p-1.5 font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
          >
            <span className="sr-only">Your company</span>
            Your company
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <LightToggle />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-6">
          <LightToggle />
          {user.isLoggedIn ? (
            <div className="text-primary dark:text-dprimary">
              {user.email}
              {console.log("user.email", user.email)}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
            >
              {savedTheme === "dark" ? (
                <img
                  src={DarkImage}
                  alt="Dark Image"
                  style={{ width: "50px", height: "50px" }}
                />
              ) : (
                <img
                  src={LightImage}
                  alt="Light Image"
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </NavLink>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-light dark:bg-dark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="-m-1.5 p-1.5 font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">ImmoStock</span>
              Your company
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary hover:bg-dsecondary dark:text-dprimary  dark:hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <NavLink
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-dsecondary dark:text-dprimary  dark:hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
