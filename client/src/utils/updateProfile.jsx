// const updateProfile = async ({
  //   email = "",
  //   emailConfirmation = "",
  //   password = "",
  //   passwordConfirmation = "",
  //   currentPassword = "",
  // }) => {
  //   const token = Cookies.get("token");

  //   if (!token) {
  //     throw new Error("Authentication token is missing");
  //   }

  //   try {
  //     const response = await fetch(`${API_URL}/users/update_profile`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //         // "Authorization": `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           email,
  //           email_confirmation: emailConfirmation,
  //           password,
  //           password_confirmation: passwordConfirmation,
  //           current_password: currentPassword,
  //         },
  //       }),
  //     });

  //     const result = await handleResponse(
  //       response,
  //       "Profile updated successfully!",
  //       "Failed to update profile"
  //     );

  //     if (result.success) {
  //       // Update user data in the local state
  //       setUser({
  //         isLoggedIn: true,
  //         email: response.data.user.email,
  //         username: response.data.user.username,
  //         id: response.data.user.id,
  //       });

  //       // Update cookies if necessary
  //       Cookies.set("email", response.data.user.email);
  //       Cookies.set("username", response.data.user.username);

  //       return result; // You can return additional data if needed
  //     } else {
  //       throw new Error(result.message);
  //     }
  //   } catch (error) {
  //     throw new Error("An error occurred during profile update");
  //   }
  // };

  // return { user, login, signup, logout, updateProfile };