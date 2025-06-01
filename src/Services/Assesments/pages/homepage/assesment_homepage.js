import React from 'react';
import { Link } from 'react-router-dom';
import './assesment_homepage.css';
import {ASSESSMENT_CONFIG} from '../../constants/configs_constanst.js';

const AssessmentsHome = () => {
  return (
    <div className="assessments">
      {ASSESSMENT_CONFIG.map((assessment) => (
        <div key={assessment.id} className="assessment-card">
          <img src={assessment.image} alt={assessment.title} />
          <h3>{assessment.title}</h3>
          <Link to={assessment.link}>Take Assessment</Link>
        </div>
      ))}
    </div>
  );
};

export default AssessmentsHome;
