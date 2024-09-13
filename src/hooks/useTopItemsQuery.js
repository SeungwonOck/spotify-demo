import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

// Top10 항목(앨범, 아티스트, 트랙) 가져오는 함수
// const fetchTopItems = asnc ({ type }) => {
//   const response = await api().get(`/v1/browse/top?type=${type}&limit=10`);
//   return response.data;
// };


// 아티스트 검색 함수
const fetchTopItems = ({ q }) => {
    return api().get(`/v1/search?type=top&q=${q}`); // Spotify Search API 호출
  };

// 커스텀 훅: Top10 아이템(앨범, 아티스트, 트랙) 가져오기
export const useTopItemsQuery = ({ q }) => {
  return useQuery({
    queryKey: ["top-items", q],
    queryFn: () => fetchTopItems({ q }),
    select: (res) => {
      if (res) return res.data.albums.items;
    //   if (type === "artists") return res.data.artists.items;
    //   if (type === "tracks") return res.data.tracks.items;
    },
  });
};
