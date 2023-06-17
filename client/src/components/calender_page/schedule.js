
import NavCalender from "./calender";
import { useState, useEffect, useRef } from "react";
import { changeClass } from "../../utils/helpers";


import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




const Schedule = () => {
  const [calenderClass, setCalenderClass] = useState('calender hidden')
  const innerSlider = useRef()

  const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '13', '14', '15', '16', '17', '18', '19', '20']
  // const days = ['01', '02', '03', '04', '05', '06', '07']
  // const days = ['01', '02', '03']
  const dayStr = 'We'


  const WheelSwiper = () => {
    return <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={false}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: -5,
        depth: 10,
        modifier: 3,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container container-wheel"
    >
      {
        days.map((day, i) => {
          return (
            <SwiperSlide key={day + i} className={day === '04' ? 'ch-date today' : 'ch-date'} onClick={() => console.log('kk')}>
              <div className="date">
                <span>{dayStr}</span>
                {day}
              </div>
              <div className="dotes">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </SwiperSlide>
          )
        })
      }
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
      </div>
    </Swiper>
  }

  return <div className="schedule">
    <div className="header">
      <NavCalender className={calenderClass} />
      <div className="date-scale">
        <div className="value">
          <div className="text">Day</div>
          <div className="img"><i className="fa-solid fa-chevron-down"></i></div>
        </div>
      </div>
      <div className="date-calenders" onClick={() => changeClass(calenderClass, setCalenderClass, 'calender', 'calender hidden')}>
        <div className="date">
          <div className="img"><i className="fa-solid fa-calendar-week"></i></div>
          <div className="text">Oct 15, 2023</div>
        </div>
      </div>
      <div className="slider">
        <div>Slider</div>
      </div>
    </div>
    <div className="wheel-dates">
      <dev ref={innerSlider} className="inner-slider">
        <WheelSwiper />
      </dev >
    </div >
  </div >
}

export default Schedule;



