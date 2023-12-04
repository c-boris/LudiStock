import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import MyProperties from "./MyProperties";
import { useNavigate } from "react-router-dom";

function DeleteProperty() {
  const location = useLocation();
  const item = location.state.item;
  console.log("item.id", item.id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/properties/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/my-listings");
        toast.success("Property deleted with success");
      } else {
        toast.error("Error deleting property");
        setError("Identifiants invalides");

        console.log(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during property delete");
      console.log(error.message);
    }
  };

  return (
    <>
      <MyProperties />
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Confirm deletion
        </button>
      </form>
    </>
  );
}

export default DeleteProperty;
