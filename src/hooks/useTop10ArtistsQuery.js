

// 1. 아티스트에서 popularity 높은 순으로 10명을 뽑고, 각 아티스트의 가장 인기 있는 트랙 한 곡씩 슬라이드 만들기
// 여기서는 popularity가 높은 아티스트 10명을 추출한 후, 각 아티스트의 가장 인기 있는 트랙을 가져오는 방식입니다.


import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

// 특정 아티스트의 상위 트랙 중 가장 높은 popularity 트랙을 가져오는 함수
const fetchTopTracks = async ({ artistId }) => {
  const response = await api().get(`/v1/artists/${artistId}/top-tracks`, {
    params: { market: 'US' },
  });
  const tracks = response.data.tracks;

  // 트랙을 popularity 기준으로 정렬하여 가장 인기 있는 곡을 반환
  return tracks.sort((a, b) => b.popularity - a.popularity)[0];
};

// 아티스트 검색 함수 - popularity 높은 아티스트 10명 추출
const fetchPopularArtists = async ({ q }) => {
  const response = await api().get(`/v1/search?type=artist&q=${q}&market=US`);
  const artists = response.data.artists.items;

  // popularity 높은 순으로 정렬하여 상위 10명만 추출
  return artists.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
};

// 커스텀 훅: 인기 있는 10명의 아티스트와 그들의 가장 인기 있는 트랙 가져오기
export const useTop10ArtistsPopularTracks = ({ q }) => {
  const { data: artists, isLoading, isError, error } = useQuery({
    queryKey: ["popular-artists", q],
    queryFn: () => fetchPopularArtists({ q }),
    select: (res) => res, 
  });

  const top10TracksQuery = useQuery({
    queryKey: ["top10PopularTracks", q],
    queryFn: async () => {
      const tracks = await Promise.all(
        artists.map(async (artist) => {
          const mostPopularTrack = await fetchTopTracks({ artistId: artist.id });
          return mostPopularTrack;
        })
      );
      return tracks;
    },
    enabled: !!artists, // 아티스트 데이터가 있을 때만 실행
  });

  return {
    top10Tracks: top10TracksQuery.data,
    isLoading: isLoading || top10TracksQuery.isLoading,
    isError: isError || top10TracksQuery.isError,
    error: error || top10TracksQuery.error,
  };
};
