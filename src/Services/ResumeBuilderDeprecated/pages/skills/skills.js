import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compileLatex} from "../../../../redux/resumeSlice" // Import Redux action
import Button from "../../components/Button";
import "./skills.css";

function SkillsAndCertificates({ step, setStep }) {
  const dispatch = useDispatch();
  const { loading, pdfUrl, error } = useSelector((state) => state.resume); // Get Redux state
  const [pdfLink, setPdfLink] = useState(null); // Store PDF link locally

  useEffect(() => {
    if (pdfUrl) {
      setPdfLink(pdfUrl);
    }
  }, [pdfUrl]);

  const [skills, setSkills] = useState(() => {
    const savedData = localStorage.getItem("skills_and_certificates");
    return savedData
      ? JSON.parse(savedData)
      : {
          items: [""],
        };
  });

  useEffect(() => {
    localStorage.setItem("skills_and_certificates", JSON.stringify(skills));
  }, [skills]);

  const handleSkillDescriptionChange = (descIndex, value) => {
    const updatedSkills = { ...skills };
    updatedSkills.items[descIndex] = value;
    setSkills(updatedSkills);
  };

  const addSkillDescriptionPoint = () => {
    const updatedSkills = { ...skills };
    updatedSkills.items.push("");
    setSkills(updatedSkills);
  };

  const removeSkillDescriptionPoint = (descIndex) => {
    const updatedSkills = { ...skills };
    if (updatedSkills.items.length > 1) {
      updatedSkills.items.splice(descIndex, 1);
      setSkills(updatedSkills);
    }
  };

  const handleNext = () => {
    setStep(6);
    dispatch(compileLatex()); // Dispatch Redux function when moving to the next step
  };

  const handlePrev = () => {
    setStep(5);
  };

  return (
    <div className="skills-main">
      <div className="form-control skill">
        <label>Skills and Certificates</label>
        {skills.items.map((desc, descIndex) => (
          <div key={descIndex} className="description-item">
            <div className="ta-div">
              <textarea
                value={desc}
                cols={100}
                rows={2}
                onChange={(e) => handleSkillDescriptionChange(descIndex, e.target.value)}
              />
            </div>
            {skills.items.length > 1 && (
              <Button type="button" onClick={() => removeSkillDescriptionPoint(descIndex)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={addSkillDescriptionPoint}>
          Add Skill/Certificate
        </Button>
      </div>

      {error && <p className="error">Error: {error}</p>}

      {pdfLink && (
        <p>
          Your resume is ready:{" "}
          <a href={pdfLink} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </p>
      )}

      <div className="skill-buttons">
        <Button type="button" className="btn-secondary" onClick={handlePrev}>
          Go Back
        </Button>
        <Button type="button" className="btn-primary" onClick={handleNext} disabled={loading}>
          {loading ? "Generating..." : "Generate Resume"}
        </Button>
      </div>
    </div>
  );
}

export default SkillsAndCertificates;
