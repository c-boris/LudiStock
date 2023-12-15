import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import { NavLink } from "react-router-dom";

export default function Hero() {
  const [user] = useAtom(userAtom);

  return (
    <section id="hero" className="bg-light dark:bg-dark h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-65">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="flex items-center justify-center h-full">
              <div className="relative rounded-full px-9 py-4 text-2xl leading-9 text-secondary dark:text-dsecondary ring-1 ring-primary/10 hover:ring-primary/20 dark:ring-dprimary/10 dark:hover:ring-dprimary/20 text-center">
                {user.isLoggedIn ? (
                  user.username ? (
                    `Hi ${user.username}`
                  ) : (
                    `Hi ${user.email}`
                  )
                ) : (
                  <>
                    Hello, welcome to our marketplace, please login to get a
                    full access to our app!
                    <br />
                    <NavLink to="/signup" className="font-semibold text-accent">
                      Click to sign up!
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-6xl py-20">
              Sell your old toys easily with us!!!
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
              Rediscover Joy: Reimagined Toys for Every Playful Heart!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user.isLoggedIn ? (
                <>
                  <NavLink
                    to="/my-listings"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    My listings
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="text-sm font-semibold leading-6 text-primary dark:text-dprimary"
                  >
                    View my profil <span aria-hidden="true">→</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/listings"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    listings
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="text-sm font-semibold leading-6 text-primary dark:text-dprimary"
                  >
                    Create an account <span aria-hidden="true">→</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
