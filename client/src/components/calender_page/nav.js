
import { useState } from "react";
import NavEvents from "./navEvents";
import NavHeader from "./navHeader";


const CalenderNav = () => {
  const [classSlider, setClassSlider] = useState('slider slide-up')
  const [classCalender, setClassCalender] = useState('schedule-nav hidden')
  const showNav = () => {
    classSlider.includes('slide-up') ? setClassSlider('slider') : setClassSlider('slider slide-up')
    classCalender.includes('hidden') ? setClassCalender('schedule-nav') : setClassCalender('schedule-nav hidden')
  }

  return <div className={classCalender} >
    <div className={classSlider} onClick={() => showNav()} >
      <div className="slider-container">
        <i className="fa-solid fa-chevron-left"></i>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    </div>
    <div className="container">
      <NavHeader />
      <NavEvents />
    </div>
  </div >
}

export default CalenderNav;

