# Profile Elegante - Setup Guide

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- Git

### 🔧 Setup Instructions

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Running the Application

```bash
npm run dev
```

**Option 2: Run Separately**
```bash
# Terminal 1: Backend
npm run backend:dev

# Terminal 2: Frontend
npm run dev
```

### 📡 API Connection Architecture

```
Frontend (Next.js - Port 3000)
         ↕
    API Utilities (lib/api.js)
         ↕
Backend (Express.js - Port 5000)
         ↕
    MongoDB Database
```

### 🔌 Available API Endpoints

#### Authentication
- `GET /auth/github` - GitHub OAuth login
- `POST /auth/logout` - Logout user
- `GET /auth/check` - Check auth status
- `GET /auth/user` - Get current user

#### Resume Management
- `GET /api/resumes` - Get all user resumes
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/suggestions` - Get AI suggestions
- `POST /api/resumes/analyze` - Analyze resume

#### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### 🛠 Development Scripts

```bash
# Frontend only
npm run dev                 # Start Next.js development server
npm run build              # Build for production
npm run start              # Start production server

# Backend only
npm run backend            # Start backend (production)
npm run backend:dev        # Start backend (development with nodemon)

# Full stack
npm run dev:full           # Start both frontend & backend (development)
npm run start:full         # Start both frontend & backend (production)
```

### 🔧 API Usage Examples

```javascript
import { resumeAPI, authAPI } from '@/lib/api';

// Get AI suggestions
const suggestions = await resumeAPI.getAISuggestions(resumeData);

// Login with GitHub
authAPI.loginWithGitHub();

// Check authentication
const user = await authAPI.getCurrentUser();
```

### 🌐 Production Deployment

#### Frontend (Vercel/Netlify)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_ENV=production
```

#### Backend (Railway/Heroku/AWS)
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
# Update other URLs accordingly
```

### 🔍 Troubleshooting

#### Common Issues:

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in backend/.env matches your frontend URL
   - Check CORS configuration in backend/app.js

2. **API Connection Failed**
   - Verify backend is running on port 5000
   - Check `NEXT_PUBLIC_API_URL` in frontend/.env.local

3. **Database Connection**
   - Ensure MongoDB is running (if local)
   - Verify `MONGODB_URI` in backend/.env

4. **Authentication Issues**
   - Set up GitHub OAuth app correctly
   - Verify callback URL matches configuration

### 📝 Notes

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- API calls from frontend automatically include credentials
- JWT tokens are stored in HTTP-only cookies
- File uploads are handled through multipart/form-data

### 🚀 Ready to Go!

Run `npm run dev:full` and visit `http://localhost:3000` to start building awesome resumes! 🎉