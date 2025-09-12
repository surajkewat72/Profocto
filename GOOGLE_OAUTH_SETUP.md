# 🔐 Google OAuth Setup Guide

## Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account

## Step 2: Create a New Project (or select existing)
1. Click on the project dropdown at the top
2. Click "New Project"
3. Name it: "Profile Elegante" or any name you prefer
4. Click "Create"

## Step 3: Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" 
3. Click on it and press "Enable"
4. Also search for "Google OAuth2 API" and enable it

## Step 4: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "+ CREATE CREDENTIALS"
3. Select "OAuth client ID"

## Step 5: Configure OAuth Consent Screen (if prompted)
1. Choose "External" user type
2. Fill in required fields:
   - App name: "Profile Elegante"
   - User support email: your email
   - Developer contact: your email
3. Add scopes: email, profile, openid
4. Save and continue

## Step 6: Create OAuth Client ID
1. Application type: "Web application"
2. Name: "Profile Elegante Web Client"
3. Authorized JavaScript origins:
   - http://localhost:3000
   - http://127.0.0.1:3000
4. Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - http://127.0.0.1:3000/api/auth/callback/google

## Step 7: Copy Your Credentials
After creating, you'll get:
- Client ID (starts with numbers, ends with .apps.googleusercontent.com)
- Client Secret (random string)

## Step 8: Update Your .env.local File
Replace the placeholder values with your actual credentials:

```env
GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

## Step 9: Restart Your Development Server
```bash
npm run dev
```

## 🎯 Production Setup (Later)
For production, add your production domain:
- Authorized JavaScript origins: https://yourdomain.com
- Authorized redirect URIs: https://yourdomain.com/api/auth/callback/google

## 🔍 Troubleshooting
- **Error: redirect_uri_mismatch** → Check your redirect URIs match exactly
- **Error: unauthorized_client** → Make sure OAuth consent screen is configured
- **Error: access_denied** → Check if app is in testing mode and add test users

## 🔐 Security Notes
- Never commit your Client Secret to version control
- Keep your .env.local file in .gitignore
- Use different credentials for development and production

---

**Need help?** Check the console logs for specific error messages!