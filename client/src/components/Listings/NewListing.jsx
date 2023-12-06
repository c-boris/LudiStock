import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingForm from "./ListingForm";
import MyListings from "./MyListings";
import API_URL from '../../utils/environment';

function NewListing() {
  const [user, setUser] = useAtom(userAtom);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing: {
            user_id: user.id,
            title: title,
            price: price,
            description: description,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("token", response.headers.get("Authorization"));
        navigate("/my-listings");
        toast.success("Toy created successfully!");
      } else {
        toast.error("Error creating toy");
      }
    } catch (error) {
      toast.error("An error occurred during toy creation");
    }
  };

  return (
    <>
      <ListingForm
        viewTitle={"Create a new toy to sell"}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        action={"Create"}
      />
      <MyListings />
    </>
  );
}

export default NewListing;
