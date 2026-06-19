import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Tag, ArrowRight } from 'lucide-react';

const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const TourPackageCard = ({ data, onViewAll }) => {
  const { packageName, price, destinations, id } = data;
  
  // Ambil maksimal 3 destinasi untuk ditampilkan di card
  const displayDestinations = destinations.slice(0, 3);
  const hasMore = destinations.length > 3;

  // Gunakan gambar placeholder statis bertema Jogja/Candi
  const placeholderImage = "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80";

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
          onClick={() => onViewAll(data)}
        >
          <img
            src={placeholderImage}
            alt={packageName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        
        <div style={{ padding: '24px' }}>
          <h3 
            style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px', color: 'var(--dark)', cursor: 'pointer', transition: 'color 0.2s' }}
            onClick={() => onViewAll(data)}
            onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--dark)'}
          >
            {packageName}
          </h3>
          
          <div style={{ marginBottom: '20px', minHeight: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--dark-soft)' }}>
              <MapPin size={16} style={{ color: 'var(--primary)' }} />
              <span>Rute Perjalanan:</span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {displayDestinations.map((dest, index) => (
                <span 
                  key={index} 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary-hover)',
                    border: '1px solid rgba(13, 148, 136, 0.2)'
                  }}
                >
                  {dest}
                </span>
              ))}
              {hasMore && (
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: 'var(--light-soft)',
                    color: 'var(--text-muted)',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}
                  onClick={() => onViewAll(data)}
                >
                  +{destinations.length - 3} lainnya
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: 'var(--primary)' }} />
              <span>Durasi: <strong>12 Jam/Hari</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} style={{ color: 'var(--primary)' }} />
              <span>Satuan Unit: <strong>Per Mobil</strong></span>
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
            Rp {numberFormat(price)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/mobil</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => onViewAll(data)} 
            className="btn btn-outline" 
            style={{ padding: '8px 14px', borderRadius: '8px', borderWidth: '1px', fontSize: '0.85rem' }}
          >
            Rincian
          </button>
          <Link 
            to={`/booking/${id}`} 
            className="btn btn-primary" 
            style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPackageCard;
