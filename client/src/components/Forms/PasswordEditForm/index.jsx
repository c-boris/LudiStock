import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from '../../../utils/environment';
import PropTypes from 'prop-types';

function PasswordEditForm ({ onPasswordChanged }) {
  const navigate = useNavigate();
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const currentUrl = window.location.href;

    const urlSearchParams = new URLSearchParams(new URL(currentUrl).search);

    const tokenFromUrl = urlSearchParams.get("reset_password_token");

    if (tokenFromUrl) {
      console.log("Reset Password Token:", tokenFromUrl);
      setResetPasswordToken(tokenFromUrl);
    } else {
      console.error("Reset Password Token not found in URL.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.newPassword || !formData.confirmPassword) {
        toast.error("All fields are required!");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and password confirmation do not match!");
        return;
      }

      const response = await fetch(`${API_URL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            password: formData.newPassword,
            password_confirmation: formData.confirmPassword,
            reset_password_token: resetPasswordToken,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage = data.message || "Password updated successfully!";
        toast.success(successMessage);
        if (onPasswordChanged) {
          onPasswordChanged();
        }
        navigate("/");
      } else {
        const data = await response.json();
        const errorMessage = data.message || "Password reset failed.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during password reset.");
    }
  };

  return (
    <>
      <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-light dark:bg-dark">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary dark:text-dprimary">
            Change password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
              >
                Password :
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
              >
                Password confirmation :
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

PasswordEditForm.propTypes = {
  onPasswordChanged: PropTypes.func,
};

export default PasswordEditForm;
