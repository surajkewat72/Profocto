const DefaultResumeData = {
  personalInformation: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 555-123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
    website: "johndoe.dev",
    profileImage: ""
  },
  summary: "Experienced Software Engineer with 5+ years of experience in developing scalable web applications and mobile solutions. Proficient in modern JavaScript frameworks, cloud technologies, and agile development practices. Passionate about creating efficient, user-friendly applications and mentoring junior developers.",
  workExperience: [
    {
      id: "work-1",
      company: "Google",
      position: "Senior Software Engineer",
      startDate: "03/2022",
      endDate: "12/2024",
      description: "Led development of large-scale distributed systems serving millions of users. Collaborated with cross-functional teams to design and implement new features for Google Cloud Platform.\n\n• Improved system performance by 35% through code optimization\n• Led a team of 4 engineers to deliver critical features on time",
      location: "Mountain View, CA"
    },
    {
      id: "work-2",
      company: "Microsoft",
      position: "Software Engineer", 
      startDate: "07/2020",
      endDate: "02/2022",
      description: "Developed and maintained Azure services and tools. Worked on improving developer experience and implementing new cloud functionalities for enterprise customers.\n\n• Reduced deployment time by 50% through automation\n• Implemented monitoring solutions that decreased system downtime by 25%",
      location: "Redmond, WA"
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "09/2016",
      endDate: "06/2020",
      gpa: "3.8",
      description: "Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems",
      location: "Stanford, CA"
    }
  ],
  skills: [
    {
      id: "skill-1",
      name: "JavaScript",
      category: "Programming Languages",
      level: "Advanced"
    },
    {
      id: "skill-2", 
      name: "TypeScript",
      category: "Programming Languages",
      level: "Advanced"
    },
    {
      id: "skill-3",
      name: "React",
      category: "Frameworks",
      level: "Advanced"
    },
    {
      id: "skill-4",
      name: "Node.js",
      category: "Frameworks", 
      level: "Advanced"
    },
    {
      id: "skill-5",
      name: "AWS",
      category: "Cloud Technologies",
      level: "Intermediate"
    },
    {
      id: "skill-6",
      name: "MongoDB",
      category: "Databases",
      level: "Intermediate"
    },
    {
      id: "skill-7",
      name: "Leadership",
      category: "Soft Skills",
      level: "Advanced"
    },
    {
      id: "skill-8",
      name: "Problem Solving",
      category: "Soft Skills", 
      level: "Advanced"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      dateObtained: "03/2023",
      expirationDate: "03/2026",
      credentialId: "AWS-SA-2023-001",
      url: "https://www.credly.com/badges/aws-certified-solutions-architect"
    },
    {
      id: "cert-2",
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      dateObtained: "01/2023",
      expirationDate: "01/2025", 
      credentialId: "GCP-DEV-2023-002",
      url: "https://www.credential.net/google-cloud-professional-developer"
    },
    {
      id: "cert-3",
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      dateObtained: "11/2022",
      expirationDate: "11/2025",
      credentialId: "CKA-2022-003",
      url: ""
    }
  ],
  projects: [
    {
      id: "project-1",
      name: "Task Management App",
      description: "Built a comprehensive task management application using React, Node.js, and MongoDB. Features include real-time collaboration, file attachments, and advanced filtering capabilities.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
      startDate: "08/2023",
      endDate: "01/2024",
      url: "https://taskmanager-demo.com",
      githubUrl: "https://github.com/johndoe/task-manager"
    },
    {
      id: "project-2", 
      name: "E-Commerce Platform",
      description: "Developed a full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Used Next.js, Stripe API, and PostgreSQL for robust performance.",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "Tailwind CSS", "Prisma"],
      startDate: "02/2023",
      endDate: "07/2023",
      url: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/johndoe/ecommerce-platform"
    }
  ],
  languages: [
    {
      id: "lang-1",
      language: "English",
      proficiency: "Native"
    },
    {
      id: "lang-2",
      language: "Spanish", 
      proficiency: "Conversational"
    },
    {
      id: "lang-3",
      language: "French",
      proficiency: "Basic"
    }
  ],
  socialMedia: {
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    twitter: "twitter.com/johndoe",
    portfolio: "johndoe.dev",
    behance: "",
    dribbble: ""
  },
};

export default DefaultResumeData;
