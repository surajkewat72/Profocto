/*
  Reference code for frontend implementation.
*/

"use client";
import { ResumeContext } from "@/contexts/ResumeContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

function SaveResume() {
  const { resumeData } = useContext(ResumeContext);
  const { data: session } = useSession();
  console.log(session?.user);
  const user = useQuery(api.auth.getUserByEmail, {
    email: session?.user.email!,
  });
  const resumes = useQuery(api.resume.getResumes, {
    id: user?._id ? user?._id : undefined,
  });

  const addResumeMutex = useMutation(api.resume.createResume);

  const updateResumeMutex = useMutation(api.resume.updateResume);

  const deleteResumeMutex = useMutation(api.resume.deleteResume)

  const getResume = useQuery(api.resume.getResume, {id:"jh77x8b9n4txa5thjkmf84sg0s7sa8ne"});

  const handleSave = async () => {
    const resumeString = JSON.stringify(resumeData);
    // @ts-ignore
    // addResumeMutex({ resume_data: resumeString, owner: session?.user.id });
    
    // updateResumeMutex({
    //   resume_id: getResume?._id!,
    //   resume_data: resumeString,
    // });

    deleteResumeMutex({
      id: getResume?._id!
    })
    // console.log(resumes);
  };
  return (
    <div>
      <button
        className=' rounded-md mt-2 border-gray-900 bg-yellow-300 p-2'
        onClick={handleSave}
      >
        Create Resume
      </button>
    </div>
  );
}

export default SaveResume;
