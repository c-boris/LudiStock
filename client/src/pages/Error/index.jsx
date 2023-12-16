import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Example() {
  const { t } = useTranslation();

  return (
    <>
      <main className="grid h-screen place-items-center bg-light dark:bg-dark px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-5xl">
            {t("pageNotFound")}
          </h1>
          <p className="mt-6 text-base leading-7 text-secondary dark:text-dsecondary">
            {t("sorry")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t("goBack")}
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
