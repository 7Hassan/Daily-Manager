

import { Helmet } from "react-helmet";
import { startOfYear, endOfYear, startOfMonth, endOfMonth, startOfWeek, add, eachDayOfInterval, eachMonthOfInterval, format } from 'date-fns';


export const Title = ({ title }) => <Helmet><title>{title}</title></Helmet>

export const changeClass = (varClass, setVar, initClass, nextClass) => varClass === initClass ? setVar(nextClass) : setVar(initClass)

export class GetDate {
  constructor(date) {
    this.date = date;
  }

  weekDays = () => {
    const start = startOfWeek(this.date);
    const end = add(start, { days: 6 });
    const Days = eachDayOfInterval({ start, end })
    return Days
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
    this.scale = `${direction}1`;
  }

  Day = () => add(this.date, { days: this.scale });
  Week = () => add(this.date, { weeks: this.scale });
  Month = () => add(this.date, { months: this.scale });
  Year = () => add(this.date, { years: this.scale });
}


export const Logo = () => {
  return <div className="logo-design img">
    <span></span>
    <span></span>
    <span></span>
  </div>
}





