"use client";

import React, { useContext } from "react";
import { ResumeContext } from "../../app/builder/page";
import FormButton from "./FormButton";
import EditableFormTitle from './EditableFormTitle';

const Skill = ({ title }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // skills
  const handleSkill = (e, index, title) => {
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)
        .skills,
    ];
    newSkills[index] = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ),
    }));
  };

  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...skillType.skills, ""];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeSkill = (title, index) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...skillType.skills];
      newSkills.pop();
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  // Map skill titles to section keys
  const getSectionKey = (title) => {
    if (title === "Programming Languages") return "programming";
    if (title === "Frameworks & Technologies") return "frameworks";
    if (title === "Cloud & Databases") return "clouddb";
    if (title === "Soft Skills") return "softskills";
    if (title === "Technical Skills") return "skills";
    return "skills"; // default fallback
  };

  return (
    <div className="flex-col-gap-2">
      {title === "Soft Skills" ? (
        <EditableFormTitle 
          sectionKey={getSectionKey(title)} 
          defaultTitle={title} 
          className="input-title"
        />
      ) : (
        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">
          {title}
        </h3>
      )}
      {skillType.skills.map((skill, index) => (
        <div key={index} className="f-col">
          <input
            type="text"
            placeholder={title}
            name={title}
            className="w-full other-input"
            value={skill}
            onChange={(e) => handleSkill(e, index, title)}
          />
        </div>
      ))}
      <FormButton
        size={skillType.skills.length}
        add={() => addSkill(title)}
        remove={() => removeSkill(title)}
      />
    </div>
  );
};

export default Skill;
