"use client";

import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  // Disable image upload for both professional templates
  const isImageUploadDisabled = true;

  return (
    <div className="form-section">
      <h2 className="form-section-title">Personal Information</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              className="pi w-full"
              value={resumeData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-text">Job Title</label>
            <input
              type="text"
              placeholder="Your desired position"
              name="position"
              className="pi w-full"
              value={resumeData.position}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Phone Number</label>
            <input
              type="text"
              placeholder="Your contact number"
              name="contactInformation"
              className="pi w-full"
              value={resumeData.contactInformation}
              onChange={handleChange}
              minLength="10"
              maxLength="15"
            />
          </div>
          <div>
            <label className="label-text">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              name="email"
              className="pi w-full"
              value={resumeData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="label-text">Address</label>
          <input
            type="text"
            placeholder="Your location"
            name="address"
            className="pi w-full"
            value={resumeData.address}
            onChange={handleChange}
          />
        </div>

        {isImageUploadDisabled && (
          <div className="p-4 bg-gray-800/30 border border-gray-700/40 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Profile image disabled for professional templates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
