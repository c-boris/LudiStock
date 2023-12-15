import ReadListings from "../../components/Listings/ReadListings.jsx";
import DataLoader from "../../utils/DataLoader";

const Listings = () => {
  return (
    <div id="listings">
      <ReadListings />
      <DataLoader />
    </div>
  );
};

export default Listings;
