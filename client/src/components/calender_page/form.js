
import { useState, useMemo } from 'react'
import { CalenderDays, Clock } from './datesComponents';
import { eachDayOfInterval, isSameMinute, addHours } from 'date-fns';

const Dates = ({ data }) => {
  return <>
    <div className='calender'>
      <div className="calender-container">
        <div className="calender-component">
          <CalenderDays data={data} />
        </div>
      </div>
    </div>
  </>
}

const TimeInputs = ({ tempDateRange, setTempDateRange, evTime, setEvTime }) => {
  const [sw, setSwitch] = useState(true)

  return <div className="input date-clock">
    <div className="date-container">
      <div className={`header ${sw ? 'calender-show' : 'clock-show'}`}>
        <button className='calender-btn' onClick={() => setSwitch(true)}>
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DateRangeIcon">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></svg>
        </button>
        <button className='clock-btn' onClick={() => setSwitch(false)}>
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TimeIcon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
        </button>
        <span></span>
      </div>
      <div className="content-components">
        {sw && <Dates
          data={{ tempDateRange, setTempDateRange, hidden: sw }}
        />
        }
        {!sw && <Clock evTime={evTime} setEvTime={setEvTime} />}
      </div>
    </div>
  </div >
}



export const Form = ({ showForm, setShowForm }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    color: '',
    urlName: '',
    urlLink: '',
    urls: [],
    notes: '',
    days: { start: new Date(), end: new Date() },
    time: { start: new Date(), end: addHours(new Date(), 1) },
  })

  const { title, description, color, urlLink, urlName, notes, time } = form
  const isDisabledForm = useMemo(() => !title || !color || isSameMinute(time.start, time.end), [title, color, time])
  const isDisabledUrl = useMemo(() => !urlLink || !urlName, [urlName, urlLink])
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const urlRemove = (index) => {
    const urls = [...form.urls]
    urls.splice(index, 1)
    setForm({ ...form, urls: [...urls] })
  }

  const handleKeyDown = (e) => {
    const value = e.target.value
    if (e.nativeEvent.inputType !== 'deleteContentBackward') {
      const notesDote = value.split('\n').map((note) => note.includes('•') ? note : '• ' + note).join('\n')
      setForm({ ...form, notes: notesDote })
    }
    else setForm({ ...form, notes: value })
  }

  const handleSubmit = () => {

    if (!isDisabledForm) {
      const data = { ...form }
      delete data.urlName
      delete data.urlLink
      const { start, end } = form.days
      data.days = eachDayOfInterval({ start, end });
      console.log('🚀 ~ data:', data)
    }

  }

  return <div className={`event-form ${showForm ? 'show' : ''}`}>
    <div className="card">
      <div className="cancel-form">
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
      <form action="POST" onSubmit={(e) => e.preventDefault()} className="card-form">
        <div className="input">
          <input type="text" placeholder='required' className="input-field" name="title" value={title} onChange={e => handleChange(e)} />
          <label className="input-label">Title</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" placeholder='optional' name="description" value={description} onChange={e => handleChange(e)} />
          <label className="input-label">Description</label>
        </div>
        <div className="colors">
          <label >Color</label>
          <div className="colors">
            {
              ['#E27AFB', '#17D2A0', '#0077FC', '#34A9DC', '#6658d3', '#5100B6', '#DDB372', '#E06C2A']
                .map((col) => <span style={{ backgroundColor: col }} key={col} className={col === color ? 'selected' : ''}
                  onClick={() => setForm({ ...form, color: col })}></span>)
            }

          </div>
        </div>
        <div className="input url">
          <div className={`button ${isDisabledUrl ? 'disabled' : ''}`}
            onClick={() => isDisabledUrl ? null
              : setForm({ ...form, urlLink: '', urlName: '', urls: [...form.urls, { name: urlName, link: urlLink }] })
            }>Add</div>
          <input type="text" className="input-field" placeholder='link' value={urlLink} name="urlLink" onChange={e => handleChange(e)} />
          <input type="text" className="input-field first-in" placeholder='name' value={urlName} name="urlName" onChange={e => handleChange(e)} />
          <label className="input-label">Url</label>
        </div>
        <div className="urls">
          {
            form.urls.map((url, i) => {
              return (
                <div key={`${i}${url.name}`}>
                  <a target={'_blank'} rel="noopener noreferrer" href={url.link}>{url.name}</a>
                  <i className="fa-solid fa-circle-xmark" onClick={() => urlRemove(i)}></i>
                </div>
              )
            })
          }
        </div>
        <div className="input text-area">
          <textarea placeholder='optional' name="notes"
            value={notes} onChange={e => handleKeyDown(e)}
          />
          <label className="input-label">Notes</label>
        </div>
        <TimeInputs
          tempDateRange={form.days}
          setTempDateRange={(obj) => setForm({ ...form, days: obj })}
          evTime={form.time}
          setEvTime={(obj) => setForm({ ...form, time: obj })}
        />
        <div className="action">
          <button type='submit' disabled={isDisabledForm} onClick={handleSubmit}
            className={`action-button ${isDisabledForm && 'disabled'}`}>Add</button>
        </div>
      </form>
    </div >
  </div >
}