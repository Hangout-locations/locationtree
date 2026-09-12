import { adminCaller } from "../interceptors/http";
import type { TParty } from "../types/parties";

export type Favorite = {
  _id?: string;
  targetId: string;
  targetType: string;
  target?: TParty;
  party?: TParty;
};

export const favoritesQueryKey = ["favorites"];

export const getFavorites = async (): Promise<Favorite[]> => {
  const response = await adminCaller.get("/favorites");
  const payload = response.data?.data ?? response.data;
  const favorites = Array.isArray(payload)
    ? payload
    : (payload?.favorites ?? []);

  return favorites;
};

export const removeFavorite = (targetId: string) =>
  adminCaller.delete(`/favorites/${targetId}`);

export const favoriteParty = (favorite: Favorite): TParty | undefined =>
  favorite.target ?? favorite.party;
