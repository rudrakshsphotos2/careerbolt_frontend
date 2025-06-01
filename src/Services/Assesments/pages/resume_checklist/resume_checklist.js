import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESUME_CHECK_LIST_DO_QUESTIONS as doQuestionArray, RESUME_CHECK_LIST_DONT_QUESTIONS as dontQuestionArray } from '../../constants/question_bank_constants.js';
import QuestionBlock from './components/question_block';
import './resume_checklist.css'
import { ASSESSMENT_LINKS } from '../../constants/configs_constanst.js';


const ResumeCheckList = () => {
  const navigate = useNavigate();
  const numQuestions = doQuestionArray.length;
  //also create for dont question array a length

  const initialResponses = Array(numQuestions).fill(0);
  const testResponse=Array(numQuestions).fill(1);
  const [responses, setResponses] = useState(initialResponses);
  const [dontresponses, setdontResponses] = useState(initialResponses);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [page,setPage] = useState(0);
  const textFordoTitle="The DOs for a Resume";
  const textFordontTitle="The DONTs for a Resume";

  const handleInputChange = (index, value,event) => {   
    event.preventDefault();
    event.stopPropagation();
    
    const newResponses = page===0? [...responses] : [...dontresponses];
    newResponses[index] = value;
    page===0?
    setResponses(newResponses):
    setdontResponses(newResponses);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateName = (name) => {
    return name.length > 4 && /^[a-zA-Z\s]+$/.test(name);
  };

  const setTestValues=(event)=>{
    event.preventDefault();
    page===0?setResponses([...testResponse]) : setdontResponses([...testResponse]); 
    setName("Thambi Annan"); 
    setEmail("ABC@gmail.com")
  }
  
  const checkResponsesForCompletion=(event)=>{
    event.preventDefault();
    event.stopPropagation();
    const newErrors = page===0? 
    responses.map((response, index) =>
       (response === -1 ? index : null)).filter(index => index !== null)
                              :
    dontresponses.map((response, index) =>
      (response === -1 ? index : null)).filter(index => index !== null)                          ;
    console.log(newErrors.length);
    if (newErrors.length > 0) {
      setErrors(newErrors);
      alert(`Please answer all the questions. Missing answers: ${newErrors.map(index => index + 1).join(', ')}`);
      
    } else {
      setErrors([]);
      setPage(1);
  }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("in handle submit func")
    if (!validateName(name)) {
        alert('Please provide your full name');
        return;
      }
  
      if (!validateEmail(email)) {
        alert('Please provide a valid email address.');
        return;
      }
    const newErrors = dontresponses.map((response, index) => (response === -1 ? index : null)).filter(index => index !== null);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      alert(`Please answer all the questions. Missing answers: ${newErrors.map(index => index + 1).join(', ')}`);
    } else {
      setErrors([]); 
      const dataBackend= {
        doQuestions: doQuestionArray,
        doresponses:responses,
        dontQuestions:dontQuestionArray,
        dontresponses:dontresponses
      }
      //Logic for sending results to results view page
      const doViewResults=[];
      const dontViewResults=[];
      responses.filter((value,index)=>{
        if(value===0){doViewResults.push(index);return true;}
        else return false;  });
      dontresponses.filter((value,index)=>{
          if(value===0){dontViewResults.push(index);return true;}
          else return false;  });
      let doFailedAnswers=[];
      let dontFailedAnswers=[];
      doFailedAnswers= doViewResults.map((value,index)=>doQuestionArray[value]);
      dontFailedAnswers= dontViewResults.map((value,index)=>dontQuestionArray[value]);
      const failedAnswers=doFailedAnswers.concat(dontFailedAnswers);
      
      //send data to backend
      fetch('https://da43hgd6qd.execute-api.ap-south-1.amazonaws.com/v1/Assessments/resumeCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBackend)
      })
      .then(response => response.json())
      .then(body => console.log('Success:', body)).then(navigate(ASSESSMENT_LINKS.RESUME_CHECK_RESULT, 
        { state: {
        doresults:doViewResults,
        dontresults:dontViewResults,
        failedAnswers: failedAnswers
        } }))
      .catch((error) => console.error('Error:', error));   
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className='ResumeCheckForm'>
        <header className='quiz-header'> Resume Checklist</header>
          <div>
              <label>
              Your Full Name:
              <input type="text" value={name} onChange={handleNameChange} required />
              </label>
          </div>
          <div>
              <label>
              Your Email:
              <input type="email" value={email} onChange={handleEmailChange} required />
              </label>
              <p><b> This checklist has been designed by industry experts from Silicon Valley and IIT instructors.</b></p>
              <b>If you have questions about resume checklist, connect with us on our
                <a className='Whatsapplink' href="https://chat.whatsapp.com/LnxJS6QHoeL7fHBjohR1N3"> whatsapp group</a></b>
              <br/>
              <br/>
          </div>
          <div>
            {
              page===0?
              (<QuestionBlock blockName="do_Block" 
                responses={responses} questionArray={doQuestionArray} 
                title={textFordoTitle} errors={errors} handleInputChange={handleInputChange}/>) :
                (<QuestionBlock blockName="dont_Block" 
                  responses={dontresponses} questionArray={dontQuestionArray} 
                  title={textFordontTitle} errors={errors} handleInputChange={handleInputChange}/>) 
            }
          </div>
      
          {//logic to show the page 1 where don't list is displayed. Submit only after both forms complete
            page===1?
            (<button type="submit" onSubmit={handleSubmit}>Submit</button>)
            :
            ( <button type="button" onClick={(event)=>checkResponsesForCompletion(event)}>Nextpage</button>)
          }
          <br/>
          {/* <button type="button" onClick={(event)=>setTestValues(event)}>Put test values</button> */}
      </form>
      </div>
  );
};

export default ResumeCheckList;
