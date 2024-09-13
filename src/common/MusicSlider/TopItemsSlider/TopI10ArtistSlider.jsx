
// 1. 아티스트에서 popularity 높은 순으로 10명을 뽑고, 각 아티스트의 가장 인기 있는 트랙 한 곡씩 슬라이드 만들기
// 여기서는 popularity가 높은 아티스트 10명을 추출한 후, 각 아티스트의 가장 인기 있는 트랙을 가져오는 방식입니다.

// 5 -1-1 ok
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTop10ArtistsPopularTracks } from "../../../hooks/useTop10ArtistsQuery";
import "./TopItemSlider.style.css";
import { musicSliderResponsive } from "../../../constants/musicSliderResponsive";

const TopTracksSlider = ({ searchQuery }) => {
  const { top10Tracks, isLoading, isError, error } = useTop10ArtistsPopularTracks({
    q: searchQuery,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log ("top10Tracks",top10Tracks)

  return (
    <div className="carousel-container">
      <h1>인지도 Top 10 Most Popular top10 Tracks</h1>
      <Carousel
        showDots={true}
        responsive={musicSliderResponsive}
        infinite={true}
        autoPlay={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {top10Tracks.map((track) => (
          <div className="carousel-item" key={track.id}>
            <img
              src={track.album.images[0]?.url || "/placeholder-image.jpg"}
              alt={track.name}
            />
            <h2>노래: {track.name}</h2>
            <p>가수: {track.artists.map((artist) => artist.name).join(", ")}</p>
            <p>인기도: {track.popularity}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopTracksSlider;
