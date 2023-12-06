import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import MyListings from "./MyListings";
import ShowListing from "./ShowListing";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/environment";

function DeleteListing() {
  const location = useLocation();
  const item = location.state.item;
  console.log("item.id", item.id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/listings/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/my-listings");
        toast.success("Toy deleted with success");
      } else {
        toast.error("Error deleting toy");
        setError("Identifiants invalides");

        console.log(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during toy delete");
      console.log(error.message);
    }
  };

  return null;
}

export default DeleteListing;
