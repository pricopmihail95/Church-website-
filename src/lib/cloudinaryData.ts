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
  try {
    const res = await fetch('/api/parish-data');
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    const data = await res.json();

    const validatedData: ParishData = {
      announcement: data.announcement || DEFAULT_PARISH_DATA.announcement,
      services: Array.isArray(data.services) ? data.services : DEFAULT_PARISH_DATA.services,
      galleryPhotos: Array.isArray(data.galleryPhotos) ? data.galleryPhotos : [],
      galleryVideos: Array.isArray(data.galleryVideos) ? data.galleryVideos : []
    };

    localStorage.setItem('parish_live_data', JSON.stringify(validatedData));
    return validatedData;
  } catch (error) {
    console.warn('Error fetching from Server API, trying local storage fallback:', error);
    const local = localStorage.getItem('parish_live_data');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          announcement: parsed.announcement || DEFAULT_PARISH_DATA.announcement,
          services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_PARISH_DATA.services,
          galleryPhotos: Array.isArray(parsed.galleryPhotos) ? parsed.galleryPhotos : [],
          galleryVideos: Array.isArray(parsed.galleryVideos) ? parsed.galleryVideos : []
        };
      } catch (e) {
        console.error('Error parsing local fallback data:', e);
      }
    }
    return DEFAULT_PARISH_DATA;
  }
}

export async function saveParishData(data: ParishData): Promise<boolean> {
  const dataStr = JSON.stringify(data);
  localStorage.setItem('parish_live_data', dataStr);

  try {
    const res = await fetch('/api/parish-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataStr
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const result = await res.json();
    console.log('Successfully saved all parish settings to Server API!');
    return !!result.success;
  } catch (error) {
    console.error('Error saving to Server API:', error);
    return false;
  }
}
