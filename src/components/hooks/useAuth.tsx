import { useQuery } from "@tanstack/react-query";
import { adminCaller } from "../../interceptors/http";

const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => adminCaller.get("/users/profile").then((res) => res.data),
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};

export default useAuth;
