import { useState } from 'react';
import './resume_builder.css';
import { data } from './data';
// import { plans } from './plans';
// import { PickAddOnsList } from './PickAddOnsList';
import Container from './components/Container';
import Nav from './components/Nav';
import Step from './components/Step';
import Button from './components/Button';
import Header from './components/Header';
import Details from './pages/details/details';
import Objective from './pages/objective/objective';
import Education from './pages/education/education';
import WorkExperiences from './pages/work_experiences/work_experiences';
import OtherExperiences from './pages/other_experiences/other_experiences';
import SkillsAndCertificates from './pages/skills/skills';


// App component
export default function ResumeBuilderMain() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('Arcade')
  const [isChecked, setIsChecked] = useState(false);
  // const [AddOnsList, setAddOnsList] = useState(PickAddOnsList)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleNext = (e) => {

    if (step === 1) {
      if (nameError || emailError || phoneNumberError) {
        // Display an error message or perform other actions for failed validation
        alert("Please fill in all fields.");
        return; // Prevent moving to the next step
      }
    }

    if (step === 2) {
      if (!selectedPlan) {
        // Display an error message or perform other actions for failed validation
        alert("Please select a plan before proceeding.");
        return; // Prevent moving to the next step
      }
    }
    e.preventDefault();
    if (step < 5) setStep((s) => s + 1);
  }

  function handlePrev(e) {
    e.preventDefault();
    if (step > 1) setStep((s) => s - 1);
  }

  function toggleSelected(name) {
    // setAddOnsList(AddOns => AddOns.map(AddOns => AddOns.name === name ? { ...AddOns, selected: !AddOns.selected } : AddOns))

  }

  return(
    <div className='main-js'>

    <Container>
    <Nav>
      {data.map(item => (
        <Step curstep={item.step} step={step} key={item.step} />
      ))}
    </Nav>

    <main>
      {data.map(item => item.step === step && <Header title={item.title} info={item.info} key={item.step} />)}

      <div className='step-in' >
        <div className='main-content'>
          {step === 1 && <Details step={step} setStep={setStep} />}
          {step === 2 && <Objective step={step} setStep={setStep} />}
          {step === 3 && <Education step={step} setStep={setStep} />}
          {step === 4 && <WorkExperiences step={step} setStep={setStep} />}
          {step === 5 && <OtherExperiences step={step} setStep={setStep} />}
          {step === 6 && <SkillsAndCertificates step={step} setStep={setStep} />}

          {/* {step === 2 && <SelectYourPlan
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            plans={plans}
            />}
            
            {step === 3 && <PickAddOns
            AddOnsList={AddOnsList}
            setAddOnsList={setAddOnsList}
            PickAddOnsList={PickAddOnsList}
            toggleSelected={toggleSelected}
            isChecked={isChecked}
            />}
            
            {step === 4 && <Summary
            plans={plans}
            selectedPlan={selectedPlan}
            isChecked={isChecked}
            AddOnsList={AddOnsList}
            />}
            {step === 5 && <ThankYou />} */}
        </div>

        {/* <div className="buttons">
          {(step > 1 && step < 5) && <Button className='btn-secondary' onClick={handlePrev}>Go Back</Button>
          }
          {(step < 4) && <Button className='btn-primary' onClick={handleNext}>Next Step</Button>}
          {step === 4 && <Button className='btn-confirm' onClick={handleNext}>Confirm</Button>}
          </div> */}

      </div>
    </main>
  </Container>
          </div>
)
}





