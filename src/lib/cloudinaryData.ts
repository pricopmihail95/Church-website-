import { Service, GalleryPhoto, GalleryVideo } from '../types';
import { SERVICES_SCHEDULING } from '../data';

export interface ParishData {
  announcement: {
    roTitle: string;
    roText: string;
    enTitle: string;
    enText: string;
    active: boolean;
  };
  services: Service[];
  galleryPhotos: GalleryPhoto[];
  galleryVideos: GalleryVideo[];
}

export const DEFAULT_PARISH_DATA: ParishData = {
  announcement: {
    roTitle: 'Anunț Important',
    roText: 'Slujbele noastre de duminică încep cu Utrenia la ora 09:00 și Sfânta Liturghie la 10:00.',
    enTitle: 'Important Announcement',
    enText: 'Our Sunday services begin with Matins at 09:00 and Holy Liturgy at 10:00.',
    active: false,
  },
  services: SERVICES_SCHEDULING,
  galleryPhotos: [],
  galleryVideos: []
};

export async function fetchParishData(): Promise<ParishData> {
  const timestamp = Date.now();
  // Fetch from multiple potential URLs to handle Cloudinary raw or image upload path resolution
  const urls = [
    `https://res.cloudinary.com/da4ywersp/raw/upload/parish_data.json?t=${timestamp}`,
    `https://res.cloudinary.com/da4ywersp/raw/upload/parish_data?t=${timestamp}`,
    `https://res.cloudinary.com/da4ywersp/image/upload/parish_data.json?t=${timestamp}`,
    `https://res.cloudinary.com/da4ywersp/image/upload/parish_data?t=${timestamp}`
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        // Check if response is valid JSON
        if (text && text.trim().startsWith('{')) {
          const data = JSON.parse(text);
          if (data && typeof data === 'object' && (data.services || data.announcement)) {
            // Save local cache backup
            localStorage.setItem('parish_live_data', text);
            return {
              announcement: data.announcement || DEFAULT_PARISH_DATA.announcement,
              services: Array.isArray(data.services) ? data.services : DEFAULT_PARISH_DATA.services,
              galleryPhotos: Array.isArray(data.galleryPhotos) ? data.galleryPhotos : (Array.isArray(data.photos) ? data.photos : []),
              galleryVideos: Array.isArray(data.galleryVideos) ? data.galleryVideos : (Array.isArray(data.videos) ? data.videos : [])
            };
          }
        }
      }
    } catch (e) {
      console.warn(`Failed to fetch from ${url}:`, e);
    }
  }

  // Fallback to localStorage
  const local = localStorage.getItem('parish_live_data');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      return {
        announcement: parsed.announcement || DEFAULT_PARISH_DATA.announcement,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_PARISH_DATA.services,
        galleryPhotos: Array.isArray(parsed.galleryPhotos) ? parsed.galleryPhotos : (Array.isArray(parsed.photos) ? parsed.photos : []),
        galleryVideos: Array.isArray(parsed.galleryVideos) ? parsed.galleryVideos : (Array.isArray(parsed.videos) ? parsed.videos : [])
      };
    } catch (e) {
      console.error('Error parsing local fallback data:', e);
    }
  }

  return DEFAULT_PARISH_DATA;
}

export async function saveParishData(data: ParishData): Promise<boolean> {
  const dataStr = JSON.stringify(data);
  localStorage.setItem('parish_live_data', dataStr);

  try {
    const blob = new Blob([dataStr], { type: 'application/json' });
    const file = new File([blob], 'parish_data.json');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset_biserica');
    formData.append('public_id', 'parish_data.json');

    // Try standard raw upload first
    const response = await fetch('https://api.cloudinary.com/v1_1/da4ywersp/raw/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Saved to Cloudinary raw/upload successfully');
      return true;
    } else {
      console.warn(`raw/upload failed with status ${response.status}, trying fallback image/upload...`);
    }
  } catch (e) {
    console.warn('raw/upload failed, trying fallback image/upload...', e);
  }

  // Fallback: try uploading as image/upload (some presets restrict raw files but allow any file as image/upload)
  try {
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const file = new File([blob], 'parish_data.json');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset_biserica');
    formData.append('public_id', 'parish_data.json');

    const response = await fetch('https://api.cloudinary.com/v1_1/da4ywersp/image/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Saved to Cloudinary image/upload successfully');
      return true;
    }
  } catch (err) {
    console.error('All Cloudinary upload strategies failed:', err);
  }

  return false;
}
