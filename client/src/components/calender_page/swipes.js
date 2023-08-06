
import { Dotes } from '../../utils/elements';
import { format, isToday, isSameDay, isBefore, isAfter, differenceInMinutes, minutesToHours } from 'date-fns';
import { GetDate, getStart, getEnd, timeToMins, minsToTime, useTime } from '../../utils/helpers'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCalender } from '../../App';


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



export const MonsSwiper = ({ data }) => {
  const { hidden, tempDateRange, setTempDateRange, setCalenderDate } = data;
  const { start, end } = tempDateRange
  const [status, setStatus] = useState('start')
  const { yearMons } = new GetDate(new Date())
  const months = yearMons()
  const optionsObj = options((format(start, 'M') - 1))
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
  const { calender } = useCalender()


  const handleMouseOver = (day) => status === 'end' &&
    setTempDateRange({ ...tempDateRange, end: day })

  const handleMouseLeave = () => status === 'end' && window.innerWidth > 1050 &&
    setTempDateRange({ ...tempDateRange, end: start })

  const handleClickDate = (day) => {
    setTempDateRange({ start: getStart(start, day), end: getEnd(start, day) })
    if (status !== 'start') return setStatus('start')
    setTempDateRange({ start: day, end: day })
    setStatus('end')
  }
  const monthChange = (swiper) => {
    const index = swiper.activeIndex;
    const month = months[index]
    setCalenderDate(month)
  };
  useEffect(() => setStatus('start'), [hidden])
  return <Swiper {...optionsObj} onSlideChange={monthChange}>

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
              const dayEvents = calender.events.filter((ev) => isSameDay(ev.day, day))[0]
              const dayNum = format(day, 'dd')
              const checkSame = isSameDay(day, start) || isSameDay(day, end)
              const checkBetween = isBefore(day, getEnd(start, end)) && isAfter(day, getStart(start, end))
              let className = isToday(day) ? 'today mon-day' : 'mon-day'
              className += checkSame ? ' selected' : checkBetween ? ' select' : '';
              return <div className={className} key={day} onMouseOver={() => handleMouseOver(day)}
                onClick={() => handleClickDate(day)} >
                {dayNum}
                {dayEvents && <Dotes evs={dayEvents.evs} />}
              </div >
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
  const { calender } = useCalender()
  const handleClick = (day) => swiper.slideTo(Days.indexOf(day), 500, setDates([day]))
  const getDateSwiper = (date) => {
    const checkDate = isToday(date)
    const dayNum = format(date, 'dd')
    const dayStr = format(date, 'iii')
    return { checkDate, dayNum, dayStr }
  };

  return <div className="wheel-dates">
    <div className="inner-slider">
      <Swiper {...optionsObj} onInit={(ev) => setSwiper(ev)}>
        {
          Days.map((day) => {
            const dayEvents = calender.events.filter((ev) => isSameDay(ev.day, day))[0]
            const { checkDate, dayNum, dayStr } = getDateSwiper(day)
            const className = checkDate ? 'ch-date today' : 'ch-date'
            return (
              <SwiperSlide key={day} className={className} onClick={() => handleClick(day)}>
                <div className="date"> {dayNum} <span>{dayStr}</span> </div>
                {dayEvents && <Dotes evs={dayEvents.evs} />}
              </SwiperSlide>
            )
          })
        }
      </Swiper >
    </div>
  </div >
};

const PopEvent = ({ data }) => {
  const { show, start, end, title, description,
    notes, urls, color, counter, widthBar, fullTime, bottom = false } = data

  return <div style={{ borderColor: color }}
    className={`event-pop ${show ? 'show' : ''}  ${bottom ? 'bottom' : ''}`}>
    <div className="event-container" onClick={e => e.stopPropagation()}>
      <div className="time">
        <div className="start">{format(start, 'hh:mm aa')}</div>
        <div className="remaining">{format(end, 'hh:mm aa')}</div>
      </div>
      <div className="inf">
        <div className="title">{title}</div>
        <div className="disc">{description}</div>
        <div className="disc notes">{notes}</div>
        <div className="urls">
          {urls.map((url, i) => {
            return <div key={`${i}${url.name}`}>
              <a target={'_blank'}
                rel="noopener noreferrer" href={url.link}>{url.name}</a>
            </div>
          })}
        </div>
      </div>
    </div>
    {fullTime && <div className="event-bar">
      <div className="counter">{minsToTime(counter)}</div>
      <div className="ev-bar">
        <span className="line-bar" style={{ width: `${widthBar}%` }}></span>
      </div>
      <div className="full-time">{minsToTime(fullTime)}</div>
    </div>
    }
  </div >
}

