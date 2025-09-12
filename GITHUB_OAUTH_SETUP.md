# 🐙 GitHub OAuth Setup Guide

## ✅ **GOOD NEWS: You Already Have GitHub Credentials!**

Your backend `.env` already contains working GitHub OAuth credentials:
- **Client ID**: `Ov23liwJBYgnZH5EkuWf`
- **Client Secret**: `0ea9bead62ca450aef03b5a134e4e4a55f83f3f0`

## 🔧 **What We Need To Fix:**

### Step 1: Update Your GitHub OAuth App Settings
1. Go to: https://github.com/settings/developers
2. Find your existing OAuth app (with Client ID: `Ov23liwJBYgnZH5EkuWf`)
3. Click "Edit" on that app

### Step 2: Update the Callback URL
Change the **Authorization callback URL** from:
```
http://localhost:5000/auth/github/callback
```
To:
```
http://localhost:3000/api/auth/callback/github
```

**OR** add both URLs (recommended):
```
http://localhost:5000/auth/github/callback
http://localhost:3000/api/auth/callback/github
```

### Step 3: Save Changes
Click "Update application"

## ✅ **Status:**
- ✅ **GitHub Client ID**: Already set in `.env.local`
- ✅ **GitHub Client Secret**: Already set in `.env.local`
- 🔄 **Callback URL**: Needs updating (see steps above)

## 🧪 **Test Your Setup:**
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000
3. Click "Create Resume" 
4. Try "Continue with GitHub" - it should work now!

---

**Quick Fix**: Just update the callback URL in your existing GitHub OAuth app and you're ready to go!