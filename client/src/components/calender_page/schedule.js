
import NavCalender from "./calender";
import { useState, useEffect } from "react";
import { changeClass, GetDate, NextDate } from "../../utils/helpers";
import { format, isToday, isThisMonth } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




const Schedule = ({ date, setDate }) => {
  const [calenderClass, setCalenderClass] = useState('calender hidden')
  const [scale, setScale] = useState('Day')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const sc = format(time, 's')
    const waiting = (60 - sc) * 1000
    const interval = setInterval(() => setTime(new Date()), waiting)
    return () => clearInterval(interval)
  }, [time])

  const timeToPx = () => {
    const hour = format(time, 'k'), min = format(time, 'm')
    return hour * 100 + ((min * 10) / 6) //? convert time to px scale
  }

  const handleClicker = (direction) => {
    const { Day, Week, Month, Year } = new NextDate(date, direction)
    switch (scale) {
      case 'Day':
        return setDate(Day)
      case 'Week':
        return setDate(Week)
      case 'Month':
        return setDate(Month)
      case 'Year':
        return setDate(Year)
      default:
        return setDate(Day)
    }
  }

  const scaleDates = () => {
    const { weekDays, monDays, yearMons } = new GetDate(date)
    switch (scale) {
      case 'Day':
        return [date]
      case 'Week':
        return weekDays()
      case 'Month':
        return monDays()
      case 'Year':
        return yearMons()
      default:
        return [date]
    }
  }

  const getDateSwiper = (date) => {
    let checkDate = isToday(date);
    let dayNum = format(date, 'dd');
    let dayStr = format(date, 'iii');
    if (scale !== 'Year') return { checkDate, dayNum, dayStr }
    checkDate = isThisMonth(date)
    dayNum = format(date, 'MM')
    dayStr = format(date, 'MMM')
    return { checkDate, dayNum, dayStr }
  }

  const [swiperDates, setSwiperDates] = useState(scaleDates)
  useEffect(() => setSwiperDates(scaleDates), [date, scale])

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
        swiperDates.map((swiperDate) => {
          const { checkDate, dayNum, dayStr } = getDateSwiper(swiperDate)
          const className = checkDate ? 'ch-date today' : 'ch-date'
          return (
            <SwiperSlide key={swiperDate} className={className} onClick={() => setDate(swiperDate)}>
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
          <div className="cursor" style={{ top: `${timeToPx()}px` }}>
            <div className="point">{format(time, 'm')}</div>
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
          {
            ['Day', 'Week', 'Month', 'Year'].map((sl) => {
              return sl !== scale && <div key={sl} onClick={() => setScale(`${sl}`)}>{sl}</div>
            })
          }
        </div>
      </div>
      <div className="date-calenders" onClick={() => changeClass(calenderClass, setCalenderClass, 'calender', 'calender hidden')}>
        <div className="date">
          <div className="img"><i className="fa-solid fa-calendar-week"></i></div>
          <div className="text">{format(date, 'dd LLL y')}</div>
        </div>
      </div>
      <div className="slider">
        <div>
          <i className="fa-solid fa-chevron-left" onClick={() => handleClicker('-')} ></i>
          <i className="fa-solid fa-chevron-right" onClick={() => handleClicker('+')}></i>
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



