import React, { useState, useEffect } from 'react';
import { Sparkles, Camera, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
  {
    id: 'g1',
    spotName: 'Manuver air',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    altText: 'Aksi Jeep offroad melintasi air Kali Kuning Merapi dengan cipratan air yang dramatis'
  },
  {
    id: 'g2',
    spotName: 'Museum mini',
    imageUrl: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800',
    altText: 'Museum Mini Sisa Hartaku mengoleksi barang-barang warga yang meleleh akibat awan panas Merapi'
  },
  {
    id: 'g3',
    spotName: 'Omahku memoriku',
    imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800',
    altText: 'Bangunan bersejarah saksi bisu erupsi Gunung Merapi dengan puing-puing peninggalan warga'
  },
  {
    id: 'g4',
    spotName: 'Batu alien',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800',
    altText: 'Batu vulkanik besar mirip wajah alien yang terlempar saat letusan Gunung Merapi'
  },
  {
    id: 'g5',
    spotName: 'Petilasan mbah maridjan',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    altText: 'Kawasan bersejarah bekas rumah juru kunci Gunung Merapi Mbah Maridjan di Dusun Kinahrejo'
  },
  {
    id: 'g6',
    spotName: 'Bungker Kaliadem',
    imageUrl: 'https://images.unsplash.com/photo-1626082896492-766af4fc6595?w=800',
    altText: 'Pemandangan gagah Gunung Merapi dari atas Bunker Kaliadem di pagi hari'
  },
  {
    id: 'g7',
    spotName: 'Stonehenge',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?w=800',
    altText: 'Replika Stonehenge di lereng Gunung Merapi dengan tumpukan batu megah berlatar pemandangan hijau'
  },
  {
    id: 'g8',
    spotName: 'The lost world park',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    altText: 'Kastil megah The Lost World Castle di lereng Merapi dengan awan kabut tipis yang estetik'
  }
];

const SPOTS = [
  'Semua Spot',
  'Manuver air',
  'Museum mini',
  'Omahku memoriku',
  'Batu alien',
  'Petilasan mbah maridjan',
  'Bungker Kaliadem',
  'Stonehenge',
  'The lost world park'
];

const Gallery = () => {
  const [selectedSpot, setSelectedSpot] = useState('Semua Spot');
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSpotChange = (spot) => {
    setSelectedSpot(spot);
  };

  const filteredGallery = selectedSpot === 'Semua Spot'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.spotName.toLowerCase() === selectedSpot.toLowerCase());

  return (
    <div style={{ overflow: 'hidden', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '80px 0 60px',
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-soft) 100%)',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Floating background decorative orbs */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.2) 0%, rgba(0,0,0,0) 70%)',
          top: '-50px',
          left: '10%',
          transform: `translateY(${scrollPosition * 0.1}px)`,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(13, 148, 136, 0.2)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            color: 'var(--primary-light)',
            marginBottom: '20px',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            <Camera size={16} /> Keindahan Lereng Merapi & Bromo
          </div>
          
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3rem',
            lineHeight: 1.2,
            marginBottom: '16px'
          }}>
            Galeri Spot Destinasi
          </h1>
          
          <p style={{
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '1.05rem'
          }}>
            Koleksi potret keseruan perjalanan dan panorama alam megah yang diabadikan oleh fotografer profesional kami.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          
          {/* Back button */}
          <div style={{ marginBottom: '32px' }}>
            <Link to="/documentation" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <ArrowLeft size={16} /> Kembali ke Halaman Dokumentasi
            </Link>
          </div>

          {/* Spot Filter Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            {SPOTS.map((spot) => (
              <button
                key={spot}
                onClick={() => handleSpotChange(spot)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.08)',
                  backgroundColor: selectedSpot === spot ? 'var(--primary)' : 'white',
                  color: selectedSpot === spot ? 'white' : 'var(--text-muted)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                {spot}
              </button>
            ))}
          </div>

          {/* Anti-Gravity Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}>
            {filteredGallery.map((item, index) => {
              const animationDelay = `${index * 0.08}s`;
              const floatDirection = index % 2 === 0 ? 'float' : 'float-opposite';

              return (
                <div
                  key={item.id}
                  className="gallery-item-card"
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    backgroundColor: '#e2e8f0',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'var(--transition)',
                    aspectRatio: index % 3 === 0 ? '3/4' : '1/1',
                    animation: `${floatDirection} 6s ease-in-out infinite alternate`,
                    animationDelay: animationDelay
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                    className="gallery-image"
                  />
                  
                  {/* Overlay on Hover */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 2
                  }} className="gallery-overlay">
                    <span style={{
                      backgroundColor: 'var(--secondary)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: '4px',
                      width: 'fit-content',
                      marginBottom: '10px'
                    }}>
                      SPOT WISATA
                    </span>
                    <h4 style={{
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {item.spotName}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded Animations and Hover CSS styles */}
      <style>{`
        .gallery-item-card:hover {
          transform: scale(1.03) translateY(-8px) !important;
          box-shadow: var(--shadow-lg) !important;
          z-index: 10;
          animation-play-state: paused !important;
        }
        
        .gallery-item-card:hover .gallery-image {
          transform: scale(1.05);
        }
        
        .gallery-item-card:hover .gallery-overlay {
          opacity: 1 !important;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-12px) rotate(0.8deg); }
        }
        
        @keyframes float-opposite {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(12px) rotate(-0.8deg); }
        }

        @media (max-width: 768px) {
          .gallery-item-card {
            animation: none !important;
            aspect-ratio: 1/1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
