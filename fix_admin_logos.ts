import fs from 'fs';

let admin = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Add state for Logos
if (!admin.includes('const [logos, setLogos]')) {
  admin = admin.replace(
    'const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);',
    'const [galleryVideos, setGalleryVideos] = useState<GalleryVideo[]>([]);\n  const [logos, setLogos] = useState({ mainLogoUrl: "", canonicalLogoUrl: "" });\n  const [isServicesOpen, setIsServicesOpen] = useState(false);\n  const [isLogosOpen, setIsLogosOpen] = useState(false);'
  );
}

// Add ChevronDown to lucide-react imports if not there
if (!admin.includes('ChevronDown')) {
  admin = admin.replace(
    'Image as ImageIcon',
    'Image as ImageIcon, ChevronDown, ChevronUp'
  );
}

// Fetch logos
if (!admin.includes('setLogos(data.logos')) {
  admin = admin.replace(
    'setGalleryVideos(data.galleryVideos || []);',
    'setGalleryVideos(data.galleryVideos || []);\n        if (data.logos) setLogos({ mainLogoUrl: data.logos.mainLogoUrl || "", canonicalLogoUrl: data.logos.canonicalLogoUrl || "" });'
  );
}

// Save logos
if (!admin.includes('logos: logos')) {
  admin = admin.replace(
    'galleryVideos',
    'galleryVideos,\n        logos: logos'
  );
}

fs.writeFileSync('src/components/AdminPanel.tsx', admin);
