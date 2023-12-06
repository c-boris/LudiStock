import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function PasswordUpdateForm() {
  const [user, setUser] = useAtom(userAtom);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users/password", {
        method: "PUT", // Use the PUT method for password update
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify({
          user: {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
          },
        }),
      });

      if (response.ok) {
        toast.success("Password updated successfully!");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update password");
      }
    } catch (error) {
      toast.error("An error has occurred");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleUpdatePassword} className="password-form">
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
}

export default PasswordUpdateForm;
