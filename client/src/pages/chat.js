

import { Title } from "../utils/helpers";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, coverflowEffect } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'
const options = (start = 0) => {
  return {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: false,
    slidesPerView: 3,
    initialSlide: start,
    coverflowEffect: {
      rotate: 0,
      stretch: -5,
      depth: 10,
      modifier: 20,
    },

    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', clickable: true },
    modules: [EffectCoverflow, Pagination, Navigation],
    className: 'swiper_container container-wheel',
  }
}


const Chat = () => {
  const optionsObj = options()
  return <>
    <Swiper className='swiper-slide-visible'
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 0,
        stretch: 100,
        depth: 100,
        modifier: 2.5
      }}
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}

    >
      <SwiperSlide className="swiper-slide-visible" style={{ backgroundColor: 'red' }} >Slide 1</SwiperSlide>
      <SwiperSlide className="swiper-slide-visible" style={{ backgroundColor: 'red' }}>Slide 2</SwiperSlide>
      <SwiperSlide className="swiper-slide-visible" style={{ backgroundColor: 'red' }}>Slide 3</SwiperSlide>
      <SwiperSlide className="swiper-slide-visible" style={{ backgroundColor: 'red' }}>Slide 4</SwiperSlide>
    </Swiper>

  </>
};

export default Chat;

