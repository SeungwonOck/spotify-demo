// 동작 3
// // 아티스트 정보가지고오고 거기서 팔로워가 많은 10명중 그 각 아티스트의 첫번째 트랙을 가지고옴 (동작함 )
// import { useQuery } from "@tanstack/react-query";
// import { api } from "../utils/api/api";

// // 특정 아티스트의 상위 트랙을 가져오는 함수
// const fetchTopTracks = async ({ artistId }) => {
//   const response = await api().get(`/v1/artists/${artistId}/top-tracks`, {
//     params: { market: 'KR' },
//   });
//   return response.data.tracks;
// };

// // 커스텀 훅: 검색 쿼리를 사용하여 아티스트 정보 가져오기
// export const useArtistsQuery = ({ q }) => {
//   return useQuery({
//     queryKey: ["search-artist", q, "KR"],
//     queryFn: () => api().get(`/v1/search?type=artist&q=${q}&market=KR`), // 'KR' 시장 설정
//     select: (res) => res.data.artists.items, // 아티스트 목록 선택
//   });
// };

// // 상위 10명의 팔로워가 많은 아티스트 추출 및 각 아티스트의 첫 번째 트랙 가져오기
// export const useTop10ArtistsTracks = ({ q }) => {
//   const { data: artists, isLoading, isError, error } = useArtistsQuery({ q });

//   const top10Artists = artists
//     ?.sort((a, b) => b.followers.total - a.followers.total) // 팔로워가 많은 순으로 정렬
//     .slice(0, 10); // 상위 10명의 아티스트만 선택

//   const top10TracksQuery = useQuery({
//     queryKey: ["top10Tracks", q],
//     queryFn: async () => {
//       const tracks = await Promise.all(
//         top10Artists.map(async (artist) => {
//           const artistTracks = await fetchTopTracks({ artistId: artist.id });
//           return artistTracks[0]; // 각 아티스트의 첫 번째 트랙만 추출
//         })
//       );
//       return tracks;
//     },
//     enabled: !!top10Artists, // top10Artists 데이터가 있을 때만 실행
//   });

//   return {
//     top10Tracks: top10TracksQuery.data,
//     isLoading: isLoading || top10TracksQuery.isLoading,
//     isError: isError || top10TracksQuery.isError,
//     error: error || top10TracksQuery.error,
//   };
// };




// 5 동작  팔로워가 많은 아티스트 10명중 각 아티스트의 첫번째 음악 
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

// 특정 아티스트의 상위 트랙 중 가장 높은 popularity 트랙을 가져오는 함수
const fetchTopTracks = async ({ artistId }) => {
  const response = await api().get(`/v1/artists/${artistId}/top-tracks`, {
    params: { market: 'US' },  // 한국 시장 설정
  });
  const tracks = response.data.tracks;

  // 트랙을 popularity 기준으로 정렬하여 가장 인기 있는 곡을 반환
  const mostPopularTrack = tracks.sort((a, b) => b.popularity - a.popularity)[0];
  return mostPopularTrack;
};

// 커스텀 훅: 검색 쿼리를 사용하여 아티스트 정보 가져오기
export const useArtistsQuery = ({ q }) => {
  return useQuery({
    queryKey: ["search-artist", q, "US"],
    queryFn: () => api().get(`/v1/search?type=artist&q=${q}&market=US`), // 'KR' 시장 설정
    select: (res) => res.data.artists.items, // 아티스트 목록 선택
  });
};

// 상위 10명의 팔로워가 많은 아티스트 추출 및 각 아티스트의 가장 인기 있는 트랙 가져오기
export const useTop10ArtistsTracks = ({ q }) => {
  const { data: artists, isLoading, isError, error } = useArtistsQuery({ q });

  const top10Artists = artists
    ?.sort((a, b) => b.followers.total - a.followers.total) // 팔로워가 많은 순으로 정렬
    .slice(0, 10); // 상위 10명의 아티스트만 선택

  const top10TracksQuery = useQuery({
    queryKey: ["top10Tracks", q],
    queryFn: async () => {
      const tracks = await Promise.all(
        top10Artists.map(async (artist) => {
          const mostPopularTrack = await fetchTopTracks({ artistId: artist.id });
          return mostPopularTrack; // 가장 인기 있는 트랙 반환
        })
      );
      return tracks;
    },
    enabled: !!top10Artists, // top10Artists 데이터가 있을 때만 실행
  });

  return {
    top10Tracks: top10TracksQuery.data,
    isLoading: isLoading || top10TracksQuery.isLoading,
    isError: isError || top10TracksQuery.isError,
    error: error || top10TracksQuery.error,
  };
};
