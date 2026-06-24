import React, { useState, useEffect } from 'react';
import { Language, GalleryPhoto, GalleryVideo } from '../types';
import { fetchParishData } from '../lib/cloudinaryData';
import { Image, Video, Play, ExternalLink, Calendar, Film, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  lang: Language;
  isSeparatePage?: boolean;
}

function getYoutubeId(url: string): string | null {
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  } catch (e) {
    return null;
  }
}

export default function GallerySection({ lang, isSeparatePage = false }: GallerySectionProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  // Load photos and videos in real-time from Cloudinary (with backup)
  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await fetchParishData();
        if (!active) return;

        if (data.galleryPhotos) {
          const sortedPhotos = [...data.galleryPhotos].sort((a, b) => b.createdAt - a.createdAt);
          setPhotos(sortedPhotos);
        }
        if (data.galleryVideos) {
          const sortedVideos = [...data.galleryVideos].sort((a, b) => b.createdAt - a.createdAt);
          setVideos(sortedVideos);
        }
      } catch (error) {
        console.error('Error fetching gallery settings:', error);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    // Poll every 15 seconds to receive new live updates
    const interval = setInterval(load, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-byz-blue-50/20 dark:bg-byz-blue-950 border-b border-byz-blue-100 dark:border-byz-blue-900 text-center text-stone-500">
        <div className="max-w-7xl mx-auto px-4">
          <p className="animate-pulse font-serif italic text-sm">
            {lang === 'RO' ? 'Se deschide albumul parohial...' : 'Opening the parish album...'}
          </p>
        </div>
      </section>
    );
  }

  if (!isSeparatePage) {
    // Teaser / Door Mode on the home page
    return (
      <section id="gallery" className="py-24 bg-byz-blue-50/20 dark:bg-byz-blue-950 border-b border-byz-blue-100/70 dark:border-byz-blue-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Descriptive Content Door - Left Side */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 text-amber-700 dark:text-gold-400 font-mono text-[10px] uppercase tracking-wider font-semibold border border-gold-500/25">
                <Film size={11} className="text-amber-500" />
                <span>{lang === 'RO' ? 'Viața Parohiei' : 'Parish Life'}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-gold-50">
                {lang === 'RO' ? 'Galerie Foto & Video' : 'Photos & Videos'}
              </h2>
              <p className="font-serif italic text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
                {lang === 'RO' 
                  ? 'Vă invităm să priviți momentele sfinte, slujbele și bucuriile trăite împreună în sufletul micii noastre misiuni.' 
                  : 'We invite you to browse through liturgical moments, services, and warm fellowships celebrated in our small parish family.'}
              </p>
              
              <div className="pt-2">
                <a
                  href="#gallery-page"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '#gallery-page';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="inline-flex items-center space-x-2.5 px-6 py-3 bg-amber-655 text-white bg-amber-600 hover:bg-amber-550 dark:bg-gold-500 dark:text-stone-950 hover:bg-opacity-90 font-bold rounded-full transition-all text-xs uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{lang === 'RO' ? 'Deschide Albumul Complet' : 'Open Full Gallery'}</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Little info row summarizing available media */}
              <div className="pt-4 flex items-center space-x-6 border-t border-stone-200 dark:border-stone-800/60 font-mono text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center space-x-2">
                  <Image size={14} className="text-gold-500" />
                  <span><strong>{photos.length}</strong> {lang === 'RO' ? 'Fotografii' : 'Photos'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video size={14} className="text-gold-500" />
                  <span><strong>{videos.length}</strong> {lang === 'RO' ? 'Videoclipuri' : 'Videos'}</span>
                </div>
              </div>
            </div>

            {/* Photos Preview Doors - Right Side */}
            <div className="lg:col-span-7">
              {photos.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-byz-blue-900/40 border border-byz-blue-100 dark:border-byz-blue-800/60 rounded-3xl">
                  <p className="font-serif italic text-stone-400 text-xs sm:text-sm">
                    {lang === 'RO' ? 'Nicio fotografie publicată momentan.' : 'No photos published at this moment.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {photos.slice(0, 4).map((photo, i) => (
                    <div 
                      key={photo.id}
                      className={`relative overflow-hidden rounded-2xl group border border-stone-200/50 dark:border-stone-800 shadow-sm transition-all duration-300 ${
                        i === 1 ? 'mt-4 sm:mt-6' : i === 2 ? '-mt-4 sm:-mt-6' : ''
                      }`}
                    >
                      <div className="relative aspect-[4/3] bg-byz-blue-50 dark:bg-byz-blue-950">
                        <img
                          src={photo.url}
                          alt={photo.caption || 'Parish photo'}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-byz-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          {photo.caption && (
                            <p className="font-serif italic text-white text-[10px] leading-tight line-clamp-2">
                              {photo.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-byz-blue-50/20 dark:bg-byz-blue-950 border-b border-byz-blue-100 dark:border-byz-blue-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        {isSeparatePage && (
          <div className="mb-8 flex justify-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#home';
              }}
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 dark:text-gold-400 dark:hover:text-gold-300 hover:bg-byz-blue-100 dark:hover:bg-byz-blue-900/50 px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-byz-blue-100 dark:border-byz-blue-800/40"
            >
              <ArrowLeft size={14} />
              <span>{lang === 'RO' ? 'Înapoi la prima pagină' : 'Back to Home'}</span>
            </a>
          </div>
        )}
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 text-amber-700 dark:text-gold-400 font-mono text-[10px] uppercase tracking-wider mb-4 font-semibold border border-gold-500/25">
            <Film size={11} className="text-amber-500" />
            <span>{lang === 'RO' ? 'Viața Parohiei' : 'Parish Life'}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-stone-900 dark:text-gold-50">
            {lang === 'RO' ? 'Galerie Foto & Video' : 'Photos & Videos'}
          </h2>
          <p className="font-serif italic text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'RO' 
              ? 'Momente din viața liturgică a micii noastre misiuni. Rugăciune, bucurie și simplitate în Hristos.' 
              : 'Glimpses into the liturgical and community life of our humble mission. Prayer, joy, and simplicity in Christ.'}
          </p>

          {/* Subtabs to navigate */}
          <div className="mt-8 flex justify-center space-x-2">
            {(['all', 'photos', 'videos'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label = {
                all: lang === 'RO' ? 'Toate' : 'All',
                photos: lang === 'RO' ? 'Fotografii' : 'Photos',
                videos: lang === 'RO' ? 'Materiale Video' : 'Videos'
              }[tab];

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-amber-600 text-white dark:bg-gold-500 dark:text-stone-950 font-semibold shadow-sm' 
                      : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-byz-blue-100/60 dark:hover:bg-byz-blue-900/40'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photos Grid Section */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6 border-b border-byz-blue-100 dark:border-byz-blue-900 pb-2">
              <Image size={16} className="text-amber-600 dark:text-gold-400" />
              <h3 className="font-display text-lg font-bold tracking-tight text-stone-800 dark:text-stone-100">
                {lang === 'RO' ? 'Fotografii Parohiale' : 'Parish Photos'}
              </h3>
              <span className="text-xs text-stone-400 font-mono">({photos.length})</span>
            </div>

            {photos.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-byz-blue-900/30 border border-byz-blue-100 dark:border-byz-blue-850/50 rounded-2xl">
                <p className="font-serif italic text-stone-400 text-xs sm:text-sm">
                  {lang === 'RO' ? 'Nu s-au adăugat fotografii încă.' : 'No photos uploaded yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white dark:bg-byz-blue-900/40 border border-byz-blue-100 dark:border-byz-blue-800/60 p-2.5 rounded-2xl flex flex-col shadow-sm hover:shadow-md hover:border-gold-500/20 transition-all duration-300 group"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-byz-blue-50 dark:bg-byz-blue-950">
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Parish Photo'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                    {photo.caption && (
                      <p className="font-serif italic text-stone-600 dark:text-stone-300 text-xs mt-3 px-1 leading-relaxed text-center">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Videos Grid Section */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div>
            <div className="flex items-center space-x-2 mb-6 border-b border-byz-blue-100 dark:border-byz-blue-900 pb-2">
              <Video size={16} className="text-amber-600 dark:text-gold-400" />
              <h3 className="font-display text-lg font-bold tracking-tight text-stone-800 dark:text-stone-100">
                {lang === 'RO' ? 'Slujbe și Materiale Video' : 'Services & Videos'}
              </h3>
              <span className="text-xs text-stone-400 font-mono">({videos.length})</span>
            </div>

            {videos.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-byz-blue-900/30 border border-byz-blue-100 dark:border-byz-blue-850/50 rounded-2xl">
                <p className="font-serif italic text-stone-400 text-xs sm:text-sm">
                  {lang === 'RO' ? 'Nu s-au adăugat materiale video încă.' : 'No videos added yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {videos.map((video) => {
                  const yid = getYoutubeId(video.url);
                  const isPlaying = playingVideoId === video.id;

                  return (
                    <div
                      key={video.id}
                      className="bg-white dark:bg-byz-blue-900/40 border border-byz-blue-100 dark:border-byz-blue-800/60 p-3 rounded-2xl flex flex-col shadow-sm hover:shadow-md hover:border-gold-500/20 transition-all duration-300"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-byz-blue-950 flex flex-col justify-center items-center group">
                        {isPlaying && yid ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${yid}?autoplay=1`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full border-0 rounded-xl"
                          />
                        ) : (
                          <>
                            {/* YouTube Video Thumbnail */}
                            {yid ? (
                              <img
                                src={`https://img.youtube.com/vi/${yid}/mqdefault.jpg`}
                                alt={video.title}
                                referrerPolicy="no-referrer"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-80"
                                loading="lazy"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-byz-blue-900 flex flex-col items-center justify-center text-stone-500">
                                <Video size={36} />
                              </div>
                            )}

                            {/* Play Button Overlay */}
                            <button
                              onClick={() => {
                                if (yid) setPlayingVideoId(video.id);
                              }}
                              className="relative z-10 w-12 h-12 bg-amber-600/90 text-white dark:bg-gold-500 dark:text-stone-950 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:bg-amber-500 cursor-pointer"
                              aria-label="Play video"
                            >
                              <Play size={18} fill="currentColor" className="ml-0.5" />
                            </button>
                            
                            {yid && (
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute top-2.5 right-2.5 z-10 p-1.5 bg-stone-950/80 hover:bg-stone-900/95 text-stone-300 hover:text-white rounded-lg transition-all text-[10px] flex items-center space-x-1"
                                title="Open in YouTube"
                              >
                                <span>YouTube</span>
                                <ExternalLink size={10} />
                              </a>
                            )}
                          </>
                        )}
                      </div>
                      
                      <h4 className="font-serif font-semibold text-stone-850 dark:text-gold-200 text-sm mt-3.5 px-1 leading-snug">
                        {video.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
