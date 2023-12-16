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
        try {
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
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };
      fetchData();
    }
  }, [user.isLoggedIn, setUser]);

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

      try {
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
          const errorData = await response.json();
          toast.error(errorData.message || "An error occurred during login");
        }
      } catch (error) {
        toast.error("An unexpected error occurred during login");
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

      try {
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
          const errorData = await response.json();
          toast.error(
            errorData.message || "An error occurred during account creation"
          );
        }
      } catch (error) {
        toast.error("An unexpected error occurred during account creation");
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
          "Content-Type": "application/json",
        },
      });

      try {
        if (response.status === 200) {
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
          const errorData = await response.json();
          toast.error(errorData.message || "Logout failed. Please try again.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred during logout");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during logout");
    }
  };

  const updateProfile = async ({
    username = "",
    email = "",
    password = "",
  }) => {
    try {
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

      try {
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
      } catch (error) {
        throw new Error("An error occurred during profile update");
      }
    } catch (error) {
      throw new Error("An unexpected error occurred during profile update");
    }
  };

  return { user, setUser, login, signup, logout, updateProfile };
};

export { useAuth, userAtom };
