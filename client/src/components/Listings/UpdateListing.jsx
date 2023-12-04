import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingForm from "./ListingForm";
import { useLocation } from "react-router-dom";

function UpdateListing() {
  const location = useLocation();
  const item = location.state.item;
  const [error, setError] = useState(null);
  const [user, setUser] = useAtom(userAtom);
  const [title, setTitle] = useState(item.title);

  const [price, setPrice] = useState(item.price);
  const [city, setCity] = useState(item.city);
  const [description, setDescription] = useState(item.description);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/listings/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listing: {
              id: item.id,
              user_id: user.id,
              title: title,
              price: price,
              description: description,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/my-listings");
        Cookies.set("token", response.headers.get("Authorization"));
        toast.success("Listing modified successfully!");
      } else {
        toast.error("Error modifying listing");
        setError("Identifiants invalides");

        console.log(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during listing update");
      console.log(error.message);
    }
  };

  return (
    <>
      <ListingForm
        viewTitle={"Modify toy to sell"}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        action={"Update"}
      />
    </>
  );
}

export default UpdateListing;
