import ReadListings from "../../components/Listings/ReadListings.jsx";
import DataLoader from "../../utils/DataLoader";

const Listings = () => {
  return (
    <div id="listings">
      <DataLoader />
      <ReadListings />
    </div>
  );
};

export default Listings;
