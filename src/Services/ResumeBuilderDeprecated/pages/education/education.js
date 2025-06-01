import React, { useState, useEffect } from "react";
import "../../resume_builder.css";
import Button from "../../components/Button";
import "./education.css";

function Education({ step, setStep }) {
  const [education, setEducation] = useState(() => {
    const storedEducation = JSON.parse(localStorage.getItem("education"));
    return Array.isArray(storedEducation) && storedEducation.length > 0
      ? storedEducation
      : [
        {
          college: "",
          degree: "",
          major: "",
          cgpa: "",
          from: "",
          to: "",
          location: "",
          description: [""], // Ensure description is an array
        },
      ];
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    saveToStorage(education);
  }, [education]);

  const saveToStorage = (newEducation) => {
    localStorage.setItem("education", JSON.stringify(newEducation));
  };

  const handleInputChange = (index, key, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][key] = value;
    setEducation(updatedEducation);
  };

  const isLastEntryComplete = () => {
    if (education.length === 0) return false;
    const lastEntry = education[education.length - 1];
    return ["college", "location", "degree", "cgpa", "from", "to"].every(
      (field) => lastEntry[field]?.trim() !== ""
    );
  };

  const handleAddEducation = () => {
    if (!isLastEntryComplete()) {
      alert("Please fill out all required fields before adding a new education.");
      return;
    }

    setEducation([
      ...education,
      {
        college: "",
        degree: "",
        major: "",
        cgpa: "",
        from: "",
        to: "",
        location: "",
        description: [""], // Ensure new entry starts with a description array
      },
    ]);
    setActiveIndex(education.length);
  };

  const handleDeleteEducation = (index) => {
    if (education.length === 1) return;

    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);

    if (activeIndex >= updatedEducation.length) {
      setActiveIndex(updatedEducation.length - 1);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleNext = () => {
    if (!isLastEntryComplete()) {
      alert("Please complete all required fields before proceeding.");
      return;
    }
    setStep(4);
  };

  const handlePrev = () => {
    setStep(2);
  };

  const handleDescriptionChange = (index, descIndex, value) => {
    const updatedEducation = [...education];
    updatedEducation[index].description[descIndex] = value.trim();

    // Remove empty descriptions
    updatedEducation[index].description = updatedEducation[index].description.filter(desc => desc !== "");

    setEducation(updatedEducation);
  };

  const addDescriptionPoint = (index) => {
    const updatedEducation = [...education];

    if (!Array.isArray(updatedEducation[index].description)) {
      updatedEducation[index].description = [];
    }

    // Add a new point only if the last one is not empty
    if (updatedEducation[index].description.length === 0 || updatedEducation[index].description[updatedEducation[index].description.length - 1].trim() !== "") {
      updatedEducation[index].description.push(""); // Add an empty input field
    }

    setEducation(updatedEducation);
  };


  const removeDescriptionPoint = (index, descIndex) => {
    const updatedEducation = [...education];
    if (updatedEducation[index].description.length > 1) {
      updatedEducation[index].description.splice(descIndex, 1);
      setEducation(updatedEducation);
    }
  };

  return (
    <div className="main-ed">
      <form className="ed-form" onSubmit={(e) => e.preventDefault()}>
        {education.map((edu, index) => (
          <div key={index} className="education-entry">
            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
              <h3>Education {index + 1}</h3>
              {education.length > 1 && (
                <Button
                  type="button"
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEducation(index);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>

            {activeIndex === index && (
              <div className="accordion-content">
                <div className="form-control">
                  <label>College <span className="required">*</span></label>
                  <input
                    type="text"
                    value={edu.college}
                    onChange={(e) => handleInputChange(index, "college", e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label>Degree <span className="required">*</span></label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleInputChange(index, "degree", e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label>Major</label>
                  <input
                    type="text"
                    value={edu.major}
                    onChange={(e) => handleInputChange(index, "major", e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label>CGPA <span className="required">*</span></label>
                  <input
                    type="text"
                    value={edu.cgpa}
                    onChange={(e) => handleInputChange(index, "cgpa", e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label>From <span className="required">*</span></label>
                  <input
                    type="date"
                    value={edu.from}
                    onChange={(e) => handleInputChange(index, "from", e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label>To <span className="required">*</span></label>
                  <input
                    type="date"
                    value={edu.to}
                    onChange={(e) => handleInputChange(index, "to", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>Address <span className="required">*</span></label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleInputChange(index, "location", e.target.value)}
                    required
                  />
                </div>

                <div className="special">
                  <label>Description</label>
                  {edu.description.map((desc, descIndex) => (
                    <div key={descIndex} className="description-item">
                      <textarea
                        value={desc}
                        onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                        cols={100}
                        rows={2}
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => removeDescriptionPoint(index, descIndex)}
                        disabled={edu.description.length === 1} // Disable when only one description is present
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => addDescriptionPoint(index)}>
                    Add Description Point
                  </Button>
                </div>

              </div>
            )}
          </div>
        ))}

        <Button type="button" className="btn-secondary" onClick={handleAddEducation}>
          Add Another Education
        </Button>
      </form>

      <div className="ed-buttons">
        <Button type="button" className="btn-secondary" onClick={handlePrev}>
          Go Back
        </Button>
        <Button type="button" className="btn-primary" onClick={handleNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
}

export default Education;
