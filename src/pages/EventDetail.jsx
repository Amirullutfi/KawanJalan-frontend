import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Send, CheckCircle2, Lock } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackEvents } from '../data/fallbackData';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        // Try fetching with cache
        let data = await fetchWithCache(`/events/${id}`, null);
        
        // If not found in cache/API (e.g. offline and first load), search in cached full list or fallback list
        if (!data) {
          const allCached = localStorage.getItem('cached__events');
          const allEvents = allCached ? JSON.parse(allCached) : fallbackEvents;
          const found = allEvents.find(item => item.id.toString() === id.toString());
          if (found) {
            data = {
              event: found,
              is_expired: new Date(found.date) < new Date()
            };
          }
        }

        if (data && data.event) {
          setEvent(data.event);
          setIsExpired(data.is_expired);
        } else {
          setErrorMsg('Event tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
        setErrorMsg('Gagal memuat detail event.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetail();
  }, [id]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isExpired) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      await api.post(`/events/${event.id}/register`, {
        name,
        email,
        phone
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      const msg = error.response?.data?.message || 'Terjadi kesalahan saat mendaftar event.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Memuat detail event...</div>;
  }

  if (errorMsg && !event) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{errorMsg}</h3>
        <Link to="/events" className="btn btn-primary"><ArrowLeft size={16} /> Kembali ke Event</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Back Link */}
        <Link to="/events" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          <ArrowLeft size={16} /> Kembali ke Daftar Event
        </Link>

        {/* Cover Photo */}
        <div style={{
          height: '380px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <img
            src={getMediaUrl(event.main_image)}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '40px'
        }} className="event-layout">
          
          {/* Left Column: Details */}
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--dark)', lineHeight: 1.25, marginBottom: '16px' }}>
              {event.title}
            </h1>
            
            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: 'var(--primary)' }} />
                <span>Waktu Acara: <strong>{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} />
                <span>Lokasi: <strong>{event.location}</strong></span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--dark)' }}>Deskripsi Event</h3>
            <div style={{
              fontSize: '1rem',
              color: 'var(--dark-soft)',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap'
            }}>
              {event.description || 'Deskripsi lengkap belum tersedia untuk event ini.'}
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div>
            <div className="glass" style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '30px',
              boxShadow: 'var(--shadow-md)',
              border: isExpired ? '1px solid #fca5a5' : '1px solid #cbd5e1'
            }}>
              
              {isExpired ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#fee2e2',
                    color: 'var(--danger)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Lock size={24} />
                  </div>
                  <h3 style={{ color: 'var(--danger)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>Pendaftaran Ditutup</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Maaf, event ini telah berlangsung atau masa pendaftarannya telah berakhir. Anda tidak dapat melakukan registrasi.
                  </p>
                </div>
              ) : success ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--success)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 style={{ color: 'var(--success)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Registrasi Berhasil!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Nama Anda telah terdaftar sebagai peserta event. Kami telah mencatat data Anda untuk persiapan tiket masuk.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn btn-outline" style={{ marginTop: '20px', padding: '6px 16px', fontSize: '0.8rem', borderWidth: '1px' }}>
                    Daftar Lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px' }}>
                    Registrasi Peserta
                  </h3>
                  
                  {errorMsg && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ani Rahmawati"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ padding: '10px 14px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Contoh: ani@gmail.com"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ padding: '10px 14px' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>No. WhatsApp / Telepon</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      className="form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ padding: '10px 14px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '0.95rem', marginTop: '8px' }}
                  >
                    {submitting ? 'Memproses Pendaftaran...' : 'Daftar Sekarang'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .event-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default EventDetail;
