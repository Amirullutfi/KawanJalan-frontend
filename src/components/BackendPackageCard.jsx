import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../services/api';

const stripHtml = (htmlString) => {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const BackendPackageCard = ({ pkg, onClick }) => {
  const isMerapi = pkg.title.toLowerCase().includes('merapi');

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'var(--transition)',
        position: 'relative',
        height: '100%'
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div>
        <div 
          style={{ height: '240px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
          onClick={() => onClick(pkg)}
        >
          {isMerapi && (
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '-32px',
              background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
              color: 'white',
              padding: '6px 30px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              transform: 'rotate(-45deg)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              zIndex: 10,
              textAlign: 'center',
              width: '130px',
              pointerEvents: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              PROMO 🎁
            </div>
          )}
          <img
            src={getMediaUrl(pkg.main_image)}
            alt={pkg.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        
        {isMerapi && (
          <div style={{
            backgroundColor: '#f0fdf4',
            borderBottom: '1px solid #dcfce7',
            padding: '8px 24px',
            fontSize: '0.8rem',
            color: '#15803d',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderLeft: '4px solid #22c55e'
          }}>
            <span>🎁 Free Jas Hujan & Air Mineral</span>
          </div>
        )}

        <div style={{ padding: '24px' }}>
          <h3 
            style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: 'var(--dark)', cursor: 'pointer', transition: 'color 0.2s' }}
            onClick={() => onClick(pkg)}
            onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--dark)'}
          >
            {pkg.title}
          </h3>
          <div style={{ 
            color: 'var(--text-muted)', 
            fontSize: '0.9rem', 
            marginBottom: '20px', 
            lineHeight: 1.6,
            height: '72px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
            {stripHtml(pkg.description)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: 'var(--primary)' }} />
              <span>Durasi: <strong>{pkg.duration}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} style={{ color: 'var(--primary)' }} />
              <span>Satuan Unit: <strong>Per {pkg.price_unit}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #f1f5f9',
        backgroundColor: 'var(--light-soft)'
      }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>Tarif Paket</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)', margin: 0 }}>
            Rp {numberFormat(pkg.price)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/{pkg.price_unit}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => onClick(pkg)} 
            className="btn btn-outline" 
            style={{ padding: '8px 14px', borderRadius: '8px', borderWidth: '1px', fontSize: '0.85rem' }}
          >
            Rincian
          </button>
          {pkg.title.toLowerCase().includes('bromo') ? (
            <button className="btn btn-secondary" style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'not-allowed', opacity: 0.7 }} disabled>
              Belum Tersedia
            </button>
          ) : (
            <Link 
              to={`/booking/${pkg.id}`} 
              className="btn btn-primary" 
              style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              Booking
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackendPackageCard;
