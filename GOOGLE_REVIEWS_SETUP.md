# Google Reviews Integration Guide

This guide will help you integrate real Google Reviews into your bakery website.

## 🚀 Quick Setup (3 Methods)

### Method 1: Google Places API (Recommended)
**Best for**: Full control, custom design, real-time data

#### Step 1: Get Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy your API key

#### Step 2: Enable Places API
1. Go to "APIs & Services" > "Library"
2. Search for "Places API"
3. Click "Enable"

#### Step 3: Get Your Place ID
1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for your business
3. Copy the Place ID

#### Step 4: Configure Environment Variables
Create/update your `.env` file:
```env
VITE_REACT_APP_GOOGLE_API_KEY=your_api_key_here
VITE_REACT_APP_GOOGLE_PLACE_ID=your_place_id_here
```

#### Step 5: Update Homepage
Replace the current GoogleReviews component with RealGoogleReviews:
```tsx
import { RealGoogleReviews } from '../components/RealGoogleReviews';

// In your Home component:
<RealGoogleReviews 
  placeId={bakeryConfig.googlePlaceId}
  apiKey={bakeryConfig.googleApiKey}
  maxReviews={6}
  showProfilePhotos={true}
  showRatings={true}
  showTimestamps={true}
/>
```

### Method 2: Free Google Reviews Widget
**Best for**: Quick setup, no API costs

#### Option A: Google My Business Widget
1. Go to [Google My Business](https://business.google.com/)
2. Select your business
3. Go to "Reviews" section
4. Click "Share" > "Embed"
5. Copy the embed code
6. Add to your website

#### Option B: Third-Party Widgets
Popular free options:
- **Elfsight Google Reviews Widget**
- **Trustpilot Google Reviews**
- **ReviewsOnMyWebsite**

### Method 3: Google Maps Embed (Free)
**Best for**: Simple integration, no API key needed

```tsx
// Add this to your component
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&place_id=YOUR_PLACE_ID"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

## 💰 Pricing Information

### Google Places API Costs (2024)
- **Places Details API**: $17 per 1,000 requests
- **Places Photos API**: $7 per 1,000 requests
- **Free tier**: $200 credit per month (≈11,700 requests)

### Free Alternatives
- Google My Business embed (free)
- Third-party widgets (free with branding)
- Static review display (free)

## 🔧 Advanced Configuration

### API Key Security
```env
# Restrict your API key to specific domains
VITE_REACT_APP_GOOGLE_API_KEY=your_restricted_api_key
VITE_REACT_APP_GOOGLE_PLACE_ID=your_place_id
```

### Custom Styling
The RealGoogleReviews component supports:
- Custom colors via bakeryConfig
- Responsive design (3 reviews desktop, 1 mobile)
- Glassmorphism effects
- Smooth animations

### Error Handling
The component includes:
- Automatic fallback to mock data
- User-friendly error messages
- Loading states
- API error handling

## 🚨 Important Notes

### CORS Issues
Google Places API has CORS restrictions. Solutions:
1. **Use a backend proxy** (recommended for production)
2. **Use Google Maps JavaScript API** instead
3. **Use third-party services** that handle CORS

### Rate Limits
- Google Places API: 1,000 requests/day (free tier)
- Consider caching reviews for 24 hours
- Implement request throttling

### Legal Compliance
- Follow Google's Terms of Service
- Don't modify review content
- Include proper attribution
- Respect user privacy

## 🛠️ Troubleshooting

### Common Issues

#### "CORS error"
- **Solution**: Use backend proxy or Google Maps JavaScript API

#### "API key not working"
- **Check**: API key is correct and has Places API enabled
- **Check**: API key restrictions allow your domain

#### "No reviews showing"
- **Check**: Place ID is correct
- **Check**: Business has reviews on Google
- **Check**: API key has proper permissions

#### "Reviews not updating"
- **Note**: Google caches reviews for 24-48 hours
- **Solution**: Implement client-side caching

### Debug Mode
Add this to see detailed error information:
```tsx
<RealGoogleReviews 
  // ... other props
  debug={true} // Shows console logs
/>
```

## 📱 Mobile Optimization

The component automatically handles:
- **Desktop**: 3 reviews in a grid with side arrows
- **Mobile**: 1 review with top navigation
- **Touch-friendly**: Large tap targets
- **Responsive**: Adapts to all screen sizes

## 🔄 Updates and Maintenance

### Regular Tasks
1. **Monitor API usage** to avoid overage charges
2. **Check for new reviews** (Google updates every 24-48 hours)
3. **Update API key** if it expires
4. **Review Google's Terms of Service** for changes

### Backup Plan
Always have a fallback:
- Mock data for development
- Static reviews for emergencies
- Third-party widget as backup

## 📞 Support

If you need help:
1. Check Google Places API documentation
2. Review the component code comments
3. Test with mock data first
4. Use browser dev tools to debug API calls

## 🎯 Best Practices

1. **Start with mock data** for development
2. **Test API integration** in staging environment
3. **Implement proper error handling**
4. **Cache reviews** to reduce API calls
5. **Monitor costs** and usage
6. **Have a fallback plan** for API failures

---

**Ready to implement?** Start with Method 1 (Google Places API) for the best results!
