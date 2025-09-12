// API utility for NextAuth-based authentication
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Generic API call function with NextAuth session
const apiCall = async (endpoint, options = {}) => {
  const session = await getSession();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      // Include NextAuth session token if available
      ...(session?.user && {
        'Authorization': `Bearer ${session.accessToken || session.user.id}`,
        'X-User-Email': session.user.email,
        'X-User-ID': session.user.id,
      }),
    },
    credentials: 'include',
    ...options,
    headers: {
      ...config.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Resume API calls
export const resumeAPI = {
  // Get all resumes for user
  getResumes: async () => {
    return apiCall('/api/resumes');
  },

  // Create new resume
  createResume: async (resumeData) => {
    return apiCall('/api/resumes', {
      method: 'POST',
      body: JSON.stringify(resumeData),
    });
  },

  // Update resume
  updateResume: async (resumeId, resumeData) => {
    return apiCall(`/api/resumes/${resumeId}`, {
      method: 'PUT',
      body: JSON.stringify(resumeData),
    });
  },

  // Delete resume
  deleteResume: async (resumeId) => {
    return apiCall(`/api/resumes/${resumeId}`, {
      method: 'DELETE',
    });
  },

  // Get AI suggestions
  getAISuggestions: async (resumeData) => {
    return apiCall('/api/resumes/suggestions', {
      method: 'POST',
      body: JSON.stringify(resumeData),
    });
  },

  // Analyze resume
  analyzeResume: async (resumeData) => {
    return apiCall('/api/resumes/analyze', {
      method: 'POST',
      body: JSON.stringify(resumeData),
    });
  },
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiCall('/api/users/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiCall('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// File upload API
export const uploadAPI = {
  // Upload resume file
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    return apiCall('/api/upload/resume', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it with boundary
    });
  },
};

// Generic API export for custom calls
export const api = {
  get: (endpoint) => apiCall(endpoint, { method: 'GET' }),
  post: (endpoint, data) => apiCall(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint, data) => apiCall(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' }),
};

export default {
  resumeAPI,
  userAPI,
  uploadAPI,
  api,
};