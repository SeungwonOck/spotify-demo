import React from "react";

import NewReleasesSlider from "../../common/MusicSlider/NewReleasesSlider/NewReleasesSlider"
import ArtistSlider from "../../common/MusicSlider/ArtistsSlider/ArtistsSlider"
import PlaylistSlider from "../../common/MusicSlider/PlaylistSlider/PlaylistSlider"
import CategoriesSlider from "../../common/MusicSlider/CategoriesSlider/CategoriesSlider"
import TopI10ArtistSlider from "../../common/MusicSlider/TopItemsSlider/TopI10ArtistSlider"


const HomePage = () => {


  return (
    <div>
      <h1>Homepage</h1>

      <NewReleasesSlider/>
      <ArtistSlider />
      <PlaylistSlider />
      <CategoriesSlider/>
      <TopI10ArtistSlider/>




    </div>
  ) 
  
};

export default HomePage;
