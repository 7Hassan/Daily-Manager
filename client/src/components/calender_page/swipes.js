
import { Dotes } from '../../utils/elements';
import { format, isToday, isSameDay, isBefore, isAfter } from 'date-fns';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { GetDate, getStart, getEnd } from '../../utils/helpers'
import { useState, useEffect, useRef } from 'react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const options = (start) => {
  return {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: false,
    slidesPerView: 'auto',
    initialSlide: start ? start : 0,
    coverflowEffect: {
      rotate: 0,
      stretch: -5,
      depth: 10,
      modifier: 20,
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', clickable: true },
    modules: [EffectCoverflow, Pagination, Navigation],
    className: 'swiper_container container-wheel',
  }
}

const Controller = () => {
  return < div className="slider-controler" >
    <div className="swiper-button-prev slider-arrow" >
      <ion-icon name="arrow-back-outline"></ion-icon>
    </div>
    <div className="swiper-button-next slider-arrow"  >
      <ion-icon name="arrow-forward-outline"></ion-icon>
    </div>
  </div >
};

const getDateSwiper = (date) => {
  const checkDate = isToday(date)
  const dayNum = format(date, 'dd')
  const dayStr = format(date, 'iii')
  return { checkDate, dayNum, dayStr }
};

export const MonSwiper = ({ data }) => {
  const { classN, weekDays, tempDateRange, setTempDateRange, setCalenderDate } = data;
  const tempStart = tempDateRange.start
  const tempEnd = tempDateRange.end
  const [status, setStatus] = useState('start')
  const { yearMons } = new GetDate(new Date())
  const months = yearMons()
  const optionsObj = options((format(tempStart, 'M') - 1))


  const handleMouseOver = (day) => (status === 'end') ? setTempDateRange({ ...tempDateRange, end: day }) : null
  const handleMouseLeave = () => (status === 'end' && window.innerWidth > 1050) ? setTempDateRange({ ...tempDateRange, end: tempStart }) : null
  const handleClickDate = (day) => {
    setTempDateRange({ ...tempDateRange, end: day })
    if (status !== 'start') return setStatus('start')
    setTempDateRange({ start: day, end: day })
    setStatus('end')
  }
  const monthChange = (swiper) => {
    const index = swiper.activeIndex;
    const month = months[index]
    setCalenderDate(month)
    setStatus('start')
  };
  useEffect(() => setStatus('start'), [classN])

  return <Swiper {...optionsObj} onSlideChange={monthChange} >
    <Controller />
    {
      months.map((month) => {
        const { monDays } = new GetDate(month)
        const days = monDays()
        const firstDay = format(days[0], 'iiiiii')
        const splitWeeksDays = weekDays.slice(0, weekDays.indexOf(firstDay))
        return <SwiperSlide key={month} className="mon-days" onMouseLeave={handleMouseLeave} >
          {splitWeeksDays.map((weekDay) => < div key={weekDay} style={{ color: '#ccc' }} ></div>)}
          {
            days.map((day) => {
              const dayNum = format(day, 'dd')
              const checkSame = isSameDay(day, tempStart) || isSameDay(day, tempEnd)
              const checkBetween = isBefore(day, getEnd(tempStart, tempEnd)) && isAfter(day, getStart(tempStart, tempEnd))
              let className = isToday(day) ? 'today mon-day' : 'mon-day'
              className += checkSame ? ' selected' : checkBetween ? ' select' : '';
              return <div className={className} key={day} onMouseOver={() => handleMouseOver(day)} onClick={() => handleClickDate(day)} > {dayNum}</div >
            })
          }
        </SwiperSlide>
      })
    }
  </Swiper >
};

export const WheelSwiper = (props) => {
  const { Days, setDates } = props
  const optionsObj = options(0)
  const [swiper, setSwiper] = useState({});

  const handleClick = (day) => {
    const index = Days.indexOf(day)
    swiper.slideTo(index, 500, setDates([day]))
  }

  return <Swiper {...optionsObj} onInit={(ev) => setSwiper(ev)}>
    {
      Days.map((day) => {
        const { checkDate, dayNum, dayStr } = getDateSwiper(day)
        const className = checkDate ? 'ch-date today' : 'ch-date'
        return (
          <SwiperSlide key={day} className={className} onClick={() => handleClick(day)}>
            <div className="date"> {dayNum} <span>{dayStr}</span> </div>
            <Dotes />
          </SwiperSlide>
        )
      })
    }
    < Controller />
  </Swiper >
};


