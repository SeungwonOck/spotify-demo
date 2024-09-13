import React from 'react';
import {useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './PlaylistSlider.style.css'; // 스타일시트 임포트
import { musicSliderResponsive } from '../../../constants/musicSliderResponsive'; 

import {usePlaylistQuery} from "../../../hooks/usePlaylistQuery"

const PlaylistSlider = ({ searchQuery }) => {
    const { data: playlists, isLoading, isError, error } = usePlaylistQuery({ q: searchQuery });
    const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log ("playlist", playlists)


  const handleCardClick = (playlist) => {
    // 카드를 클릭하면 영화 ID를 기반으로 상세 페이지로 이동?  아직 디테일 페이지가 없어서 그런가??
    navigate(`/v1/search?type=playlist&q=${playlist.id}`);
  };

  return (
    <div className="carousel-container">
      <h1>Playlists</h1>
       
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
        {playlists.map((playlist) => (
          <div className="carousel-item" key={playlist.id} onClick={handleCardClick}>
            <img 
              src={playlist.images[0]?.url || '/placeholder-image.jpg'} 
              alt={playlist.name} 
            />
            <h2>{playlist.owner.display_name}</h2> {/* 플레이리스트 이름 */}
            <p>설명: {playlist.description}</p> {/* 플레이리스트 설명 */}
            {/* <p>팔로워: {playlist.followers.total}</p> 팔로워 수 */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PlaylistSlider;
