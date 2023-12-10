import { toast } from "react-toastify";
import API_URL from "../../utils/environment";

const fetchAPI = async (path) => {
  try {
    const response = await fetch(`${API_URL}/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      toast.error(`Error reading ${path}`);
      return [];
    }
  } catch (error) {
    toast.error(`An error occurred during ${path} reading`);
    return [];
  }
};

export default fetchAPI;
