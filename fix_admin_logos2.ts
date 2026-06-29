import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// 1. Add state for logos
if (!admin.includes('const [logos, setLogos]')) {
  admin = admin.replace(
    'const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);',
    'const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);\n  const [logos, setLogos] = useState({ mainLogoUrl: "", canonicalLogoUrl: "" });'
  );
}

// 2. Load logos
if (!admin.includes('setLogos(')) {
  admin = admin.replace(
    'setGalleryVideos(data.galleryVideos);',
    'setGalleryVideos(data.galleryVideos);\n      if (data.logos) { setLogos({ mainLogoUrl: data.logos.mainLogoUrl || "", canonicalLogoUrl: data.logos.canonicalLogoUrl || "" }); }'
  );
}

// 3. Update all saveParishData calls to include logos
admin = admin.replace(/saveParishData\(\{ announcement, services, galleryPhotos, galleryVideos \}\)/g, 'saveParishData({ announcement, services, galleryPhotos, galleryVideos, logos })');
admin = admin.replace(/saveParishData\(\{ announcement, services, galleryPhotos: updatedPhotos, galleryVideos \}\)/g, 'saveParishData({ announcement, services, galleryPhotos: updatedPhotos, galleryVideos, logos })');
admin = admin.replace(/saveParishData\(\{ announcement, services, galleryPhotos, galleryVideos: updatedVideos \}\)/g, 'saveParishData({ announcement, services, galleryPhotos, galleryVideos: updatedVideos, logos })');

admin = admin.replace(
  'galleryPhotos,\n        galleryVideos\n      });',
  'galleryPhotos,\n        galleryVideos,\n        logos\n      });'
);

// 4. Add dropbars (accordions)
// First, import icons
if (!admin.includes('ChevronDown')) {
  admin = admin.replace(
    'Image as ImageIcon',
    'Image as ImageIcon, ChevronDown, ChevronUp'
  );
}

// Add state for accordions
if (!admin.includes('const [isServicesOpen, setIsServicesOpen]')) {
  admin = admin.replace(
    'const [isPreviewOpen, setIsPreviewOpen] = useState(false);',
    'const [isPreviewOpen, setIsPreviewOpen] = useState(false);\n  const [isServicesOpen, setIsServicesOpen] = useState(false);\n  const [isLogosOpen, setIsLogosOpen] = useState(false);'
  );
}

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
