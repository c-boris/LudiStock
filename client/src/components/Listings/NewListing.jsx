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
import API_URL from "../../utils/environment";

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

  const [headerImage, setHeaderImage] = useState("");

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
  const formData = new FormData();
  formData.append("listing[age_id]", selectedAge);
  formData.append("listing[state_id]", selectedState);
  formData.append("listing[category_id]", selectedCategory);
  formData.append("listing[user_id]", user.id);
  formData.append("listing[title]", title);
  formData.append("listing[price]", price);
  formData.append("listing[description]", description);
  formData.append("listing[header_image]", headerImage);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Cookies.set("token", response.headers.get("Authorization"));
        toast.success("Toy created successfully!");
        navigate("/my-listings");
      } else {
        toast.error("Missing field values");
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
        headerImage={headerImage}
        setHeaderImage={setHeaderImage}
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
    </>
  );
}

export default NewListing;
