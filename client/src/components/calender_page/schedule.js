
const Schedule = () => {
  return <div className="schedule">
    <div className="header">
      <div className="text-header">My Schedule</div>
      <div className="features-header-container">
        <div className="date-buttons">
          <div className="date">02 - 08 March</div>
          <div className="buttons">
            <div className="left"><i class="fa-solid fa-chevron-left"></i></div>
            <div className="right"><i class="fa-solid fa-chevron-right"></i></div>
          </div>
        </div>
        <div className="new-event">
          <div className="button"><i class="fa-solid fa-plus"></i> New Event</div>
        </div>
      </div>
    </div>
    <div className="table-dates">
      Date table
    </div>
  </div>
}

export default Schedule;
