"use client";

import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // social media
  const handleSocialMedia = (e, index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    const fieldName = e.target.name;
    const fieldValue = e.target.value.replace("https://", "");
    
    newSocialMedia[index][fieldName] = fieldValue;
    
    // Auto-update displayText when platform changes
    if (fieldName === "socialMedia") {
      // Always update displayText to match platform name
      newSocialMedia[index].displayText = fieldValue;
    }
    
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", displayText: "", link: "" }],
    });
  };

  const removeSocialMedia = (index) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
    newSocialMedia.pop();
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="form-section">
      <h2 className="form-section-title">Social Media</h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="space-y-2 mb-4 p-4 border border-gray-700/40 rounded-lg bg-gray-800/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Platform</label>
              <input
                type="text"
                placeholder="e.g., LinkedIn, GitHub, Instagram"
                name="socialMedia"
                className="other-input w-full"
                value={socialMedia.socialMedia}
                onChange={(e) => handleSocialMedia(e, index)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Display Text</label>
              <input
                type="text"
                placeholder="e.g., LinkedIn, GitHub, Website"
                name="displayText"
                className="other-input w-full"
                value={socialMedia.displayText || ""}
                onChange={(e) => handleSocialMedia(e, index)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Profile URL</label>
            <input
              type="text"
              placeholder="Full profile URL (e.g., linkedin.com/in/johndoe)"
              name="link"
              className="other-input w-full"
              value={socialMedia.link}
              onChange={(e) => handleSocialMedia(e, index)}
            />
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.socialMedia.length}
        add={addSocialMedia}
        remove={removeSocialMedia}
        sectionName="social media"
      />
    </div>
  );
};

export default SocialMedia;