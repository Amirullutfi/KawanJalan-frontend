import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackDestinations, fallbackPackages, fallbackEvents } from '../data/fallbackData';
import HeroSlider from '../components/HeroSlider';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredFallbackDestinations = fallbackDestinations.filter(d => d.featured);
        const [destData, pkgData, evtData] = await Promise.all([
          fetchWithCache('/destinations?featured=true', featuredFallbackDestinations),
          fetchWithCache('/packages', fallbackPackages),
          fetchWithCache('/events', fallbackEvents)
        ]);
        
        setDestinations(destData.slice(0, 3));
        setPackages(pkgData.slice(0, 3));
        
        // Filter out expired events for landing page
        const upcomingEvents = evtData.filter(evt => new Date(evt.date) >= new Date());
        setEvents(upcomingEvents.slice(0, 2));
      } catch (error) {
        console.error('Error fetching landing page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ paddingBottom: '80px' }} className="animate-fade-in">
      {/* 1. Hero Image Slider */}
      <HeroSlider />

      {/* 2. Why Choose Us (Value Proposition) */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Kelebihan Kami</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '8px', color: 'var(--dark)' }}>Mengapa Memilih KawanJalan Tour & Travel?</h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--primary)'
              }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Transaksi 100% Aman</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Booking aman lewat platform kami dengan kewajiban DP 30% dan konfirmasi instan.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--primary)'
              }}>
                <HeartHandshake size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Layanan Pendamping Profesional</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Nikmati liburan santai didampingi pemandu wisata lokal berpengalaman dan ramah.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--primary)'
              }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Rute Terkurasi</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Itinerary perjalanan dibuat secara mendalam untuk pengalaman otentik terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Destinations */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--light-soft)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Eksplorasi</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '8px', color: 'var(--dark)' }}>Destinasi Unggulan</h2>
            </div>
            <Link to="/destinations" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              color: 'var(--primary)',
              fontSize: '0.95rem'
            }}>
              Lihat Semua Destinasi <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat destinasi...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={getMediaUrl(dest.main_image)}
                      alt={dest.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {dest.category?.name || 'Wisata'}
                    </div>
                  </div>
                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark)' }}>{dest.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{dest.excerpt}</p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '12px'
                    }}>
                      <MapPin size={14} style={{ color: 'var(--primary)' }} />
                      <span>{dest.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Popular Tour Packages */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Pilihan Paket</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '8px', color: 'var(--dark)' }}>Paket Wisata Populer</h2>
            </div>
            <Link to="/packages" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              color: 'var(--primary)',
              fontSize: '0.95rem'
            }}>
              Lihat Semua Paket <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat paket wisata...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img
                        src={getMediaUrl(pkg.main_image)}
                        alt={pkg.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark)' }}>{pkg.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                        {pkg.description ? stripHtml(pkg.description).slice(0, 110) + '...' : ''}
                      </p>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} style={{ color: 'var(--primary)' }} />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '0 24px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px'
                  }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mulai Dari</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>
                        Rp {numberFormat(pkg.price)} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/{pkg.price_unit}</span>
                      </p>
                    </div>
                    {pkg.title.toLowerCase().includes('bromo') ? (
                      <button className="btn btn-secondary" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'not-allowed', opacity: 0.7 }} disabled>
                        Belum Tersedia
                      </button>
                    ) : (
                      <Link to={`/booking/${pkg.id}`} className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '0.85rem' }}>
                        Booking
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Upcoming Events */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--light-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Event Daerah</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '8px', color: 'var(--dark)' }}>Jadwal Event Terdekat</h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat jadwal event...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '30px'
            }} className="events-grid">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="event-card-horizontal"
                >
                  <div style={{ width: '40%', minWidth: '150px', position: 'relative' }}>
                    <img
                      src={getMediaUrl(evt.main_image)}
                      alt={evt.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px', width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--dark)' }}>{evt.title}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} style={{ color: 'var(--primary)' }} />
                          <span>{new Date(evt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} style={{ color: 'var(--primary)' }} />
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/events/${evt.id}`} className="btn btn-outline" style={{
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      borderRadius: '6px',
                      alignSelf: 'flex-start',
                      borderWidth: '1px'
                    }}>
                      Registrasi Event
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Testimonials */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Ulasan Pelanggan</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '8px', color: 'var(--dark)' }}>Apa Kata Mereka?</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .events-grid { grid-template-columns: 1fr !important; }
          .event-card-horizontal { flex-direction: column !important; }
          .event-card-horizontal > div:first-child { width: 100% !important; height: 180px !important; }
          .event-card-horizontal > div:last-child { width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

// Helper function
const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const stripHtml = (htmlString) => {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]*>?/gm, '');
};

export default Home;
