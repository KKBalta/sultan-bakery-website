# Sultan Bakery - Deployment Guide

## 🚀 Deployment Scripts

### 1. **deploy-env.sh** - Full Build with Environment Variables
This script builds the app with environment variables and deploys to Cloud Run.

```bash
./deploy-env.sh
```

**What it does:**
- Creates a `.env.production` file with all your environment variables
- Builds the Docker image with environment variables
- Pushes to Artifact Registry
- Deploys to Cloud Run with runtime environment variables

### 2. **deploy-quick.sh** - Quick Deploy (Recommended)
This script just updates the Cloud Run service with environment variables using the existing image.

```bash
./deploy-quick.sh
```

**What it does:**
- Uses the existing Docker image
- Updates Cloud Run service with environment variables
- Much faster deployment

## 📝 Environment Variables Available

Your React app now has access to these environment variables:

### Bakery Information
```javascript
const bakeryName = import.meta.env.VITE_REACT_APP_BAKERY_NAME;
const tagline = import.meta.env.VITE_REACT_APP_BAKERY_TAGLINE;
const address = import.meta.env.VITE_REACT_APP_BAKERY_ADDRESS;
const phone = import.meta.env.VITE_REACT_APP_BAKERY_PHONE;
const hours = import.meta.env.VITE_REACT_APP_BAKERY_HOURS;
```

### Google Services
```javascript
const googleSheetId = import.meta.env.VITE_REACT_APP_GOOGLE_SHEET_ID;
const googleApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
```

### Colors
```javascript
const primaryColor = import.meta.env.VITE_REACT_APP_PRIMARY_COLOR;
const secondaryColor = import.meta.env.VITE_REACT_APP_SECONDARY_COLOR;
const colorPrimary = import.meta.env.VITE_REACT_APP_COLOR_PRIMARY;
const colorSecondary = import.meta.env.VITE_REACT_APP_COLOR_SECONDARY;
// ... and all other color variables
```

## 🌐 Your Website

**URL**: https://sultan-bakery-pqj6xot4ma-ue.a.run.app

## 🔧 Making Changes

### To Update Environment Variables:
1. Edit the environment variables in `deploy-quick.sh`
2. Run: `./deploy-quick.sh`

### To Update Code:
1. Make your code changes
2. Run: `./deploy-env.sh` (full rebuild)

### To Update Images:
1. Replace images in `public/assets/images/`
2. Run: `./deploy-env.sh` (full rebuild)

## 📊 Monitoring

### View Logs:
```bash
gcloud logs tail --follow --service=sultan-bakery --region=us-east1
```

### Check Service Status:
```bash
gcloud run services describe sultan-bakery --region=us-east1
```

## 🚨 Important Notes

1. **Environment Variables**: All variables must be prefixed with `VITE_` to be available in the React app
2. **Build Time vs Runtime**: Environment variables are embedded at build time, not runtime
3. **Public Access**: The service still needs public access enabled in Google Cloud Console
4. **Images**: All images are now properly included in the build

## 🔄 Quick Commands

```bash
# Quick deploy with environment variables
./deploy-quick.sh

# Full rebuild and deploy
./deploy-env.sh

# View logs
gcloud logs tail --follow --service=sultan-bakery --region=us-east1

# Check service
gcloud run services describe sultan-bakery --region=us-east1
```
