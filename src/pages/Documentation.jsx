import React, { useState, useEffect } from 'react';
import { Camera, Video, Sparkles, Check, Info, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PHOTO_PACKAGES = [
  {
    id: 'p1',
    name: 'MINI',
    price: 400000,
    details: '1 rute + video air',
    features: ['1 Rute Jeep Pilihan', 'Dokumentasi Foto Tak Terbatas', '1 Video Pendek Manuver Air', 'Editing Ringan untuk 5 Foto Utama', 'Transfer File via Google Drive (Sameday)']
  },
  {
    id: 'p2',
    name: 'SHORT',
    price: 450000,
    details: '2 rute + video air',
    features: ['2 Rute Jeep Pilihan', 'Dokumentasi Foto Tak Terbatas', '1 Video Pendek Manuver Air', 'Editing Ringan untuk 10 Foto Utama', 'Transfer File via Google Drive (Sameday)']
  },
  {
    id: 'p3',
    name: 'MEDIUM',
    price: 500000,
    details: '3 rute + video air',
    features: ['3 Rute Jeep Pilihan', 'Dokumentasi Foto Tak Terbatas', '2 Video Pendek Manuver Air', 'Editing Ringan untuk 15 Foto Utama', 'Transfer File via Google Drive (Sameday)']
  },
  {
    id: 'p4',
    name: 'LONG',
    price: 600000,
    details: '4 rute + video air',
    features: ['4 Rute Jeep Pilihan (Komplet)', 'Dokumentasi Foto Tak Terbatas', '3 Video Pendek Manuver Air', 'Editing Ringan untuk 20 Foto Utama', 'Transfer File via Google Drive (Sameday)']
  },
  {
    id: 'p5',
    name: 'SUKA SUKA',
    price: 800000,
    details: 'Custom / Fleksibel',
    features: ['Bebas Tentukan Rute Jeep', 'Dokumentasi Foto & Video Sepuasnya', 'Custom Pengambilan Video Cinematic', 'Editing Ringan untuk Semua Foto Pilihan', 'Prioritas File Delivery (Flashdisk/Drive)']
  }
];

const Documentation = () => {
  const [includeDrone, setIncludeDrone] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(PHOTO_PACKAGES[0]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [packages, setPackages] = useState([]);
  const [selectedTourPackage, setSelectedTourPackage] = useState(null);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        // Filter out ID 6 (doc-only dummy package)
        const filtered = response.data.filter(p => p.id !== 6);
        setPackages(filtered);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

  const calculateTotal = () => {
    let total = selectedPackage.price;
    if (includeDrone) {
      total += 500000;
    }
    if (selectedTourPackage) {
      total += selectedTourPackage.price;
    }
    return total;
  };

  const getBookingUrl = () => {
    const packageId = selectedTourPackage ? selectedTourPackage.id : 6;
    return `/booking/${packageId}?photo=${selectedPackage.name}&drone=${includeDrone}`;
  };

  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* 1. Hero Section with Anti-Gravity floating elements */}
      <section style={{
        position: 'relative',
        padding: '120px 0 80px',
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
          background: 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, rgba(0,0,0,0) 70%)',
          top: '-50px',
          left: '10%',
          transform: `translateY(${scrollPosition * 0.15}px)`,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, rgba(0,0,0,0) 70%)',
          bottom: '-100px',
          right: '5%',
          transform: `translateY(${scrollPosition * -0.1}px)`,
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
            marginBottom: '24px',
            fontWeight: 600,
            fontSize: '0.9rem',
            animation: 'pulse 3s infinite'
          }}>
            <Sparkles size={16} /> Jasa Dokumentasi Profesional & Drone
          </div>
          
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.5rem',
            lineHeight: 1.2,
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }} className="animate-fade-in-up">
            Abadikan Momen Seru <br />
            <span style={{ color: 'var(--primary)' }}>Tanpa Khawatir Buram</span>
          </h1>
          
          <p style={{
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto 40px',
            fontSize: '1.1rem'
          }} className="animate-fade-in">
            Lupakan tripod, biarkan photographer berpengalaman kami mengambil gambar terbaik saat Anda berpetualang menggunakan Jeep Merapi & Bromo.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#harga" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Lihat Paket Harga <ArrowRight size={18} />
            </a>
            <Link to="/gallery" className="btn btn-outline" style={{ color: 'white', borderColor: 'white', padding: '12px 28px' }}>
              <ImageIcon size={18} /> Galeri Spot Foto
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Photo & Drone Packages Section */}
      <section id="harga" style={{ padding: '100px 0', backgroundColor: 'var(--light-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '16px', color: 'var(--dark)' }}>
              Paket Jasa Dokumentasi
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Pilih paket dokumentasi yang paling sesuai dengan durasi trip Anda. Dapatkan file foto dan video berkualitas tinggi di hari yang sama.
            </p>
          </div>

          {/* Pricing Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {PHOTO_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="glass" style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: selectedPackage.id === pkg.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                border: selectedPackage.id === pkg.id ? '2px solid var(--primary)' : '1px solid rgba(0,0,0,0.05)',
                transform: selectedPackage.id === pkg.id ? 'translateY(-8px)' : 'none',
                transition: 'var(--transition)',
                cursor: 'pointer',
                position: 'relative'
              }} onClick={() => setSelectedPackage(pkg)}>
                
                {selectedPackage.id === pkg.id && (
                  <span style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '4px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}>
                    PILIHAN ANDA
                  </span>
                )}

                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--dark)' }}>
                  Paket {pkg.name}
                </h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '20px' }}>
                  {pkg.details}
                </p>
                
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark)' }}>
                    Rp {numberFormat(pkg.price)}
                  </span>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', marginBottom: '24px' }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                      <Check size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="btn" style={{
                  width: '100%',
                  backgroundColor: selectedPackage.id === pkg.id ? 'var(--primary)' : 'var(--light-soft)',
                  color: selectedPackage.id === pkg.id ? 'white' : 'var(--primary)',
                  border: selectedPackage.id === pkg.id ? 'none' : '1px solid var(--primary-light)'
                }}>
                  Pilih Paket ini
                </button>
              </div>
            ))}
          </div>

          {/* Upselling Drone Section */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '40px'
          }} className="drone-upsell">
            <div style={{ flex: '1 1 500px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--secondary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '16px'
              }}>
                <Video size={14} /> DOKUMENTASI UDARA (ADD-ON)
              </div>
              
              <h3 style={{ fontSize: '1.75rem', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                Tambahkan Layanan Drone Cinematic
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Dapatkan rekaman video lanskap megah dari udara (bird-eye view) saat jeep meluncur. Sudah termasuk 1 Pilot Berlisensi + File Video Raw/Cinematic (+ Rp 500.000).
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '24px 40px',
              borderRadius: 'var(--radius-md)',
              minWidth: '250px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Biaya Tambahan</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '16px' }}>
                + Rp 500.000
              </span>
              
              {/* Custom Toggle Switch */}
              <label 
                onClick={() => setIncludeDrone(!includeDrone)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: '12px',
                  userSelect: 'none'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '28px',
                  backgroundColor: includeDrone ? 'var(--primary)' : '#475569',
                  borderRadius: '14px',
                  padding: '3px',
                  transition: 'var(--transition)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'var(--transition)',
                    transform: includeDrone ? 'translateX(28px)' : 'translateX(0)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {includeDrone ? 'Ditambahkan' : 'Tambahkan'}
                </span>
              </label>
            </div>
          </div>

          {/* Calculator Widget & CTA */}
          <div className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            backgroundColor: 'white',
            border: '1px solid rgba(13, 148, 136, 0.1)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--dark)' }}>Estimasi Biaya Layanan</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '12px' }}>
                Paket Foto {selectedPackage.name} (Rp {numberFormat(selectedPackage.price)}) 
                {includeDrone ? ' + Drone Add-on (Rp 500.000)' : ''}
                {selectedTourPackage ? ` + ${selectedTourPackage.title} (Rp ${numberFormat(selectedTourPackage.price)})` : ''}
              </p>
              
              {/* Pilihan Layanan Drone */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setIncludeDrone(false)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: !includeDrone ? 'var(--primary)' : '#cbd5e1',
                    backgroundColor: !includeDrone ? 'var(--primary-light)' : 'transparent',
                    color: !includeDrone ? 'var(--primary)' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  Hanya Dokumentasi
                </button>
                <button
                  type="button"
                  onClick={() => setIncludeDrone(true)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: includeDrone ? 'var(--primary)' : '#cbd5e1',
                    backgroundColor: includeDrone ? 'var(--primary-light)' : 'transparent',
                    color: includeDrone ? 'var(--primary)' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  Dokumentasi + Drone
                </button>
              </div>

              {/* Pilihan Paket Tour Jeep */}
              <div style={{ marginTop: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: '6px' }}>
                  Pilih Paket Jeep (Opsional)
                </label>
                <select
                  value={selectedTourPackage ? selectedTourPackage.id : ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setSelectedTourPackage(null);
                    } else {
                      const found = packages.find(p => p.id === parseInt(val));
                      setSelectedTourPackage(found || null);
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    width: '100%',
                    maxWidth: '360px',
                    cursor: 'pointer',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Tanpa Paket Jeep (Hanya Dokumentasi / Drone)</option>
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} - Rp {numberFormat(p.price)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: '1 1 250px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Total Harga Layanan</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                  Rp {numberFormat(calculateTotal())}
                </span>
              </div>
              
              <Link to={getBookingUrl()} className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Pesan Sekarang
              </Link>
            </div>
          </div>

          {/* Disclaimer text */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <Info size={14} /> <em>Harga sewaktu waktu bisa berubah</em>
          </p>
        </div>
      </section>

      {/* Embedded Animations and Hover CSS styles */}
      <style>{`
        @media (max-width: 768px) {
          .drone-upsell {
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Documentation;
