import { useAuth } from "../../../utils/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../../../utils/environment";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atom } from "jotai";
import { useTranslation } from "react-i18next";

const usernameAtom = atom("");

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user, updateProfile, setUser } = useAuth();
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      await updateProfile({
        username,
        email,
        password,
      });

      setPassword("");

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Invalid password");
    }
  };

  const handleResetPassword = async () => {
    const confirmed = window.confirm("Reset password?");

    if (confirmed) {
      try {
        const response = await fetch(`${API_URL}/users/password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: user.email,
            },
          }),
        });

        if (response.ok) {
          toast.success("Email sent for password reset!");
        } else {
          toast.error("Failed to send password reset email.");
        }
      } catch (error) {
        console.error("Error during password reset:", error);
        toast.error("An error occurred during password reset");
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Delete account?");

    if (confirmed) {
      try {
        const token = Cookies.get("token");

        if (!token) {
          throw new Error("Authentication token is missing");
        }

        const response = await fetch(`${API_URL}/users`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        });

        if (response.ok) {
          Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName);
          });

          setUser({
            isLoggedIn: false,
            email: "",
            username: "",
            id: "",
          });

          navigate("/");
          toast.success("Account deleted successfully!");
        } else {
          toast.error("Failed to delete account.");
        }
      } catch (error) {
        console.error("Error during account deletion:", error);
        toast.error("An error occurred during account deletion");
      }
    }
  };

  return (
    <section
      id="profileform"
      className="isolate bg-light dark:bg-dark px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleUpdateProfile}>
          <div className="space-y-12">
            <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-primary dark:text-dprimary mb-10">
                Profile
              </h2>
              <p className="block  font-medium leading-6 text-primary dark:text-dprimary mb-2">
                {t("username")} {user.username}
              </p>
              <p className="block  font-medium leading-6 text-primary dark:text-dprimary mb-2">
                Email : {user.email}
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
                  >
                    {t("editUsername")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      aria-label="Edit Username"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
                  >
                    {t("editEmail")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Edit Email address"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row  gap-x-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
                  >
                    {t("confirmChangesPassword")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-label="Password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 sm:mt-8"
                >
                  {t("save")}
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-6 flex  sm:flex-row items-center gap-x-12">
          <div className="sm:col-span-4">
            <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
              {t("resetMyPassword")}
            </p>
            <button
              type="button"
              onClick={handleResetPassword}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 mb-4 sm:mt-6"
            >
              {t("reset")}
            </button>
          </div>
          <div className="sm:col-span-4">
            <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
              {t("deleteAccount")}
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 mb-4 sm:mt-6"
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
