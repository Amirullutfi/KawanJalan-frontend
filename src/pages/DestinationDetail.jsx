import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Calendar, Compass } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackDestinations } from '../data/fallbackData';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        // Try fetching with cache
        let data = await fetchWithCache(`/destinations/${id}`, null);
        
        // If not found (backend down and no specific detail cache), search in the cached full list or static fallback
        if (!data) {
          const allCached = localStorage.getItem('cached__destinations');
          const allDestinations = allCached ? JSON.parse(allCached) : fallbackDestinations;
          data = allDestinations.find(item => item.id.toString() === id.toString());
        }

        if (data) {
          setDestination(data);
          
          // Fetch related destinations in same category
          if (data.category_id) {
            const relatedData = await fetchWithCache(
              `/destinations?category_id=${data.category_id}`,
              fallbackDestinations.filter(item => item.category_id.toString() === data.category_id.toString())
            );
            const filteredRelated = relatedData.filter(
              item => item.id.toString() !== data.id.toString()
            );
            setRelated(filteredRelated.slice(0, 3));
          }
        } else {
          setError('Destinasi tidak ditemukan.');
        }
      } catch (err) {
        console.error('Error fetching destination detail:', err);
        setError('Gagal memuat detail destinasi wisata.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Memuat detail destinasi...</div>;
  }

  if (error || !destination) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error || 'Destinasi tidak ditemukan'}</h3>
        <Link to="/destinations" className="btn btn-primary">
          <ArrowLeft size={16} /> Kembali ke Destinasi
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px' }} className="animate-fade-in">
      {/* Big Hero Banner */}
      <div style={{
        height: '450px',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.7)), url(${getMediaUrl(destination.main_image)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        color: 'white',
        paddingBottom: '40px'
      }}>
        <div className="container">
          <Link to="/destinations" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            backdropFilter: 'blur(4px)',
            fontSize: '0.9rem'
          }}>
            <ArrowLeft size={16} /> Kembali
          </Link>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {destination.category?.name}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
            {destination.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            <MapPin size={18} style={{ color: 'var(--secondary)' }} />
            <span style={{ fontWeight: 500 }}>{destination.location}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container" style={{ marginTop: '50px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '7fr 3fr',
          gap: '40px'
        }} className="detail-layout">
          {/* Left Column: Description */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--dark)' }}>Tentang {destination.title}</h2>
            <div style={{
              fontSize: '1.05rem',
              color: 'var(--dark-soft)',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap'
            }}>
              {destination.description || 'Deskripsi lengkap belum tersedia untuk destinasi ini.'}
            </div>
          </div>

          {/* Right Column: Sidebar (Related Destinations) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Quick Information Box */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--dark)' }}>Informasi Wisata</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Kategori Wisata</p>
                  <p style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '0.95rem' }}>{destination.category?.name}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Wilayah Administratif</p>
                  <p style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '0.95rem' }}>{destination.location}</p>
                </div>
              </div>
            </div>

            {/* Related Destinations */}
            {related.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--dark)' }}>Destinasi Terkait</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      to={`/destinations/${item.id}`}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0',
                        padding: '8px'
                      }}
                      onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                      onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                    >
                      <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
                        <img
                          src={getMediaUrl(item.main_image)}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '4px' }}>{item.title}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <MapPin size={12} style={{ color: 'var(--primary)' }} />
                          <span>{item.location.split(',')[0]}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default DestinationDetail;
