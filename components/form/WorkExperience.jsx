"use client";

import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../app/builder/page";
import EditableFormTitle from './EditableFormTitle';
import PinkDatePicker from '../ui/date-picker';

const WorkExperience = () => {
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);

  const handleWorkExperience = (e, index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index] = newworkExperience[newworkExperience.length - 1];
    newworkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  return (
    <div className="form-section">
      <div className="form-section-title">
        <EditableFormTitle 
          sectionKey="experience" 
          defaultTitle="Work Experience" 
        />
      </div>

      {resumeData.workExperience.map((workExperience, index) => (
        <div key={index} className="section-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label-text">Company Name</label>
              <input
                type="text"
                placeholder="Company or Organization"
                name="company"
                className="other-input w-full"
                value={workExperience.company}
                onChange={(e) => handleWorkExperience(e, index)}
              />
            </div>
            <div>
              <label className="label-text">Job Title</label>
              <input
                type="text"
                placeholder="Your position"
                name="position"
                className="other-input w-full"
                value={workExperience.position}
                onChange={(e) => handleWorkExperience(e, index)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label-text">Start Date</label>
              <PinkDatePicker
                value={workExperience.startYear}
                onChange={(date) => handleWorkExperience({ target: { name: 'startYear', value: date } }, index)}
                placeholder="Select start date"
                className="w-full"
              />
            </div>
            <div>
              <label className="label-text">End Date</label>
              <PinkDatePicker
                value={workExperience.endYear}
                onChange={(date) => handleWorkExperience({ target: { name: 'endYear', value: date } }, index)}
                placeholder="Select end date"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="label-text">Job Description</label>
            <textarea
              placeholder="Describe your responsibilities and daily tasks..."
              name="description"
              className="other-input w-full h-24 resize-none"
              value={workExperience.description}
              maxLength="250"
              onChange={(e) => handleWorkExperience(e, index)}
            />
          </div>
          
          <div>
            <label className="label-text">Key Achievements</label>
            <textarea
              placeholder="List your major accomplishments and measurable results..."
              name="keyAchievements"
              className="other-input w-full h-28 resize-none"
              value={workExperience.keyAchievements}
              onChange={(e) => handleWorkExperience(e, index)}
            />
          </div>
        </div>
      ))}

      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />
    </div>
  );
};

export default WorkExperience;
