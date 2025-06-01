import React, { useState } from "react";
import "../../resume_builder.css";
import Button from "../../components/Button";

function Objective({ step, setStep }) {
  const [objective, setObjective] = useState(() => JSON.parse(localStorage.getItem("objective"))?.description || "");
  const [objectiveError, setObjectiveError] =useState("");


 

  const saveToStorage = (key, value) => {
    const objective = JSON.parse(localStorage.getItem("objective")) || {};
    objective[key] = value;
    localStorage.setItem("objective", JSON.stringify(objective));
  };

const handlePrev=()=>{
    setStep(1);
}
  



  const handleInputChange = (setter, key) => (e) => {
    setter(e.target.value);
    saveToStorage(key, e.target.value);
  };

  const handleNext = () => {
    // if (validateObjective() ) {
      setStep(3);
    // }
  };
  

  return (
    <div className="main-obj">
      <form className="obj-form">
      <div className="form-control">
          <label htmlFor="objective">Objective</label>
          <textarea
            name="objective"
            id="objective"
            placeholder="e.g. A passionate developer seeking opportunities..."
            value={objective}
            onChange={handleInputChange(setObjective, "description")}
            rows={15}
            cols={120}
            
          />
          <div className="error">{objectiveError}</div>
        </div>

        
      </form>

      <div className="obj-buttons">
        <Button className='btn-secondary' onClick={handlePrev}>Go Back</Button>
        <Button className="btn-primary" onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
}

export default Objective;
