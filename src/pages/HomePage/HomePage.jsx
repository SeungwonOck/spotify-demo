import React, { useState } from "react";

// import MusicReleases from "../../common/MusicCard/MusicReleases";
// import MusicArtists from "../../common/MusicCard/MusicArtists";
import NewReleasesSlider from "../../common/MusicSlider/NewReleasesSlider/NewReleasesSlider"
import ArtistSlider from "../../common/MusicSlider/ArtistsSlider/ArtistsSlider"
import PlaylistSlider from "../../common/MusicSlider/PlaylistSlider/PlaylistSlider"
import CategoriesSlider from "../../common/MusicSlider/CategoriesSlider/CategoriesSlider"
import TopItemsSlider from "../../common/MusicSlider/TopItemsSlider/TopItemsSlider"

const HomePage = () => {

  const [searchTerm, setSearchTerm] = useState('top hits'); // 기본 검색어 설정
 
  //  // // 여러 아티스트 ID를 설정
  //  const artistIds = ['1uNFoZAHBGtllmzznpCI3s', '3TVXtAsR1Inumwj472S9r4', '6eUKZXaKkcviH0Ku9w2n3V','0TnOYISbd1XYRBk9myaseg','2CIMQHirSU0MQqyYHq0eOx','57dN52uHvrHOxijzpIgu3E','1vCWHaC5f2uS3yhpwWbIA6 ']; // 예시 아티스트 ID
 // 검색할 키워드
//  const searchQuery = 'Bieber'; // 검색어 예시

  return (
    <div>
      <h1>Homepage</h1>

      <NewReleasesSlider/>

      {/* <MusicReleases /> */}

    {/* 사이 빈칸  */}
    <div style={{ margin: '50px 0' }}></div>
        
    {/* <MusicArtists title="Top Artists" artistIds={artistIds} /> */}

    <ArtistSlider />

    {/* <ArtistSlider searchQuery={searchQuery} /> 아티스트 슬라이더 */}

    <PlaylistSlider />
    {/* <PlaylistSlider title={`Search results for: ${searchTerm}`} /> */}
    {/* 플레이리스트 슬라이더 */}



    <CategoriesSlider/>



    {/* <TopItemsSlider/> */}
    </div>
  ) 
  
};

export default HomePage;
