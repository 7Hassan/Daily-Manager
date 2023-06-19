
import NavCalender from "./calender";
import { useState, useEffect } from "react";
import { changeClass, GetDate, scaleDates } from "../../utils/helpers";
import { format, formatDistanceStrict } from 'date-fns';
// import  formatDistanceStrict  from 'date-fns/formatDistanceStrict';



import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




const Schedule = ({ date, setDate }) => {
  // const format1 = formatDistanceStrict(new Date(2014, 6, 2), new Date(2014, 6, 3))  1 day
  const format1 = formatDistanceStrict(new Date(2014, 6, 2), new Date(2014, 6, 3))
  // console.log('🚀 ~ format1:', format1)

  const getDate = new GetDate()
  const [calenderClass, setCalenderClass] = useState('calender hidden')
  const [scale, setScale] = useState('Day')
  const [time, setTime] = useState(format(new Date(), 'k:m:s'))
  const [swiper, setWiper] = useState(scaleDates(date, scale, 'dd,iii'))



  useEffect(() => {
    const waiting = (60 - time.split(':')[2]) * 1000;
    const interval = setInterval(() => setTime(format(new Date(), 'k:m:s')), waiting)
    return () => clearInterval(interval)
  }, [time])

  useEffect(() => {
    setWiper(scaleDates(date, scale, 'dd,iii'))

  }, [date, scale])





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
        swiper.map((day, i) => {
          const dayNum = day.split(',')[0];
          const dayStr = day.split(',')[1];
          return (
            //! {day === '04' ? 'ch-date today' : 'ch-date'}
            <SwiperSlide key={day} className='ch-date'>
              <div className="date">
                {dayNum}
                <span>{dayStr}</span>
              </div>
              <div className="dotes" style={{ display: 'none' }}>
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

  const Day = () => {
    const hours = Array.from({ length: 24 }, (_, index) => `${index > 9 ? index : '0' + index}:00`)
    return (
      <div className="day">
        <div className="day-container">
          <div className="cursor" style={{ top: `${topCursor(time)}px` }}>
            <div className="point">{time.split(':')[1]}</div>
          </div>
          <div className="event">
            <div className="event-container">
              Event
            </div>
          </div>
          {
            hours.map((hour) => {
              return (
                <div className="hour" key={hour}>
                  <div className="time">{hour}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  const Week = () => {
    return <div className="week">
      <div className="week-container">
        week
      </div>
    </div>
  }
  const Month = () => {
    return <div className="month">
      <div className="month-container">
        month
      </div>
    </div>
  }
  const Year = () => {
    return <div className="year">
      <div className="year-container">
        year
      </div>
    </div>
  }


  return <div className="schedule">
    <div className="header">
      <NavCalender className={calenderClass} date={date} setDate={setDate} />
      <div className="date-scale">
        <div className="value">
          {scale}
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="selectors">
          <div onClick={() => setScale('Day')}>Day</div>
          <div onClick={() => setScale('Week')} >Week</div>
          <div onClick={() => setScale('Month')}>Month</div>
          <div onClick={() => setScale('Year')}>Year</div>
        </div>
      </div>
      <div className="date-calenders" onClick={() => changeClass(calenderClass, setCalenderClass, 'calender', 'calender hidden')}>
        <div className="date">
          <div className="img"><i className="fa-solid fa-calendar-week"></i></div>
          <div className="text">{format(date, 'LLL dd, y')}</div>
        </div>
      </div>
      <div className="slider">
        <div>
          <i className="fa-solid fa-chevron-left"></i>
          <i className="fa-solid fa-chevron-right" ></i>
        </div>
      </div>
    </div>
    <div className="wheel-dates">
      <div className="inner-slider">
        <WheelSwiper />
      </div >
    </div >
    <div className="table">
      <div className="table-container">
        {scale === 'Day' && Day()}
        {scale === 'Week' && Week()}
        {scale === 'Month' && Month()}
        {scale === 'Year' && Year()}
      </div>
    </div>
  </div >
}

export default Schedule;



function topCursor(time) {
  const timeSplit = time.split(':')
  const hour = +timeSplit[0], min = +timeSplit[1]
  return hour * 100 + ((min * 10) / 6)
}