import Hero from "../../components/Hero";
import ReadListings from "../../components/Listings/ReadListings";
import DataLoader from "../../utils/DataLoader";

export default function Home() {
  return (
    <div id="home">
      <Hero />
      <ReadListings />
      <DataLoader />
    </div>
  );
}
