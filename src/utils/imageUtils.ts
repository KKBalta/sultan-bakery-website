// Image utilities for handling profile photos and CORS issues

/**
 * Generate initials from a name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate a gradient background color based on name
 */
export const getGradientColor = (name: string): string => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  ];
  
  // Use name hash to consistently assign colors
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Create a proxy URL for Google profile images
 */
export const getProxyImageUrl = (originalUrl: string): string => {
  if (!originalUrl) return '';
  
  // Try different proxy services for images
  const proxies = [
    `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}`,
    `https://cors-anywhere.herokuapp.com/${originalUrl}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`
  ];
  
  // Return the first proxy (weserv.nl is good for images)
  return proxies[0];
};

/**
 * Handle image loading with fallback
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
  const target = event.target as HTMLImageElement;
  const parent = target.parentElement;
  
  if (parent) {
    const initials = getInitials(name);
    const gradient = getGradientColor(name);
    
    parent.innerHTML = `
      <div class="w-full h-full flex items-center justify-center text-white font-bold text-sm" 
           style="background: ${gradient};">
        ${initials}
      </div>
    `;
  }
};

/**
 * Create avatar component props
 */
export const createAvatarProps = (name: string, profilePhotoUrl?: string) => {
  return {
    name,
    profilePhotoUrl,
    initials: getInitials(name),
    gradient: getGradientColor(name),
    proxyUrl: profilePhotoUrl ? getProxyImageUrl(profilePhotoUrl) : null
  };
};

/**
 * Converts Google Drive file ID or URL to direct image URL using thumbnail service
 * @param input - Google Drive file ID or full URL
 * @param size - Image size (default: w1000 for 1000px width)
 * @returns Direct image URL that can be used in img src
 */
export const getGoogleDriveImageUrl = (input: string, size: string = 'w1000'): string => {
  // If it's already a direct image URL, return as is
  if (input.includes('drive.google.com/uc?export=view&id=') || input.includes('drive.google.com/thumbnail?id=')) {
    return input;
  }

  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  if (input.includes('drive.google.com/file/d/')) {
    // Extract from: https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
    const match = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    fileId = match ? match[1] : '';
  } else if (input.includes('drive.google.com/open?id=')) {
    // Extract from: https://drive.google.com/open?id=FILE_ID
    const match = input.match(/id=([a-zA-Z0-9_-]+)/);
    fileId = match ? match[1] : '';
  } else if (input.match(/^[a-zA-Z0-9_-]+$/)) {
    // If it's just a file ID
    fileId = input;
  }

  if (!fileId) {
    console.warn('Could not extract Google Drive file ID from:', input);
    return input; // Return original if we can't parse it
  }

  // Return Google Drive thumbnail service URL (more reliable)
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
};

/**
 * Validates if a URL is a valid Google Drive image URL
 * @param url - URL to validate
 * @returns boolean indicating if it's a valid Google Drive image URL
 */
export const isValidGoogleDriveImageUrl = (url: string): boolean => {
  return url.includes('drive.google.com/uc?export=view&id=') && 
         url.match(/id=([a-zA-Z0-9_-]+)/) !== null;
};

/**
 * Processes any image URL to ensure it's in the correct format
 * Handles Google Drive URLs, regular URLs, and file IDs
 * @param imageUrl - Any image URL or Google Drive link
 * @returns Properly formatted image URL
 */
export const processImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // If it's a Google Drive URL, convert it
  if (imageUrl.includes('drive.google.com')) {
    return getGoogleDriveImageUrl(imageUrl);
  }
  
  // If it's already a proper URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path, return as is
  return imageUrl;
};

/**
 * Creates multiple fallback URLs for Google Drive images
 * @param input - Google Drive file ID or full URL
 * @returns Array of URLs to try in order
 */
export const getGoogleDriveFallbackUrls = (input: string): string[] => {
  const fileId = extractGoogleDriveFileId(input);
  if (!fileId) return [input];

  return [
    // Method 1: Direct Googleusercontent URL (most reliable for public files)
    `https://lh3.googleusercontent.com/d/${fileId}=w1000`,
    // Method 2: Thumbnail service (redirects to googleusercontent)
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    // Method 3: Alternative googleusercontent size
    `https://lh3.googleusercontent.com/d/${fileId}=w800`,
    // Method 4: Thumbnail service with different size
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,
    // Method 5: Direct export (fallback)
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    // Method 6: Alternative export format
    `https://drive.google.com/uc?export=download&id=${fileId}`
  ];
};

/**
 * Extracts Google Drive file ID from various URL formats
 * @param input - Google Drive URL or file ID
 * @returns File ID or empty string if not found
 */
export const extractGoogleDriveFileId = (input: string): string => {
  if (input.includes('drive.google.com/file/d/')) {
    const match = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  } else if (input.includes('drive.google.com/open?id=')) {
    const match = input.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  } else if (input.match(/^[a-zA-Z0-9_-]+$/)) {
    return input;
  }
  return '';
};
