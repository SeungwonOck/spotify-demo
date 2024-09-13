import React from 'react';
import { useTopItemsQuery } from '../../../hooks/useTopItemsQuery';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './TopItemSlider.style.css';  // 슬라이더 스타일
import { musicSliderResponsive } from '../../../constants/musicSliderResponsive';  // 반응형 설정

const TopItemsSlider = ({ title, searchQuery, type  }) => {
  // 데이터를 불러오기 위한 커스텀 훅 호출
  const { data: items, isLoading, isError, error } = useTopItemsQuery({ q: searchQuery });

  if (isLoading) {
    return <div>Loading...</div>;  // 로딩 상태 처리
  }

  if (isError) {
    return <div>Error: {error.message}</div>;  // 에러 상태 처리
  }

  // 슬라이더의 제목 설정
  // const title = type === 'albums' ? 'Top Albums' : type === 'artists' ? 'Top Artists' : 'Top Tracks';

  return (
    <div className="carousel-container">
      <h1>{title}</h1>
      <Carousel
        showDots={true}  // 점을 표시하도록 설정
        responsive={musicSliderResponsive}  // 반응형 설정
        infinite={true}  // 슬라이드가 무한히 순환하도록 설정
        autoPlay={true}  // 자동 재생 설정
        customTransition="all .5"  // 부드러운 전환 설정
        transitionDuration={500}  // 전환 시간 설정
        containerClass="carousel-container"  // 컨테이너 스타일 클래스
        removeArrowOnDeviceType={["tablet", "mobile"]}  // 특정 기기에서 화살표 제거
        dotListClass="custom-dot-list-style"  // 점 스타일 클래스 적용
        itemClass="carousel-item-padding-40-px"  // 슬라이드 항목 스타일 클래스
      >
        {/* 항목을 순회하며 슬라이더 항목을 생성 */}
        {items.map((item) => (
          <div className="carousel-item" key={item.id}>
            <img 
              src={item.images?.[0]?.url || '/placeholder-image.jpg'}  // 이미지가 없을 경우 대체 이미지
              alt={item?.name}  // 아티스트일 경우 이름, 앨범일 경우 앨범 이름
            />
           
           
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopItemsSlider;
