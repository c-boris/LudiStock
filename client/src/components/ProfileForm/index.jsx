import { useAuth } from "../../utils/useAuth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      await updateProfile({
        username,
        email,
        password,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <section id="profileform" className="isolate bg-light dark:bg-dark px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleUpdateProfile}>
          <div className="space-y-12">
            <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-primary dark:text-dprimary">Profile</h2>
              <p className="block text-sm text-center font-medium leading-6 text-primary dark:text-dprimary">
                Username : {user.username}
              </p>
              <p className="block text-sm text-center font-medium leading-6 text-primary dark:text-dprimary">
                Email : {user.email}
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                    Edit Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      // autoComplete="username"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      // required
                      aria-label="Edit Username"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                    Edit Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      // autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      // required
                      aria-label="Edit Email address"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-x-6">
            <div className="sm:col-span-4">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                Confirm changes with password
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
              Save
            </button>
          </div>
                

            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-x-12">
            <div className="sm:col-span-4">
              <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                Reset password
              </p>
              <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 mb-4 sm:mt-6"
            >
              Reset
            </button>
            </div>
            <div className="sm:col-span-4">
              <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                Delete account
              </p>
              <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 mb-4 sm:mt-6"
            >
              Delete
            </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileForm;
