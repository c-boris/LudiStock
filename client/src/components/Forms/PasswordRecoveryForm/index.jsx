import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../../utils/environment";
import { useTranslation } from "react-i18next";

function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const handlePasswordRecovery = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
          },
        }),
      });

      if (response.ok) {
        toast.success("Password recovery email sent successfully!");
      } else {
        toast.error("No accounts match. Please verify your email address.");
      }
    } catch (error) {
      toast.error("An error occurred during password recovery");
    }
  };

  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-light dark:bg-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary dark:text-dprimary">
          {t("forgotPassword")}
        </div>
        <form onSubmit={handlePasswordRecovery} className="space-y-6">
          <div>
            <label
              htmlFor="passwordRecoveryEmail"
              className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
            >
              Enter your email address to reset your password
              {t("resetPassword")}
            </label>
            <div className="mt-2">
              <input
                id="passwordRecoveryEmail"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
          <p className="mt-5 text-center text-sm text-primary dark:text-dprimary">
            {t("rememberPassword")}
            <NavLink
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecoveryForm;
