import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight, X } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackPackages } from '../data/fallbackData';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await fetchWithCache('/packages', fallbackPackages);
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const stripHtml = (htmlString) => {
    if (!htmlString) return '';
    return htmlString.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--dark)' }}>Pilihan Paket Wisata</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
            Pilih paket tour yang sesuai dengan keinginan Anda. Kami melayani perjalanan rombongan, privat, maupun sewa armada pariwisata.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Memuat paket wisata...</div>
        ) : packages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Tidak ada paket wisata yang ditawarkan saat ini.</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {packages.map((pkg) => {
              const isMerapi = pkg.title.toLowerCase().includes('merapi');
              return (
              <div
                key={pkg.id}
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
                  position: 'relative'
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
                    onClick={() => setSelectedPackage(pkg)}
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
                      onClick={() => setSelectedPackage(pkg)}
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
                      onClick={() => setSelectedPackage(pkg)} 
                      className="btn btn-outline" 
                      style={{ padding: '8px 14px', borderRadius: '8px', borderWidth: '1px', fontSize: '0.85rem' }}
                    >
                      Rincian
                    </button>
                    <Link 
                      to={`/booking/${pkg.id}`} 
                      className="btn btn-primary" 
                      style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              </div>
            ); })}
          </div>
        )}
      </div>

      {/* Modal for Package Details */}
      {selectedPackage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setSelectedPackage(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            animation: 'slideUp 0.3s ease-out'
          }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              position: 'relative',
              height: '260px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img
                src={getMediaUrl(selectedPackage.main_image)}
                alt={selectedPackage.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)',
                padding: '24px',
                color: 'white'
              }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{selectedPackage.title}</h2>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#cbd5e1', marginTop: '8px' }}>
                  <span>Durasi: <strong>{selectedPackage.duration}</strong></span>
                  <span>Satuan: <strong>Per {selectedPackage.price_unit}</strong></span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPackage(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '30px',
              overflowY: 'auto',
              flexGrow: 1
            }} className="modal-content-area">
              <div 
                style={{ color: 'var(--text-dark)', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: selectedPackage.description }}
              />
            </div>

            {/* Modal Footer */}
            <div className="modal-footer" style={{
              padding: '20px 30px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              flexShrink: 0
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Tarif Paket</span>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)', margin: 0 }}>
                  Rp {numberFormat(selectedPackage.price)} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/{selectedPackage.price_unit}</span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setSelectedPackage(null)}
                  className="btn btn-outline"
                  style={{ padding: '10px 20px', borderRadius: '8px', borderWidth: '1px', fontSize: '0.9rem' }}
                >
                  Tutup
                </button>
                <Link 
                  to={`/booking/${selectedPackage.id}`} 
                  className="btn btn-primary"
                  style={{ padding: '10px 24px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
                >
                  Booking Sekarang <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for animations and modal rich text */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .modal-content-area ul {
          list-style-type: disc !important;
          margin-left: 20px !important;
          margin-bottom: 16px !important;
        }
        .modal-content-area ol {
          list-style-type: decimal !important;
          margin-left: 20px !important;
          margin-bottom: 16px !important;
        }
        .modal-content-area li {
          margin-bottom: 6px !important;
        }
        .modal-content-area table th, .modal-content-area table td {
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
        }
        .modal-content-area table {
          margin: 16px 0;
          border-collapse: collapse;
          width: 100%;
        }
        @media (max-width: 640px) {
          .modal-footer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .modal-footer > div {
            text-align: center !important;
          }
          .modal-footer > div:last-child {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function
const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default Packages;
