import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1600&q=80',
    title: 'Eksotisme Gunung Bromo',
    tagline: 'Nikmati keindahan sunrise magis di atas lautan pasir vulkanik Jawa Timur.',
    cta: 'Lihat Destinasi',
    link: '/destinations'
  },
  {
    image: 'https://images.unsplash.com/photo-1626082896492-766af4fc6595?auto=format&fit=crop&w=1600&q=80',
    title: 'Pesona Lereng Gunung Merapi',
    tagline: 'Uji adrenalin Anda dengan petualangan jeep offroad menyusuri sisa erupsi bersejarah.',
    cta: 'Pilih Paket Tour',
    link: '/packages'
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
    title: 'Keindahan Pantai Parangtritis',
    tagline: 'Saksikan sunset romantis berlatar belakang tebing karang dan hamparan gumuk pasir legendaris.',
    cta: 'Jelajahi Sekarang',
    link: '/destinations'
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="hero-slider-container" style={{
      position: 'relative',
      height: '650px',
      overflow: 'hidden',
      backgroundColor: '#0f172a'
    }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: index === current ? 1 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.75)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textAlign: 'center'
          }}
        >
          {index === current && (
            <div className="container" style={{
              maxWidth: '800px',
              animation: 'fadeInUp 0.8s ease'
            }}>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.5rem',
                fontWeight: 700,
                marginBottom: '16px',
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }} className="slide-title">
                {slide.title}
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: '#cbd5e1',
                marginBottom: '32px',
                lineHeight: 1.5,
                textShadow: '0 2px 5px rgba(0,0,0,0.5)'
              }}>
                {slide.tagline}
              </p>
              <a href={slide.link} className="btn btn-primary" style={{
                padding: '14px 30px',
                fontSize: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(13, 148, 136, 0.4)'
              }}>
                {slide.cta}
              </a>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hero-nav-btn"
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          transition: 'var(--transition)',
          backdropFilter: 'blur(4px)'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hero-nav-btn"
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          transition: 'var(--transition)',
          backdropFilter: 'blur(4px)'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 2
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: index === current ? '30px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: index === current ? 'var(--primary)' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          />
        ))}
      </div>

      {/* Add responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-slider-container { height: 450px !important; }
          .slide-title { font-size: 2rem !important; }
          .hero-nav-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
