// import { useQuery } from "@tanstack/react-query";
// import { api } from "../utils/api/api";

// // 아티스트 검색 함수
// const fetchArtists = ({ q }) => {
//   return api().get(`/v1/search?type=Track&q=${q}`); // Spotify Search API 호출
// };

// // 커스텀 훅: 검색 쿼리를 사용하여 아티스트 정보 가져오기
// export const useArtistsQuery = ({ q }) => {
//   return useQuery({
//     queryKey: ["search-track", q],
//     queryFn: () => fetchArtists({ q }),
//     select: (res) => res.data.artists // 아티스트 목록 선택
//   });
// };


import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

// 여러 트랙의 정보를 가져오는 함수
const fetchSeveralTracks = ({ trackIds }) => {
  return api().get(`/v1/tracks`, {
    params: {
      ids: trackIds.join(','),  // 트랙 ID들을 콤마로 구분하여 전달
    },
  });
};

// 커스텀 훅: 여러 트랙 정보를 가져오기
export const useSeveralTracksQuery = ({ trackIds }) => {
  return useQuery({
    queryKey: ["several-tracks", trackIds],
    queryFn: () => fetchSeveralTracks({ trackIds }),
    select: (res) => res.data.tracks, // 트랙 목록 선택
  });
};
