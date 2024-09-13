import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

// 아티스트 검색 함수
const fetchArtists = ({ q }) => {
  return api().get(`/v1/search?type=artist&top-tracks&q=${q}`); // Spotify Search API 호출
};

// 커스텀 훅: 검색 쿼리를 사용하여 아티스트 정보 가져오기
export const useArtistsQuery = ({ q }) => {
  return useQuery({
    queryKey: ["search-artist", q],
    queryFn: () => fetchArtists({ q }),
    select: (res) => res.data.artists.items, // 아티스트 목록 선택
  });
};












