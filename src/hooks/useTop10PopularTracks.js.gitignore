// 2. 아티스트들의 모든 트랙 중에서 popularity가 높은 상위 10개의 트랙을 슬라이드로 보여주는 방식입니다. 아티스트는 중요하지 않으며, 트랙의 인기도가 기준이 됩니다.

//1-1 ok
// import { useQuery } from "@tanstack/react-query";
// import { api } from "../utils/api/api";

// // 특정 아티스트의 상위 트랙을 가져오는 함수
// const fetchTopTracks = async ({ artistId }) => {
//   const response = await api().get(`/v1/artists/${artistId}/top-tracks`, {
//     params: { market: 'KR' },  // 한국 시장 설정
//   });
//   return response.data.tracks; // 모든 트랙 반환
// };

// // 아티스트 검색 함수 - popularity 높은 아티스트 10명 추출
// const fetchPopularArtists = async ({ q }) => {
//   const response = await api().get(`/v1/search?type=artist&q=${q}&market=US`);
//   return response.data.artists.items
//     .sort((a, b) => b.popularity - a.popularity)
//     .slice(0, 10); // 상위 10명만 선택
// };

// // 커스텀 훅: popularity 높은 10개의 트랙 추출
// export const useTop10PopularTracks = ({ q }) => {
//   const { data: artists, isLoading, isError, error } = useQuery({
//     queryKey: ["popular-artists", q],
//     queryFn: () => fetchPopularArtists({ q }),
//     select: (res) => res,
//   });

//   const top10TracksQuery = useQuery({
//     queryKey: ["top10Tracks", q],
//     queryFn: async () => {
//       const allTracks = await Promise.all(
//         artists.map(async (artist) => {
//           const artistTracks = await fetchTopTracks({ artistId: artist.id });
//           return artistTracks;
//         })
//       );

//       // 모든 아티스트의 트랙을 하나로 합친 후 popularity 높은 순으로 정렬
//       const flattenedTracks = allTracks.flat();
//       return flattenedTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
//     },
//     enabled: !!artists,
//   });

//   return {
//     top10Tracks: top10TracksQuery.data,
//     isLoading: isLoading || top10TracksQuery.isLoading,
//     isError: isError || top10TracksQuery.isError,
//     error: error || top10TracksQuery.error,
//   };
// };



//1-1
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

// 특정 아티스트의 상위 트랙을 가져오는 함수
const fetchTopTracks = async ({ artistId }) => {
  const response = await api().get(`/v1/artists/${artistId}/top-tracks`, {
    params: { market: 'US' },  // 더 큰 시장으로 설정
  });
  return response.data.tracks; // 모든 트랙 반환
};

// 아티스트 검색 함수 - popularity 높은 아티스트 10명 추출
const fetchPopularArtists = async ({ q }) => {
  const response = await api().get(`/v1/search?type=artist&q=${q}&market=US`);
  return response.data.artists.items
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10); // 상위 10명만 선택
};

// 커스텀 훅: popularity 높은 10개의 트랙 추출
export const useTop10PopularTracks = ({ q }) => {
  const { data: artists, isLoading, isError, error } = useQuery({
    queryKey: ["popular-artists", q],
    queryFn: () => fetchPopularArtists({ q }),
    select: (res) => res,
  });

  const top10TracksQuery = useQuery({
    queryKey: ["top10Tracks", q],
    queryFn: async () => {
      const allTracks = await Promise.all(
        artists.map(async (artist) => {
          const artistTracks = await fetchTopTracks({ artistId: artist.id });
          return artistTracks;
        })
      );

      // 모든 아티스트의 트랙을 하나로 합친 후 popularity 높은 순으로 정렬
      const flattenedTracks = allTracks.flat();
      return flattenedTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
    },
    enabled: !!artists,
  });

  return {
    top10Tracks: top10TracksQuery.data,
    isLoading: isLoading || top10TracksQuery.isLoading,
    isError: isError || top10TracksQuery.isError,
    error: error || top10TracksQuery.error,
  };
};
