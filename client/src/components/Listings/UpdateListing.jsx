import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import { ageAtom } from "../../utils/ageAtom";
import { stateAtom } from "../../utils/stateAtom";
import { categoryAtom } from "../../utils/categoryAtom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingForm from "./ListingForm";
import { useLocation } from "react-router-dom";
import API_URL from "../../utils/environment";
import fetchAPI from "../FetchAPI/fetchAPI";
import { listingsAtom } from "../../utils/listingsAtom";

function UpdateListing() {
  const location = useLocation();
  const item = location.state.item;
  const [error, setError] = useState(null);
  const [user] = useAtom(userAtom);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [selectedAge, setSelectedAge] = useState(item.age_id);
  const [selectedState, setSelectedState] = useState(item.state_id);
  const [selectedCategory, setSelectedCategory] = useState(item.category_id);
  const [ageAtomValue] = useAtom(ageAtom);
  const [stateAtomValue] = useAtom(stateAtom);
  const [categoryAtomValue] = useAtom(categoryAtom);
  const navigate = useNavigate();
  const [, setListingsAtom] = useAtom(listingsAtom);

  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/listings/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing: {
            id: item.id,
            age_id: selectedAge,
            state_id: selectedState,
            category_id: selectedCategory,
            user_id: user.id,
            title: title,
            price: price,
            description: description,
          },
        }),
      });

      if (response.ok) {
        Cookies.set("token", response.headers.get("Authorization"));
        toast.success("Listing modified successfully!");
        setListingsAtom(fetchAPI("listings"));
        navigate("/my-listings");
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
        ageAtomValue={ageAtomValue}
        selectedAge={selectedAge}
        handleAgeChange={handleAgeChange}
        stateAtomValue={stateAtomValue}
        selectedState={selectedState}
        handleStateChange={handleStateChange}
        categoryAtomValue={categoryAtomValue}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleSubmit={handleSubmit}
        action={"Update"}
      />
    </>
  );
}

export default UpdateListing;
