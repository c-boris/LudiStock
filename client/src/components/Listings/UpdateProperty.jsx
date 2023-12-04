import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropertyForm from "./PropertyForm";
import { useLocation } from "react-router-dom";

function UpdateProperty() {
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
        `http://localhost:3000/properties/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: {
              id: item.id,
              user_id: user.id,
              title: title,
              price: price,
              city: city,
              description: description,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/my-listings");
        Cookies.set("token", response.headers.get("Authorization"));
        toast.success("Property modified successfully!");
      } else {
        toast.error("Error modifying property");
        setError("Identifiants invalides");

        console.log(error.message);
      }
    } catch (error) {
      toast.error("An error occurred during property update");
      console.log(error.message);
    }
  };

  return (
    <>
      <PropertyForm
        viewTitle={"Modify property"}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        city={city}
        setCity={setCity}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        action={"Update"}
      />
    </>
  );
}

export default UpdateProperty;
