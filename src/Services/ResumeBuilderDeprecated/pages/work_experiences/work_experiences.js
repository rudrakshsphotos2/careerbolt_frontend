import React, { useState, useEffect } from "react";
import "../../resume_builder.css";
import Button from "../../components/Button";
import "./work_experiences.css";

function WorkExperiences({ step, setStep }) {
  const [workExperiences, setWorkExperiences] = useState(() => {
    const savedData = localStorage.getItem("work_experiences");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("work_experiences", JSON.stringify(workExperiences));
  }, [workExperiences]);

  const handleInputChange = (index, key, value) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][key] = value;
    setWorkExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    if (workExperiences.length > 0 && !isLastEntryComplete()) {
      alert("Please fill out all fields before adding a new work experience.");
      return;
    }
    setWorkExperiences([
      ...workExperiences,
      {
        title: "",
        sub_title: "",
        address: "",
        start_date: "",
        end_date: "",
        description: [""],
      },
    ]);
    setActiveIndex(workExperiences.length);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedExperiences);
    setActiveIndex(null);
  };

  const handleAddDescription = (index) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index].description.push("");
    setWorkExperiences(updatedExperiences);
  };

  const handleRemoveDescription = (expIndex, descIndex) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[expIndex].description.splice(descIndex, 1);
    setWorkExperiences(updatedExperiences);
  };

  const isLastEntryComplete = () => {
    if (workExperiences.length === 0) return true;
    const lastEntry = workExperiences[workExperiences.length - 1];
    return (
      (lastEntry.title || "").trim() !== "" &&
      (lastEntry.sub_title || "").trim() !== "" &&
      (lastEntry.address || "").trim() !== "" &&
      (lastEntry.start_date || "").trim() !== "" &&
      (lastEntry.end_date || "").trim() !== "" &&
      lastEntry.description.length > 0 &&
      lastEntry.description.every((desc) => (desc || "").trim() !== "")
    );
  };

  const handleNext = () => {
    if (workExperiences.length > 0 && !isLastEntryComplete()) {
      alert("Please complete all fields before proceeding.");
      return;
    }
    setStep(5);
  };

  const handlePrev = () => {
    setStep(3);
  };
  const handleDescriptionChange = (index, descIndex, value) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index].description[descIndex] = value.trim();

    // Remove empty descriptions
    updatedExperiences[index].description = updatedExperiences[index].description.filter(desc => desc !== "");

    setWorkExperiences(updatedExperiences);
  };
  return (
    <div>
      <form className="work-form" onSubmit={(e) => e.preventDefault()}>
        {workExperiences.map((work, index) => (
          <div key={index} className="work-entry">
            <div className="accordion-header" onClick={() => setActiveIndex(index)}>
              <h3>Work Experience {index + 1}</h3>
              <Button
                type="button"
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteExperience(index);
                }}
              >
                Delete
              </Button>
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                <div className="form-control">
                  <label>Company</label>
                  <input
                    type="text"
                    value={work.title}
                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={work.sub_title}
                    onChange={(e) => handleInputChange(index, "sub_title", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>Address</label>
                  <input
                    type="text"
                    value={work.address}
                    onChange={(e) => handleInputChange(index, "address", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={work.start_date}
                    onChange={(e) => handleInputChange(index, "start_date", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={work.end_date !== "Currently Working" ? work.end_date : ""}
                    onChange={(e) => handleInputChange(index, "end_date", e.target.value)}
                    disabled={work.end_date === "Currently Working"}
                    required={work.end_date !== "Currently Working"}
                  />
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={work.end_date === "Currently Working"}
                      onChange={(e) => handleInputChange(index, "end_date", e.target.checked ? "Currently Working" : "")}
                    />
                    <label>Currently Working</label>
                  </div>
                </div>
                <div className="special">
                  <label>Description</label>
                  {work.description.map((desc, descIndex) => (
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
                        onClick={() => handleRemoveDescription(index, descIndex)}
                        disabled={work.description.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => handleAddDescription(index)}>
                    Add Description Point
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      <Button type="button" className="btn-secondary" onClick={handleAddExperience}>
        Add Another Experience
      </Button>
      </form>
      <div className="buttons">
        <Button type="button" className="btn-secondary" onClick={handlePrev}>
          Go Back
        </Button>
        <Button type="button" className="btn-primary" onClick={handleNext}>
          {workExperiences.length === 0 ? "Skip" : "Next Step"}
        </Button>
      </div>
    </div>
  );
}

export default WorkExperiences;