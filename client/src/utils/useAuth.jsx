import { useEffect } from "react";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { userAtom } from "./atom";
import API_URL from "./environment";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from cookie:", token);

    if (token) {
      setUser({
        isLoggedIn: true,
        email: Cookies.get("email"),
        username: Cookies.get("username"),
        id: Cookies.get("id"),
      });
    }
  }, [setUser]);

  const handleResponse = async (response, successMessage, errorMessage) => {
    if (response.ok) {
      const data = await response.json();
      const token = response.headers.get("Authorization");

      // Store token and user data in cookies
      Cookies.set("token", token);
      Cookies.set("id", data.user.id);
      Cookies.set("email", data.user.email);
      Cookies.set("username", data.user.username);

      // Set the user as logged in
      setUser({
        isLoggedIn: true,
        email: data.user.email,
        username: data.user.username,
        id: data.user.id,
      });

      return { success: true, message: successMessage };
    } else {
      return { success: false, message: errorMessage };
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
        "Invalid credentials"
      );

      if (result.success) {
        navigate("/");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred");
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
        "Error creating account"
      );

      if (result.success) {
        navigate("/");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred during account creation");
    }
  };

  const logout = (navigate, toast) => {
    // Clear cookies and reset user state
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    setUser({
      isLoggedIn: false,
      email: "",
      username: "",
    });

    navigate("/login");
    toast.success("Logout successful!");
  };

  const updateProfile = async ({
    email = "",
    emailConfirmation = "",
    password = "",
    passwordConfirmation = "",
    currentPassword = "",
  }) => {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    try {
      const response = await fetch(`${API_URL}/users/update_profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            email,
            email_confirmation: emailConfirmation,
            password,
            password_confirmation: passwordConfirmation,
            current_password: currentPassword,
          },
        }),
      });

      const result = await handleResponse(
        response,
        "Profile updated successfully!",
        "Failed to update profile"
      );

      if (result.success) {
        // Update user data in the local state
        setUser({
          isLoggedIn: true,
          email: response.data.user.email,
          username: response.data.user.username,
          id: response.data.user.id,
        });

        // Update cookies if necessary
        Cookies.set("email", response.data.user.email);
        Cookies.set("username", response.data.user.username);

        return result; // You can return additional data if needed
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw new Error("An error occurred during profile update");
    }
  };

  return { user, login, signup, logout, updateProfile };
};

export { useAuth };
