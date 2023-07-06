



export const Logo = ({ spin = false }) => {
  return <div className={spin ? "logo-design spin" : "logo-design"}>
    <span></span>
    <span></span>
    <span></span>
  </div>
}

export const Dotes = () => {
  return <div className="dotes" style={{ display: 'none' }}>
    <span></span>
    <span></span>
    <span></span>
  </div >
}