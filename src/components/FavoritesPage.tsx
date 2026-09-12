import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, LoaderCircle, Trash2 } from "lucide-react";
import AppLayout from "./layout/AppLayout";
import NotSignedIn from "./auth/NotSignedInWrapper";
import { PartyListCard } from "./parties/PartyListCard";
import { favoritesQueryKey, removeFavorite } from "../lib/favorites";
import { adminCaller } from "../interceptors/http";
import type { TParty } from "../types/parties";

interface IPartyItem extends TParty {
  targetId: TParty;
}

export const FavoritesPage = () => {
  const queryClient = useQueryClient();
  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => adminCaller.get("/favorites").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  const handleRemove = async (targetId: string) => {
    await removeFavorite(targetId);
    await queryClient.invalidateQueries({ queryKey: ["favorites"] });
  };

  const parties = (favorites || []).filter(
    (p: any) => p?.targetType === "Party",
  );

  const homes = (favorites || []).filter((p: any) => p?.targetType === "Home");

  console.log("parties", parties);

  return (
    <AppLayout>
      <NotSignedIn>
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="mb-8 flex items-center gap-3">
            <Heart className="h-7 w-7 fill-red-500 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Favorites</h1>
              <p className="text-sm text-muted-foreground">
                Your saved parties and places
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center">
              <LoaderCircle className="h-7 w-7 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Favorites could not be loaded. Please try again.
            </p>
          ) : parties.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-14 text-center">
              <Heart className="mx-auto mb-3 h-9 w-9 text-muted-foreground" />
              <p className="font-bold">No favorites yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap the heart on a party to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {parties?.map((party: IPartyItem, index: number) => (
                <div key={party._id} className="relative">
                  <PartyListCard party={party?.targetId} index={index} />
                  <button
                    type="button"
                    onClick={() => handleRemove(party?._id)}
                    className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 text-muted-foreground shadow-sm hover:text-red-500"
                    aria-label={`Remove ${party?.targetId?.title} from favorites`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </NotSignedIn>
    </AppLayout>
  );
};
