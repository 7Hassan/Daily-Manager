

import { Helmet } from "react-helmet";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';


export const Title = ({ title }) => <Helmet><title>{title}</title></Helmet>

export const changeClass = (varClass, setVar, initClass, nextClass) => varClass === initClass ? setVar(nextClass) : setVar(initClass)

export class getDate {
  monthDays = (formatting, month, year) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));

    const monthDays = eachDayOfInterval({ start, end });
    return monthDays.map((date) => format(date, formatting))
  }

  Date = (formatting, month, year) => {
    const start = startOfMonth(new Date(year, month));
    return format(start, formatting)
  }
}

export const Logo = () => {
  return <div className="logo-design img">
    <span></span>
    <span></span>
    <span></span>
  </div>
}





