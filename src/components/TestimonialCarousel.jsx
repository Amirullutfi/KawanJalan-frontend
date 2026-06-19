import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import api, { fetchWithCache, getMediaUrl } from '../services/api';
import { fallbackTestimonials } from '../data/fallbackData';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await fetchWithCache('/testimonials', fallbackTestimonials);
        setTestimonials(data);
      } catch (error) {
        console.error('Gagal mengambil data testimoni:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat ulasan...</div>;
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '40px'
    }}>
      {testimonials.map((testi) => (
        <div
          key={testi.id}
          className="glass animate-fade-in-up"
          style={{
            padding: '32px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'var(--transition)',
            cursor: 'default'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.4)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
        >
          {/* Quote Icon */}
          <MessageSquare
            size={40}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: 'rgba(13, 148, 136, 0.08)',
              zIndex: 0
            }}
          />

          {/* Rating */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', zIndex: 1 }}>
            {Array.from({ length: testi.rating }).map((_, i) => (
              <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>

          {/* Quote Text */}
          <p style={{
            fontSize: '0.98rem',
            color: 'var(--dark-soft)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            marginBottom: '24px',
            zIndex: 1,
            position: 'relative'
          }}>
            "{testi.quote}"
          </p>

          {/* Client Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
            <img
              src={getMediaUrl(testi.image)}
              alt={testi.name}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary-light)'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'; // fallback avatar
              }}
            />
            <div>
              <h5 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{testi.name}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{testi.profession || 'Pelanggan KawanJalan Tour & Travel'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCarousel;
