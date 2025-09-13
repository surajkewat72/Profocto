export interface ResumeData {
  personalInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    website: string;
    profileImage: string;
  };
  summary: string;
  workExperience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    location: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa: string;
    description: string;
    location: string;
  }[];
  skills: {
    id: string;
    name: string;
    category: string;
    level: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    dateObtained: string;
    expirationDate: string;
    credentialId: string;
    url: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    url: string;
    githubUrl: string;
  }[];
  languages: {
    id: string;
    language: string;
    proficiency: string;
  }[];
  socialMedia: {
    linkedin: string;
    github: string;
    twitter: string;
    portfolio: string;
    behance: string;
    dribbble: string;
  };
}

export interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  handleProfilePicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