const TodayEvent = ({ event, top, index, activeIndex }) => {
  const time = useTime()
  const check = top !== null
  const { start, end } = event.time
  const { title, description, notes, urls, color } = event
  const [popEvent, setPopEvent] = useState(false);

  const startInMins = timeToMins(start)
  const endInMins = timeToMins(end)
  const fullTime = differenceInMinutes(end, start)
  const remaining = differenceInMinutes(start, time)
  const marginTop = startInMins - top
  const height = check ? endInMins - startInMins : 100
  const timeEvent = remaining > 0 ? remaining : 0
  const percentage = 100 - ((1440 - timeEvent) * 100 / 1440)
  const counter = remaining > 0 ? 0 : (time > start && time < end) ? -remaining : fullTime
  const widthBar = 100 - ((fullTime - counter) * 100 / fullTime)
  useEffect(() => { if (activeIndex !== index) setPopEvent(false) }, [activeIndex, index])

  return <div className="event-dev event-st"
    style={{ marginTop, backgroundColor: `${color}`, height }}
    onClick={() => check ? setPopEvent(!popEvent) : null} >
    {check && <PopEvent data={{
      show: popEvent, start, end, title, description,
      notes, urls, color, counter, widthBar, fullTime, bottom: startInMins < 320
    }} />
    }
    <div className="event-container">
      {height > 30 &&
        <div className="time">
          <div className="start">{format(start, 'hh:mm aa')}</div>
          {check && <div className="remaining">{minsToTime(timeEvent)} </div>}

          {
            !check && <div className="time-remaining">
              <CircularProgressbarWithChildren value={percentage}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 0.5,
                  pathColor: 'lime',
                  trailColor: 'white',
                })}
              ><span className='per-remaining'>{minsToTime(timeEvent)}</span>
              </CircularProgressbarWithChildren>
            </div>
          }
        </div>
      }
      {height > 80 &&
        <div className="inf">
          <div className="title">{title}</div>
          {height > 100 && <div className="disc">{description}</div>}
          {height > 140 && <div className="disc notes">{notes}</div>}
        </div>
      }
    </div>

    {
      height > 50 &&
      <div className="event-bar">
        <div className="counter">{minsToTime(counter)}</div>
        <div className="ev-bar">
          <span className="line-bar" style={{ width: `${widthBar}%` }}></span>
        </div>
        <div className="full-time">{minsToTime(fullTime)}</div>
      </div>
    }
  </div >
}

const Event = ({ event, top, index, activeIndex }) => {
  const { start, end } = event.time
  const { title, description, notes, urls, color } = event
  const [popEvent, setPopEvent] = useState(false);
  const startInMins = timeToMins(start)
  const endInMins = timeToMins(end)
  const marginTop = startInMins - top
  const height = endInMins - startInMins
  useEffect(() => { if (activeIndex !== index) setPopEvent(false) }, [activeIndex, index])

  return <div className="event-dev event-st"
    style={{ marginTop, backgroundColor: `${color}`, height }}
    onClick={() => setPopEvent(!popEvent)} >
    <PopEvent data={{
      show: popEvent, start, end, title, description,
      notes, urls, color, bottom: startInMins < 320
    }} />

    <div className="event-container">
      {height > 30 &&
        <div className="time">
          <div className="start">{format(start, 'hh:mm aa')}</div>
          <div className="remaining">{format(end, 'hh:mm aa')} </div>
        </div>
      }
      {height > 50 &&
        <div className="inf">
          <div className="title">{title}</div>
          {height > 100 && <div className="disc">{description}</div>}
          {height > 140 && <div className="disc notes">{notes}</div>}
        </div>
      }
    </div>
  </div >
}

const wrapComponent = Component => {
  return (events, swiper, top, active) => {
    return events.map((event, i) => {
      return <SwiperSlide key={event.id} onClick={() => swiper.slideTo(i, 500)} >
        <Component event={event} top={top} index={i} activeIndex={active} />
      </SwiperSlide>
    })
  }
}

export const EventSwipes = ({ events, day = null, top = null }) => {
  events.sort((a, b) => a.time.start - b.time.start);
  const [swiper, setSwiper] = useState({});
  const [active, setActive] = useState(0)
  const wrapEvents = !day || (day && isToday(day)) ? wrapComponent(TodayEvent) : wrapComponent(Event)
  const check = top !== null
  const optionsObj = {
    ...options(0), pagination: { clickable: true }, spaceBetween: 10, breakpoints: {
      900: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: check ? 3 : 2,
      },
      1300: {
        slidesPerView: check ? 4 : 3,
      },
    }, coverflowEffect: {
      rotate: 0,
      stretch: -5,
      depth: 20,
      modifier: 10,
    },
  }

  return <Swiper {...optionsObj} style={{ top }}
    onInit={(ev) => { setSwiper(ev); ev.slideTo(active, 500) }}
    onSlideChange={(swiper) => setActive(swiper.activeIndex)}>
    {wrapEvents(events, swiper, top, active)}
  </Swiper >
};



