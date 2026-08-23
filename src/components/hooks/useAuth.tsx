import { useQuery } from "@tanstack/react-query";
import { adminCaller } from "../../interceptors/http";

const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => adminCaller.get("/auth/me").then((res) => res.data),
  });
  return { data, isLoading };
};

export default useAuth;
