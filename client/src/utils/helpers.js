

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  startOfYear, startOfMonth, endOfMonth, add,
  eachDayOfInterval, eachMonthOfInterval, isAfter,
  format, differenceInMinutes, differenceInHours, minutesToHours, startOfDay, endOfDay, eachHourOfInterval
} from 'date-fns';


export const Title = ({ title }) => <Helmet><title>{title}</title></Helmet>

export const changeClass = (varClass, setVar, initClass, nextClass) => varClass === initClass ? setVar(nextClass) : setVar(initClass)

export class GetDate {
  constructor(start, end) {
    this.start = getStart(start, end);
    this.end = getEnd(start, end);
    this.date = this.start;
  }


  days = () => eachDayOfInterval({ start: this.start, end: this.end })

  dayHours = () => {
    const start = startOfDay(this.date);
    const end = endOfDay(this.date);
    const hours = eachHourOfInterval({ start, end })
    return hours
  }

  monDays = () => {
    const start = startOfMonth(this.date);
    const end = endOfMonth(this.date);
    const Days = eachDayOfInterval({ start, end });
    return Days
  }

  yearMons = () => {
    const start = startOfYear(this.date);
    const end = add(start, { months: 11 });
    const Months = eachMonthOfInterval({ start, end })
    return Months
  }
}

export class NextDate {
  constructor(date, direction) {
    this.date = date;
    this.direction = direction;
    this.direction = direction;
  }
}

export const timeToMins = (time) => {
  const hour = format(time, 'H'), min = format(time, 'm')
  return +hour * 60 + +min
}





export const getStart = (start, end) => isAfter(start, end) ? end : start;
export const getEnd = (start, end) => isAfter(start, end) ? start : end;



export const minsToTime = (mins) => {
  const hours = minutesToHours(mins)
  const minutes = mins - hours * 60
  return `${hours}h  ${minutes}m`
}



export const useTime = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const sc = format(time, 's')
    const waiting = (60 - sc) * 1000
    const interval = setInterval(() => setTime(new Date()), waiting)
    return () => clearInterval(interval)
  }, [time])
  return time
}