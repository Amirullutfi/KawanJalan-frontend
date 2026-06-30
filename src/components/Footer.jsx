import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Send } from 'lucide-react';
import api from '../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/subscribers', { name, email });
      setStatus({ type: 'success', message: response.data.message });
      setEmail('');
      setName('');
    } catch (error) {
      const msg = error.response?.data?.message || 'Terjadi kesalahan saat mendaftar.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--dark)',
      color: 'var(--text-light)',
      padding: '60px 0 30px',
      marginTop: 'auto',
      borderTop: '1px solid #1e293b'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Column 1: Info & Logo */}
          <div>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'white',
              textDecoration: 'none',
              marginBottom: '20px'
            }}>
              <Compass size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.15' }}>
                <span style={{ 
                  fontWeight: 800, 
                  fontSize: '1.4rem', 
                  letterSpacing: '-0.5px',
                  whiteSpace: 'nowrap'
                }}>
                  KawanJalan
                </span>
                <span style={{ 
                  fontWeight: 700, 
                  fontSize: '0.72rem', 
                  color: 'var(--secondary)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1.5px',
                  whiteSpace: 'nowrap'
                }}>
                  Tour & Travel
                </span>
              </div>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Platform perjalanan terpercaya Anda untuk menjelajahi keindahan alam, budaya, dan pesona eksotis Nusantara.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} />
                <span>
                  Dusun Tanen, Rt 01 / Rw 25<br />
                  Kel. Hargobinangun, Kec. Pakem<br />
                  Sleman, DIY
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--primary)' }} />
                <span>+62 819-1305-2180</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--primary)' }} />
                <span>info@kawanjalan.id</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid var(--primary)', paddingBottom: '8px', display: 'inline-block' }}>
              Tautan Cepat
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
              <li><Link to="/destinations" style={{ color: '#94a3b8' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Daftar Destinasi</Link></li>
              <li><Link to="/packages" style={{ color: '#94a3b8' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Katalog Tour</Link></li>
              <li><Link to="/events" style={{ color: '#94a3b8' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Event Pariwisata</Link></li>
              <li><Link to="/blog" style={{ color: '#94a3b8' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Tips & Blog Perjalanan</Link></li>
            </ul>
          </div>

          {/* Column 3: Payment Info */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid var(--primary)', paddingBottom: '8px', display: 'inline-block' }}>
              Info Pembayaran
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '16px', lineHeight: '1.6' }}>
              Pembayaran pemesanan paket wisata menggunakan sistem uang muka (DP) sebesar 30%.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Rincian metode pembayaran dan nomor rekening resmi akan otomatis ditampilkan setelah Anda mengisi formulir pemesanan.
            </p>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid var(--primary)', paddingBottom: '8px', display: 'inline-block' }}>
              Newsletter
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '16px' }}>
              Dapatkan berita event kebudayaan dan promo diskon paket tour langsung di email Anda.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                placeholder="Nama Anda (opsional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  backgroundColor: '#1e293b',
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              />
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  placeholder="Alamat Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #334155',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    fontSize: '0.9rem',
                    flexGrow: 1
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ padding: '10px 14px', borderRadius: '6px' }}
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
            {status.message && (
              <p style={{
                marginTop: '10px',
                fontSize: '0.85rem',
                color: status.type === 'success' ? '#10b981' : '#f87171'
              }}>
                {status.message}
              </p>
            )}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #1e293b', marginBottom: '20px' }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: '#64748b',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} KawanJalan Tour & Travel. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Dibuat dengan ❤️ untuk Pariwisata Indonesia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
