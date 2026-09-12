import { useQuery } from "@tanstack/react-query";
import AppLayout from "../components/layout/AppLayout";
import PartyLists from "../components/parties/PartyLists";
import PropertyCardSkeleton from "../components/parties/PropertCardSkeleton";
import type { TGroupedParties } from "../types/parties";
import { adminCaller } from "../interceptors/http";

const AllPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["parties-grouped-by-location"],
    queryFn: () =>
      adminCaller.get("/parties/grouped-by-location").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return (
    <AppLayout>
      <div className="w-full space-y-12 max-w-7xl mx-auto p-4 lg:p-5">
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

export default AllPage;
