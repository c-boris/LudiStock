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
import MyListings from "./MyListings";
import API_URL from "../../utils/environment";
import FetchAge from "../FetchAPI/FetchAge";
import FetchState from "../FetchAPI/FetchSate";
import FetchCategory from "../FetchAPI/FetchCategory";

function NewListing() {
  const [user] = useAtom(userAtom);
  const [ageAtomValue] = useAtom(ageAtom);
  const [stateAtomValue] = useAtom(stateAtom);
  const [categoryAtomValue] = useAtom(categoryAtom);

  const [selectedAge, setSelectedAge] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
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
      const response = await fetch(`${API_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing: {
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
  FetchAge();
  FetchState();
  FetchCategory();
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
        action={"Create"}
      />
      <MyListings />
    </>
  );
}

export default NewListing;
