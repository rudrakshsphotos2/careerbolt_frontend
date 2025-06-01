export default function Step({ curstep, step }) {
  return <div className='step'>

    <div className={`step-num ${step === curstep ? 'active' : ''}`}>
      {curstep}
    </div>

    <div className="step-info">
      <p>STEP {curstep}</p>
      <h4>{curstep === 1 && 'YOUR INFO'}</h4>
      <h4>{curstep === 2 && 'Objective'}</h4>
      <h4>{curstep === 3 && 'Education'}</h4>
      <h4>{curstep === 4 && 'Your Experience'}</h4>
      <h4>{curstep === 5 && 'Other Experience'}</h4>
      <h4>{curstep === 6 && 'Skills'}</h4>
    </div>

  </div >
}