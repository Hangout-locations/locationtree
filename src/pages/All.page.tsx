import { useState } from "react";
import { CategorySlider } from "../components/CategorySlider";
import AppLayout from "../components/layout/AppLayout";
import { SearchHeader } from "../components/SearchHeader";
import { useNavigate } from "react-router-dom";
import PartyLists from "../components/parties/PartyLists";

const AllPage: React.FC = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"location" | "planning">(
    "location",
  );
  const [activeCategory, setActiveCategory] = useState<string>("Rooftops");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const handleCategorySelect = (category: string) => {
    // setIsLoading(true);
    setActiveCategory(category);
    setTimeout(() => {
      //   setIsLoading(false);
    }, 450);
  };

  // Run mock loading state and set search parameters
  const handleSearchSubmit = (searchParams: {
    destination: string;
    checkIn: string;
    checkOut: string;
  }) => {
    // setIsLoading(true);
    setSearchQuery(searchParams.destination);
    setCheckIn(searchParams.checkIn);
    setCheckOut(searchParams.checkOut);

    setTimeout(() => {
      //   setIsLoading(false);
    }, 550);
  };

  return (
    <AppLayout>
      <SearchHeader
        activeSearch={{
          destination: searchQuery,
          checkIn,
          checkOut,
        }}
        onSearch={handleSearchSubmit}
        onFilterClick={() => setIsFilterModalOpen(true)}
      />

      <CategorySlider
        activeCategory={activeCategory}
        activeTab={activeTab}
        onSelectCategory={handleCategorySelect}
      />

      <PartyLists items={[]} title="" />
    </AppLayout>
  );
};

export default AllPage;
