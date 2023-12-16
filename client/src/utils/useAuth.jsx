import { useEffect } from "react";
import { userAtom } from "./atom";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import API_URL from "./environment";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token && !user.isLoggedIn) {
      const fetchData = async () => {
        const response = await fetch(`${API_URL}/member-data`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            isLoggedIn: true,
            isAdmin: data.user.admin,
            email: data.user.email,
            username: data.user.username,
            id: data.user.id,
          });
        }
      };
      fetchData();
    }
  }, [user.isLoggedIn, setUser]);

  const login = async (email, password, navigate, toast) => {
    const response = await fetch(`${API_URL}/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = response.headers.get("Authorization");

      Cookies.set("token", token);

      setUser({
        isLoggedIn: true,
        isAdmin: data.user.admin,
        email: data.user.email,
        username: data.user.username,
        id: data.user.id,
      });

      navigate("/");
      toast.success("Login successful!");
    } else {
      toast.error("Please, verify your email or password");
    }
  };

  const signup = async (
    email,
    password,
    passwordConfirmation,
    navigate,
    toast
  ) => {
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

    if (response.ok) {
      const data = await response.json();
      const token = response.headers.get("Authorization");

      Cookies.set("token", token);

      setUser({
        isLoggedIn: true,
        isAdmin: data.user.admin,
        email: data.user.email,
        username: data.user.username,
        id: data.user.id,
      });

      navigate("/");
      toast.success("Account created successfully!");
    } else {
      toast.error("Please, verify your email or password");
    }
  };

  const logout = async (navigate, toast) => {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/users/sign_out`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      Cookies.remove("token");

      setUser({
        isLoggedIn: false,
        email: "",
        username: "",
        id: "",
      });

      navigate("/");
      toast.success("Logout successful!");
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Logout failed. Please try again.");
    }
  };

  const updateProfile = async ({
    username = "",
    email = "",
    password = "",
  }) => {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const requestBody = {
      user: {
        username,
        email,
        password,
      },
    };

    const response = await fetch(`${API_URL}/users/update_profile`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      const newToken = response.headers.get("Authorization");

      if (newToken) {
        Cookies.set("token", newToken);
      }

      setUser({
        isLoggedIn: true,
        email: data.user.email,
        username: data.user.username,
        id: data.user.id,
        isAdmin: data.user.admin,
      });

      return { success: true, data };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }
  };

  return { user, setUser, login, signup, logout, updateProfile };
};

export { useAuth, userAtom };
