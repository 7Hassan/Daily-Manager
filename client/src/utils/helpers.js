

import { Helmet } from "react-helmet";
import { startOfYear, startOfMonth, endOfMonth, startOfWeek, add, eachDayOfInterval, eachMonthOfInterval, isAfter, differenceInDays, format } from 'date-fns';


export const Title = ({ title }) => <Helmet><title>{title}</title></Helmet>

export const changeClass = (varClass, setVar, initClass, nextClass) => varClass === initClass ? setVar(nextClass) : setVar(initClass)

export class GetDate {
  constructor(start, end) {
    this.start = getStart(start, end);
    this.end = getEnd(start, end);
    this.date = this.start;
  }


  days = () => eachDayOfInterval({ start: this.start, end: this.end })

  // weekDays = () => {
  //   const start = startOfWeek(this.date);
  //   const end = add(start, { days: 6 });
  //   const Days = eachDayOfInterval({ start, end })
  //   return Days
  // }

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

  // Day = () => add(this.date, { days: this.scale });
  // Week = () => add(this.date, { weeks: this.scale });
  // Month = () => add(this.date, { months: this.scale });
  // Year = () => add(this.date, { years: this.scale });
}

export const timeToPx = (time) => {
  const hour = format(time, 'k'), min = format(time, 'm')
  return hour * 100 + ((min * 10) / 6) //? convert time to px scale
}




export const getStart = (start, end) => isAfter(start, end) ? end : start;
export const getEnd = (start, end) => isAfter(start, end) ? start : end;


