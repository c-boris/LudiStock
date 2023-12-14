import React from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import LightToggle from "../LightToggle/";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/useAuth"; // Import the useAuth hook
import { userAtom } from "../../utils/atom";
import { useAtom } from "jotai";

const navigation = [
  { name: "Listings", to: "/listings" },
  // { name: 'Features', to: '/features' },
  // { name: 'Marketplace', to: '/marketplace' },
  // { name: 'Contact', to: '/contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const { logout } = useAuth(); // Destructure the logout function from useAuth
  const [user] = useAtom(userAtom);

  const handleLogout = () => {
    // Call the logout function from useAuth
    logout(navigate, toast);
  };

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
            <span className="sr-only">LudiStock</span>
            LudiStock
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
            <>
              <NavLink
                to="/my-listings"
                className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
              >
                My Listings
              </NavLink>
              <NavLink
                to="/profile"
                className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
              >
                Profile
              </NavLink>
              {user.isAdmin && (
                <>
                  <NavLink
                    to="/admin"
                    className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
                  >
                    Admin
                  </NavLink>
                </>
              )}
              <NavLink
                to="/"
                className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
                onClick={handleLogout}
              >
                Log out
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-semibold leading-6 text-primary dark:text-dprimary hover:text-secondary dark:hover:text-dsecondary"
            >
              Log in
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
              <span className="sr-only">LudiStock</span>
              LudiStock
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
                {user.isLoggedIn ? (
                  <>
                    <NavLink
                      to="/my-listings"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-dsecondary dark:text-dprimary dark:hover:bg-secondary"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      My Listings
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-dsecondary dark:text-dprimary dark:hover:bg-secondary"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-dsecondary dark:text-dprimary dark:hover:bg-secondary"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log out
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-dsecondary dark:text-dprimary dark:hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
