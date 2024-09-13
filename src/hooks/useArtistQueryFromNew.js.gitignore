import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchArtistQueryFromNew= () => {
  return api().get(`v1/browse/new-releases`);
};

export const useArtistQueryFromNew = () => {
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: () => fetchArtistQueryFromNew(),
    select: (res) => res.data.albums.items,
  });
};
