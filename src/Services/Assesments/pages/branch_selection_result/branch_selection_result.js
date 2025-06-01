import React from 'react'
import { useLocation } from 'react-router-dom';
import './branch_selection_result.css'

function BranchResults() {
    const location = useLocation();
  const { results } = location.state || {};
  const Message_display={
    CS: "Computer Science and Engineering",
    IT: "Information and Technology",
    ECE: "Electronics and Communication Engineering",
    EE: "Electrical and Electronics Engineering",
    Mech: "Mechanical Engineering",
    Prod: "Production and Industrial Engineering",
    Chem: "Chemical Engineering or Materials Science and Engineering",
    Bio: "Biotechnology or BioMedical Engineering",
    Aero: "Aero Space and Engineering",
    Civil: "Civil and Environmental Engineering"
  }
  //Array_results=Array(results);
  results.sort((a,b)=>{return a.value-b.value}) 
  console.log(results)
  return (
    <div className="results">
    <header className='quiz-header'>
      <h2>Engineering Branch Selection Quiz</h2>
    </header>
    <h2>Based on your response, the following are the results:</h2>
    <h2>Top 3 branches that closely match your interest:</h2>
    <div className="top-results">
      <ol>
        <li>{Message_display[results[0].name]}</li>
        <li>{Message_display[results[1].name]}</li>
        <li>{Message_display[results[2].name]}</li>
      </ol>
    </div>
    <h2>Bottom 3 branches that appear to not match your interest:</h2>
    <div className="bottom-results">
      <ol>
        <li>{Message_display[results[9].name]}</li>
        <li>{Message_display[results[8].name]}</li>
        <li>{Message_display[results[7].name]}</li>
      </ol>
    </div>
    <b>If you have questions about university or branch selection, connect with us on our <a className='Whatsapplink' href="https://chat.whatsapp.com/LnxJS6QHoeL7fHBjohR1N3">whatsapp group</a></b>

  </div>
  
  )
}

export default BranchResults