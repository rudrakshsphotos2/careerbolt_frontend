import React from 'react'
import { useLocation } from 'react-router-dom';
import './resume_check_results.css'

function ResumeCheckResults() {
    const location = useLocation();
  const { doresults,dontresults,failedAnswers } = location.state || {};
  
  const success= (doresults.length <10) & (dontresults.length<2)?true:false;
  
  const message= success?"You are on the right track. If there are items in table below, you might want to fix them next":
  "You should fix your resume. Make revisions fixing most of the items listed below";
  return (
    <div className='container-resume-results'>
      <h3 className='resume-message'>{message}</h3>
      <table className='resume-results-table' border="1">
        <thead>
          <tr>
            <th>Index</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {failedAnswers.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeCheckResults