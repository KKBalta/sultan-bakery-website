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
