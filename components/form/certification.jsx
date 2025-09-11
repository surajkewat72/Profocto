"use client";

import React, { useContext } from "react";
import { ResumeContext } from "../../app/builder/page";
import FormButton from "./FormButton";
import EditableFormTitle from './EditableFormTitle';

const Certification = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "certifications";
  const title = "Certifications";

  const handleCertification = (e, index) => {
    const newCertifications = [...resumeData[skillType]];
    newCertifications[index] = {
      ...newCertifications[index],
      [e.target.name]: e.target.value
    };
    setResumeData({ ...resumeData, [skillType]: newCertifications });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      [skillType]: [
        ...resumeData[skillType],
        { name: "", issuer: "", link: "" }
      ]
    });
  };

  const removeCertification = () => {
    const newCertifications = [...resumeData[skillType]];
    newCertifications.pop();
    setResumeData({ ...resumeData, [skillType]: newCertifications });
  };

  return (
    <div className="flex-col-gap-2">
      <EditableFormTitle 
        sectionKey="certifications" 
        defaultTitle={title} 
      />
      {resumeData[skillType].map((certification, index) => (
        <div key={index} className="f-col space-y-2 p-4 border border-gray-200 rounded-lg">
          <div className="f-col">
            <label className="label-text mb-1">Certificate Name</label>
            <input
              type="text"
              placeholder="e.g., AWS Certified Solutions Architect"
              name="name"
              className="w-full other-input"
              value={certification.name}
              onChange={(e) => handleCertification(e, index)}
            />
          </div>
          <div className="f-col">
            <label className="label-text mb-1">Provider/Issuer</label>
            <input
              type="text"
              placeholder="e.g., Amazon Web Services"
              name="issuer"
              className="w-full other-input"
              value={certification.issuer}
              onChange={(e) => handleCertification(e, index)}
            />
          </div>
          <div className="f-col">
            <label className="label-text mb-1">Verification Link (Optional)</label>
            <input
              type="text"
              placeholder="e.g., https://www.credly.com/badges/your-badge"
              name="link"
              className="w-full other-input"
              value={certification.link || ""}
              onChange={(e) => handleCertification(e, index)}
            />
          </div>
        </div>
      ))}
      <FormButton 
        size={resumeData[skillType].length} 
        add={addCertification} 
        remove={removeCertification} 
      />
    </div>
  );
};

export default Certification;