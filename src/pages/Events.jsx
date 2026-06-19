import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, CalendarDays } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackEvents } from '../data/fallbackData';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchWithCache('/events', fallbackEvents);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(evt =>
    evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evt.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group events into Upcoming and Past
  const upcomingEvents = filteredEvents.filter(evt => new Date(evt.date) >= new Date());
  const pastEvents = filteredEvents.filter(evt => new Date(evt.date) < new Date());

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--dark)' }}>Event Kebudayaan & Pariwisata</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
            Temukan festival seni, maraton, pentas tari tradisional, dan pameran budaya terdekat di daerah tujuan liburan Anda.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '500px', width: '100%', margin: '0 auto 48px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Cari nama event atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '48px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Memuat jadwal event...</div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Tidak ada event yang ditemukan.
          </div>
        ) : (
          <div>
            {/* Section 1: Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--dark)', marginBottom: '24px', borderLeft: '4px solid var(--primary)', paddingLeft: '12px' }}>
                  Event Mendatang
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                  {upcomingEvents.map((evt) => (
                    <Link
                      key={evt.id}
                      to={`/events/${evt.id}`}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'none'}
                    >
                      <div>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                          <img
                            src={getMediaUrl(evt.main_image)}
                            alt={evt.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--dark)' }}>{evt.title}</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Calendar size={14} style={{ color: 'var(--primary)' }} />
                              <span>{new Date(evt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MapPin size={14} style={{ color: 'var(--primary)' }} />
                              <span>{evt.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '0 24px 24px' }}>
                        <span className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem', padding: '10px', borderRadius: '6px' }}>
                          Daftar Event
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--text-muted)', marginBottom: '24px', borderLeft: '4px solid #cbd5e1', paddingLeft: '12px' }}>
                  Event yang Telah Selesai
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                  {pastEvents.map((evt) => (
                    <Link
                      key={evt.id}
                      to={`/events/${evt.id}`}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        opacity: 0.75,
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ height: '200px', overflow: 'hidden', filter: 'grayscale(60%)' }}>
                          <img
                            src={getMediaUrl(evt.main_image)}
                            alt={evt.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-muted)' }}>{evt.title}</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <CalendarDays size={14} />
                              <span>Selesai: {new Date(evt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '0 24px 24px' }}>
                        <span className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem', padding: '10px', borderRadius: '6px', cursor: 'default', color: 'var(--text-muted)', borderColor: '#cbd5e1' }}>
                          Pendaftaran Ditutup
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
