import React, { useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { ChevronDown, Calendar, Navigation, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = TRANSLATIONS[lang];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Liturgical candle-light embers particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class definition
    class Ember {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      opacity: number = 0;
      decay: number = 0;

      constructor() {
        this.reset();
        // Stagger initial Y coordinate so they don't all spawn at bottom initially
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.7 + 0.3);
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.decay = Math.random() * 0.002 + 0.001;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= this.decay;

        if (this.opacity <= 0 || this.y < 0 || this.x < 0 || this.x > width) {
          this.reset();
        }
      }

      draw(cContext: CanvasRenderingContext2D) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cContext.fillStyle = `rgba(212, 171, 21, ${this.opacity})`;
        cContext.shadowBlur = this.size * 3;
        cContext.shadowColor = '#d4ab15';
        cContext.fill();
        cContext.shadowBlur = 0; // reset
      }
    }

    const embers: Ember[] = Array.from({ length: 15 }, () => new Ember());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a subtle radial golden gradient simulating an altar sanctuary center glow
      const radialGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        width * 0.7
      );
      
      // We will draw particles directly on top of the DOM background so we keep canvas transparent
      embers.forEach((ember) => {
        ember.update();
        ember.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-byz-blue-950 via-byz-blue-900 to-byz-blue-950 border-b border-byz-blue-900"
    >
      {/* Absolute background color and lighting layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-gold-600/10 dark:bg-gold-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-crimson-900/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold-950/20 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Subtle geometric orthodox pattern lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#d4ab15_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Embedded Live Interactive Ember Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none" 
      />

      {/* Liturgical Altar Banner Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16">
        
        {/* Triple Byzantine Bar cross graphic in Gold */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <div className="relative p-4 rounded-full bg-gold-500/5 border border-gold-400/25 max-w-max">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className="w-12 h-12 text-gold-400"
            >
              <path d="M12 2v20" />              {/* Main Vertical Bar */}
              <path d="M7 6h10" />                {/* Upper Horizontal Bar */}
              <path d="M5 11h14" />              {/* Main Horizontal Bar */}
              <path d="M8.5 19.5l7-3.5" />         {/* Footrest Slanted Bar */}
            </svg>
          </div>
        </motion.div>

        {/* Small Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans text-xs sm:text-sm tracking-[0.25em] font-semibold text-gold-400 uppercase mb-3"
        >
          {t.heroTagline}
        </motion.p>

        {/* Deep, Elegant Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1] mb-6"
        >
          {t.heroTitle}
        </motion.h1>

        {/* Graceful Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto font-serif text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed italic mb-10"
        >
          "{t.heroSubtitle}"
        </motion.p>

        {/* Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => smoothScrollTo('services')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-950 rounded-xl font-medium tracking-wider text-xs uppercase shadow-[0_4px_24px_rgba(212,171,21,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Calendar size={15} />
            <span>{t.heroSchedulesBtn}</span>
          </button>
          
          <button
            onClick={() => smoothScrollTo('contact')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-stone-800/80 hover:bg-stone-850 text-gold-200 border border-gold-500/30 hover:border-gold-500/60 rounded-xl font-medium tracking-wider text-xs uppercase transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5"
          >
            <Navigation size={14} />
            <span>{t.heroContactBtn}</span>
          </button>
        </motion.div>
        
        {/* Micro indicator of Archdiocese */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-14 inline-flex items-center space-x-2 border border-stone-800 bg-stone-900/50 px-4 py-2 rounded-full text-xs text-stone-400 font-serif italic"
        >
          <Heart size={10} className="text-crimson-500 animate-pulse" />
          <span>Under the Archdiocese of the British Isles and Ireland</span>
        </motion.div>
      </div>

      {/* Down Chevron link indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.button
          onClick={() => smoothScrollTo('services')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="p-2 text-stone-400 hover:text-gold-400 transition-colors"
          aria-label="Scroll Down"
        >
          <ChevronDown size={28} />
        </motion.button>
      </div>
    </section>
  );
}
