import { useEffect } from "react";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { userAtom } from "./atom";
import API_URL from "./environment";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setUser({
        isLoggedIn: true,
        email: Cookies.get("email"),
        username: Cookies.get("username"),
        id: Cookies.get("id"),
      });
    }
  }, [setUser]);

  const updateCookies = ({ token, id, email, username }) => {
    Cookies.set("token", token);
    Cookies.set("id", id);
    Cookies.set("email", email);
    Cookies.set("username", username);
  };

  const handleResponse = async (response, successMessage, errorMessage) => {
    try {
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || errorMessage };
      }
    } catch (error) {
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password, navigate, toast) => {
    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      const result = await handleResponse(
        response,
        "Login successful!",
        "An error occurred during login"
      );

      if (result.success) {
        const { data } = result;
        updateCookies({
          token: response.headers.get("Authorization"),
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
        });

        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
          id: data.user.id,
        });

        navigate("/");
        toast.success("Login successful!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during login");
    }
  };

  const signup = async (
    email,
    password,
    passwordConfirmation,
    navigate,
    toast
  ) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      const result = await handleResponse(
        response,
        "Account created successfully!",
        "An error occurred during account creation"
      );

      if (result.success) {
        const { data } = result;
        updateCookies({
          token: response.headers.get("Authorization"),
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
        });

        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
          id: data.user.id,
        });

        navigate("/");
        toast.success("Account created successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during account creation");
    }
  };

  const logout = async (navigate, toast) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await fetch(`${API_URL}/users/sign_out`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const result = await handleResponse(
        response,
        "Logout successful!",
        "Logout failed. Please try again."
      );

      if (result.success) {
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
        toast.success("Logout successful!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during logout");
    }
  };

  return { user, login, signup, logout };
};

export { useAuth };
