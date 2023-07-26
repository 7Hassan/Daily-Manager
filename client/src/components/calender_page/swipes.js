
import { Dotes } from '../../utils/elements';
import { format, isToday, isSameDay, isBefore, isAfter } from 'date-fns';
import { GetDate, getStart, getEnd, timeToMins, differenceInTime, useTime } from '../../utils/helpers'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const options = (start = 0) => {
  return {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: false,
    slidesPerView: 'auto',
    initialSlide: start,
    coverflowEffect: {
      rotate: 0,
      stretch: -5,
      depth: 10,
      modifier: 20,
    },
    navigation: {},
    modules: [EffectCoverflow, Pagination, Navigation, A11y],
    className: 'swiper_container container-wheel',
  }
}


const getDateSwiper = (date) => {
  const checkDate = isToday(date)
  const dayNum = format(date, 'dd')
  const dayStr = format(date, 'iii')
  return { checkDate, dayNum, dayStr }
};

export const MonSwiper = ({ data }) => {
  const { hideCalender, weekDays, tempDateRange, setTempDateRange, setCalenderDate } = data;
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
  useEffect(() => setStatus('start'), [hideCalender])

  return <Swiper {...optionsObj}

    onSlideChange={monthChange}>
    {/* < div className="slider-controler" >
      <div className="swiper-button-prev slider-arrow" >
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      <div className="swiper-button-next slider-arrow"  >
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </div>
    </div > */}
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

export const WheelSwiper = ({ Days, setDates }) => {
  const optionsObj = options(0)
  const [swiper, setSwiper] = useState({});
  const handleClick = (day) => swiper.slideTo(Days.indexOf(day), 500, setDates([day]))

  return <div className="wheel-dates">
    <div className="inner-slider">
      <Swiper {...optionsObj} onInit={(ev) => setSwiper(ev)}>
        {
          Days.map((day) => {
            const { checkDate, dayNum, dayStr } = getDateSwiper(day)
            const className = checkDate ? 'ch-date today' : 'ch-date'
            return (
              <SwiperSlide key={day} className={className} onClick={() => handleClick(day)}>
                <div className="date"> {dayNum} <span>{dayStr}</span> </div>
                {/* <Dotes /> */}
              </SwiperSlide>
            )
          })
        }
      </Swiper >
    </div>
  </div >
};

const Event = ({ event, top }) => {
  const time = useTime()
  const { start, end } = event.time
  const marginTop = top ? (timeToMins(start) - top) : 0
  const height = top ? (timeToMins(end) - timeToMins(start)) : 100
  const remaining = differenceInTime(start, time)
  const timeEvent = isBefore(time, start) ? remaining : { hours: 0, minutes: 0 }
  const fullTime = differenceInTime(start, end)
  const percentageEvent = (100 - ((end - time) / (end - start)) * 100)
  const widthBar = percentageEvent < 0 ? 0 : percentageEvent > 100 ? 100 : percentageEvent
  const startInMins = timeToMins(start)
  const diffPercent = ((startInMins - timeToMins(time)) / startInMins) * 100
  const percentage = diffPercent < 0 ? 0 : diffPercent > 100 ? 100 : diffPercent
  const counter = time > start ? { ...remaining, minutes: remaining.minutes + 1 } : time > end ? fullTime : { hours: 0, minutes: 0 }
  const handleClickEvent = () => { }


  return <div className="event-dev event-st"
    style={{ marginTop, backgroundColor: `${event.color}`, height }}
    onClick={() => handleClickEvent()}>
    <div className="event-container">
      {height > 30 &&
        <div className="time">
          <div className="start">{format(start, 'hh:mm aa')}</div>
          {top && <div className="remaining">{timeEvent.hours}h {timeEvent.minutes}m</div>}

          {
            !top && <div className="time-remaining">
              <CircularProgressbarWithChildren value={percentage}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 0.5,
                  pathColor: 'lime',
                  trailColor: 'white',
                })}
              ><span className='per-remaining'>{`${timeEvent.hours}:${timeEvent.minutes}`}</span>
              </CircularProgressbarWithChildren>
            </div>
          }
        </div>
      }
      {height > 80 &&
        <div className="inf">
          <div className="title">{event.title}</div>
          {height > 100 && <div className="disc">{event.description}</div>}
          {height > 140 && <div className="disc notes">{event.notes}</div>}
          {height > 170 && <div className="urls">
            {event.urls.map((url, i) => {
              return <div key={`${i}${url.name}`}>
                <a target={'_blank'} style={{ color: `${event.color}` }}
                  rel="noopener noreferrer" href={url.link}>{url.name}</a>
              </div>
            })}
          </div>}
        </div>
      }
    </div>

    {
      height > 50 &&
      <div className="event-bar">
        <div className="counter">{counter.hours}h {counter.minutes}m</div>
        <div className="ev-bar">
          <span className="line-bar" style={{ width: `${widthBar}%` }}></span>
        </div>
        <div className="full-time">{fullTime.hours}h {fullTime.minutes}m</div>
      </div>
    }
  </div >
}

export const EventSwipes = ({ events, top = null }) => {
  events.sort((a, b) => a.time.start - b.time.start);

  const optionsObj = {
    ...options(0), pagination: { clickable: true }, spaceBetween: 10, breakpoints: {
      900: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: top ? 3 : 2,
      },
      1300: {
        slidesPerView: top ? 4 : 3,
      },
    }, coverflowEffect: {
      rotate: 0,
      stretch: -5,
      depth: top ? 20 : 50,
      modifier: 10,
    },
  }
  const [swiper, setSwiper] = useState({});


  const handleClick = (i) => {
    swiper.slideTo(i, 500)
    if (top) {

    }
  }
  return <Swiper {...optionsObj} style={{ top }} onInit={(ev) => setSwiper(ev)}>
    {
      events.map((event, i) => {
        return <SwiperSlide key={event.title + i} onClick={() => handleClick(i)} >
          <Event event={event} top={top} />
        </SwiperSlide>
      })
    }
  </Swiper >
};



