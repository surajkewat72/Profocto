// API utility for connecting frontend to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API configuration
const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies for authentication
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...apiConfig,
    ...options,
    headers: {
      ...apiConfig.headers,
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

// Authentication API calls
export const authAPI = {
  // Login with GitHub
  loginWithGitHub: () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  },

  // Logout
  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },

  // Check authentication status
  checkAuth: async () => {
    return apiCall('/auth/check');
  },

  // Get current user
  getCurrentUser: async () => {
    return apiCall('/auth/user');
  },
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
  authAPI,
  resumeAPI,
  userAPI,
  uploadAPI,
  api,
};