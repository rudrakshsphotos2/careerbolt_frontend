import React, { useState } from 'react';
import './branch_selection_ug.css'
import { useNavigate } from 'react-router-dom';
import { BRANCH_SELECTION_UG_QUESTIONS as questions_array, BRANCH_SELECTION_UG_CONFIG } from '../../constants/question_bank_constants';
import { ASSESSMENT_LINKS } from '../../constants/configs_constanst';

const BranchSelectionUg = () => {
  const {CS,IT,ECE,EE,Mech,Prod,Chem,Bio,Aero,Civil} = BRANCH_SELECTION_UG_CONFIG;
  const navigate = useNavigate();
  const numQuestions = questions_array.length;
  const initialResponses = Array(numQuestions).fill(null);
  const [responses, setResponses] = useState(initialResponses);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleInputChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
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

  const setTestValues=()=>{setResponses([...CS]); setName("Thambi Annan"); setEmail("ABC@gmail.com")}
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateName(name)) {
        alert('Please provide your full name');
        return;
      }
  
      if (!validateEmail(email)) {
        alert('Please provide a valid email address.');
        return;
      }
    const newErrors = responses.map((response, index) => (response === null ? index : null)).filter(index => index !== null);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      alert(`Please answer all the questions. Missing answers: ${newErrors.map(index => index + 1).join(', ')}`);
    } else {
      setErrors([]);
      let data_to_be_sent= {Questions:questions_array,Answers:responses};
      //computes
      let CS_fit=CS.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let CS_rms= Math.sqrt(CS_fit.reduce((total,value)=>total+value)/(CS.length-1))

      let IT_fit=IT.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let IT_rms= Math.sqrt(IT_fit.reduce((total,value)=>total+value)/(IT.length-1))

      let ECE_fit=ECE.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let ECE_rms= Math.sqrt(ECE_fit.reduce((total,value)=>total+value)/(ECE.length-1))

      let EE_fit=EE.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let EE_rms= Math.sqrt(EE_fit.reduce((total,value)=>total+value)/(EE.length-1))

       let Mech_fit=Mech.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let Mech_rms= Math.sqrt(Mech_fit.reduce((total,value)=>total+value)/(Mech.length-1))

       let Prod_fit=Prod.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let Prod_rms= Math.sqrt(Prod_fit.reduce((total,value)=>total+value)/(Prod.length-1))

       let Chem_fit=Chem.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let Chem_rms= Math.sqrt(Chem_fit.reduce((total,value)=>total+value)/(Chem.length-1))

       let Bio_fit=Bio.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let Bio_rms= Math.sqrt(Bio_fit.reduce((total,value)=>total+value)/(Bio.length-1))

       let Aero_fit=Aero.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let Aero_rms= Math.sqrt(Aero_fit.reduce((total,value)=>total+value)/(Aero.length-1))

       let Civil_fit=Civil.map((number,index)=>{
            return (number-responses[index])*(number-responses[index])
      })
      let Civil_rms= Math.sqrt(Civil_fit.reduce((total,value)=>total+value)/(Civil.length-1))
      let computed_results= [ {name:"CS", value: CS_rms}, {name:"IT",value:IT_rms}, {name:"ECE", value:ECE_rms}, 
        {name:"EE",value:EE_rms}, {name:"Mech", value:Mech_rms}, {name:"Prod", value:Prod_rms}, 
        {name:"Chem", value:Chem_rms},{name:"Bio",value:Bio_rms},{name:"Aero", value:Aero_rms}, 
        {name:"Civil",value:Civil_rms}
      ]
      
      let ddb_data_to_post= {name:name, email:email, quiz_data: data_to_be_sent, results:computed_results

      }

      /*navigate('/assessments/branchSelection/result', { state: {
        results:computed_results
      } });*/
      let url=`https://da43hgd6qd.execute-api.ap-south-1.amazonaws.com/v1/Assessments/branchSelection`
      // Send responses to the external API
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ddb_data_to_post)
      })
      .then(response => response.json())
      .then(data => console.log('Success:'))
      .then(navigate(ASSESSMENT_LINKS.BRANCH_SELECTION_RESULT_UG, { state: {
        results:computed_results
      } }))
      .catch((error) => console.error('Error:', error));
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <header className='quiz-header'>
        <h2>Engineering Branch Selection Quiz</h2>
        </header>
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
            <p><b> This test has been designed by industry experts from Silicon Valley and IIT instructors.</b></p>
            <b>If you have questions about university or branch selection, connect with us on our <a className='Whatsapplink' href="https://chat.whatsapp.com/LnxJS6QHoeL7fHBjohR1N3">whatsapp group</a></b>
            <br/>
            <br/>
      </div>
      <div className='Question_block'>
        <hr></hr>
        <br></br>
        <h2><b>For the choices below choose a number between 1 and 10, where 1 is least likely and 10 is most likely </b></h2>
        {responses.map((response, index) => (
          <div key={index}>
            <label>
              Question {index + 1}: {questions_array[index]}
              <select
                value={response || ''}
                onChange={(e) => handleInputChange(index, Number(e.target.value))}
                style={{ borderColor: errors.includes(index) ? 'red' : 'black' }}
              >
                <option value="" disabled>Select a number</option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
      <br/>      
    </form>
  );
};

export default BranchSelectionUg;
