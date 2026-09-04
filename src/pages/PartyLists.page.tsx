import { useState } from "react";
import { CategorySlider } from "../components/CategorySlider";
import AppLayout from "../components/layout/AppLayout";
import { SearchHeader } from "../components/SearchHeader";
import type { FilterState } from "../components/FilterModal";
import PartyLists from "../components/parties/PartyLists";
import { useQuery } from "@tanstack/react-query";
import { adminCaller } from "../interceptors/http";
import type { TGroupedParties } from "../types/parties";
import PropertyCardSkeleton from "../components/parties/PropertCardSkeleton";

const PartiesPage: React.FC = () => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"location" | "planning">(
    "location",
  );
  const [activeCategory, setActiveCategory] = useState<string>("Rooftops");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterState>({
    placeType: "any",
    minPrice: 50,
    maxPrice: 1200,
    bedrooms: 1,
    beds: 1,
    adults: 1,
    children: 1,
    pets: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["parties-grouped-by-location"],
    queryFn: () =>
      adminCaller
        .get("/parties/grouped-by-location", {})
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  const handleCategorySelect = (category: string) => {
    // setIsLoading(true);
    setActiveCategory(category);
    setTimeout(() => {
      //   setIsLoading(false);
    }, 450);
  };

  const handleResetFilters = () => {
    //   setIsLoading(true);
    //   navigate("/");
    // setActiveCategory(defaultCategoryFor(activeTab));
    setSearchQuery("");
    setCheckIn("");
    setCheckOut("");
    setFilters({
      placeType: "any",
      minPrice: 50,
      maxPrice: 1200,
      bedrooms: 1,
      beds: 1,
      adults: 1,
      children: 1,
      pets: 1,
    });
    setTimeout(() => {
      //   setIsLoading(false);
    }, 500);
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

  // console.log("parties in group", data);

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

      <div className="w-full space-y-12 max-w-7xl mx-auto py-4 px-4 lg:px-5">
        {isLoading ? (
          <div className="w-full gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
        ) : (
          <>
            {data?.data?.map((item: TGroupedParties, index: number) => (
              <PartyLists
                items={item.parties}
                title={item.caption}
                key={index}
              />
            ))}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default PartiesPage;
