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
import { useTranslation } from "react-i18next";

function UpdateListing() {
  const { t } = useTranslation();
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
  const [headerImage, setHeaderImage] = useState(item.headerImage);
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

  const formData = new FormData();
  formData.append("listing[id]", item.id);
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
      const response = await fetch(`${API_URL}/listings/${item.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
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
        viewTitle={t("modifyToy")}
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
        action={t("update")}
      />
    </>
  );
}

export default UpdateListing;
