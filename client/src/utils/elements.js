



export const Logo = ({ spin = false }) => {
  return <div className={spin ? "logo-design spin" : "logo-design"}>
    <span></span>
    <span></span>
    <span></span>
  </div>
}

export const Dotes = ({ evs }) => {
  const counter = evs.slice(0, 2)
  return <div className="dotes" >
    {
      counter.map((ev) => <span key={ev.id} style={{ backgroundColor: ev.color }}></span>)
    }

    {evs.length === 3 && <span key={evs[2].id} style={{ backgroundColor: evs[2].color }}></span>}
    {evs.length > 3 && <i className="fa-solid fa-chevron-up"></i>}
  </div >
}