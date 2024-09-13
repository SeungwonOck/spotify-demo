import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";


// 플레이리스트 검색 함수
const fetchPlaylist = ({ q }) => {
    return api().get(`/v1/search?type=playlist&q=${q}`); // Spotify Search API 호출
  };
  
  // 커스텀 훅: 검색 쿼리를 사용하여 플레이리스트 정보 가져오기
  export const usePlaylistQuery = ({ q }) => {
    return useQuery({
      queryKey: ["search-playlist", q],
      queryFn: () => fetchPlaylist({ q }),
      select: (res) => res.data.playlists.items, // 플레이리스트 목록 선택
    });
  };