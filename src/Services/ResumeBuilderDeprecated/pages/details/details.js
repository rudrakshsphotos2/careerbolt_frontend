import React, { useState } from "react";
import "../../resume_builder.css";
import Button from "../../components/Button";
import "./details.css"

function Details({ step, setStep }) {
  const [name, setName] = useState(() => JSON.parse(localStorage.getItem("personal_details"))?.name || "");
  const [email, setEmail] = useState(() => JSON.parse(localStorage.getItem("personal_details"))?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(() => JSON.parse(localStorage.getItem("personal_details"))?.mobile || "");
  const [linkedin, setLinkedin] = useState(() => JSON.parse(localStorage.getItem("personal_details"))?.linkedin || "");
  const [github, setGithub] = useState(() => JSON.parse(localStorage.getItem("personal_details"))?.github || "");
  const [address, setAddress] = useState(() => JSON.parse(localStorage.getItem("personal_details"))?.address || "");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const saveToStorage = (key, value) => {
    const personalDetails = JSON.parse(localStorage.getItem("personal_details")) || {};
    personalDetails[key] = value;
    localStorage.setItem("personal_details", JSON.stringify(personalDetails));
  };

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhoneNumber = () => {
    const phonePattern = /^\+\d{1,3}(\s\d{10}|\s\d{5}\s\d{5})$/;; 
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
      return false;
    } else if (!phonePattern.test(phoneNumber)) {
      setPhoneNumberError("Phone number should be in format (e.g., +1 234-567-890)");
      return false;
    }
    setPhoneNumberError("");
    return true;
  };

  const handleInputChange = (setter, key) => (e) => {
    setter(e.target.value);
    saveToStorage(key, e.target.value);
  };

  const handleNext = () => {
    if (validateName() && validateEmail() && validatePhoneNumber()) {
      setStep(2);
    }
  };

  return (
    <div>
      <form className="det-form">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={handleInputChange(setName, "name")}
            onBlur={validateName}
            required
          />
          <div className="error">{nameError}</div>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            onBlur={validateEmail}
            required
          />
          <div className="error">{emailError}</div>
        </div>

        <div className="form-control">
          <label htmlFor="Phone">Phone Number</label>
          <input
            type="text"
            name="Phone"
            id="Phone"
            placeholder="e.g. +1 234-567-890"
            value={phoneNumber}
            onChange={handleInputChange(setPhoneNumber, "mobile")}
            onBlur={validatePhoneNumber}
            required
          />
          <div className="error">{phoneNumberError}</div>
        </div>

        <div className="form-control">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            placeholder=""
            value={linkedin}
            onChange={handleInputChange(setLinkedin, "linkedin")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="github">Github</label>
          <input
            type="text"
            name="github"
            id="github"
            placeholder=""
            value={github}
            onChange={handleInputChange(setGithub, "github")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="e.g. Mumbai, India"
            value={address}
            onChange={handleInputChange(setAddress, "address")}
            required
          />
        </div>
      </form>

      <div className="det-buttons">
        <Button className="btn-primary" onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
}

export default Details;
