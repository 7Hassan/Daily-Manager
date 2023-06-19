

import { Helmet } from "react-helmet";
import { startOfYear, startOfMonth, startOfWeek, add, endOfMonth, eachDayOfInterval, eachMonthOfInterval, format } from 'date-fns';


export const Title = ({ title }) => <Helmet><title>{title}</title></Helmet>

export const changeClass = (varClass, setVar, initClass, nextClass) => varClass === initClass ? setVar(nextClass) : setVar(initClass)

export class GetDate {
  monDays = (date, formatting) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const Days = eachDayOfInterval({ start, end });
    return Days.map((day) => format(day, formatting))
  }
  weekDays = (date, formatting) => {
    const start = startOfWeek(date);
    const end = add(start, { days: 6 });
    const Days = eachDayOfInterval({ start, end })
    return Days.map((day) => format(day, formatting))
  }

  yearMons = (date, formatting) => {
    const start = startOfYear(date);
    const end = add(start, { months: 11 });
    const Months = eachMonthOfInterval({ start, end })
    return Months.map((month) => format(month, 'MM,MMM'))
  }

  Date = (formatting, month, year) => {
    const start = startOfMonth(new Date(year, month));
    return format(start, formatting)
  }
}


export const scaleDates = (date, scale, formatting) => {
  const getDate = new GetDate()
  switch (scale) {
    case 'Day':
      return [format(date, formatting)]
    case 'Week':
      return getDate.weekDays(date, formatting)
    case 'Month':
      return getDate.monDays(date, formatting)
    case 'Year':
      return getDate.yearMons(date, formatting)
    default:
      return [format(date, formatting)]
  }
}

export const Logo = () => {
  return <div className="logo-design img">
    <span></span>
    <span></span>
    <span></span>
  </div>
}





