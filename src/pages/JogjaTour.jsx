import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  JOGJA_TOUR_CATEGORIES, 
  globalTerms
} from '../data/jogjaTourData';
import { fallbackPackages } from '../data/fallbackData';
import BackendPackageCard from '../components/BackendPackageCard';
import api, { fetchWithCache, getMediaUrl } from '../services/api';
import { Car, Info, Map, Sun, Plane, CheckCircle2, XCircle, X, Loader2, Users, Clock, ArrowRight } from 'lucide-react';

// Custom Hook untuk state tabulasi
const useTourFilter = () => {
  const [activeTab, setActiveTab] = useState(JOGJA_TOUR_CATEGORIES.REGULAR);
  return { activeTab, setActiveTab };
};

const JogjaTour = () => {
  const [activeHero, setActiveHero] = useState('JOGJA_PRIVATE'); // Default active
  const { activeTab, setActiveTab } = useTourFilter();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeBaliTab, setActiveBaliTab] = useState('LEPAS_KUNCI'); // 'LEPAS_KUNCI', 'ALL_IN', 'MOTOR'
  
  // Backend packages state
  const [backendPackages, setBackendPackages] = React.useState([]);
  const [loadingBackend, setLoadingBackend] = React.useState(true);

  React.useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await fetchWithCache('/packages', fallbackPackages);
        setBackendPackages(data);
      } catch (error) {
        console.error('Error in fetchPackages:', error);
        setBackendPackages(fallbackPackages);
      } finally {
        setLoadingBackend(false);
      }
    };
    fetchPackages();
  }, []);

  const regularPackages = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('jogja reguler')
  );
  
  const sunrisePackages = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('jogja sunrise') && !pkg.title.toLowerCase().includes('merapi') && !pkg.title.toLowerCase().includes('bromo')
  );

  const carRentalPackages = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('sewa armada')
  );

  const airportTransferPackages = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('airport transfer')
  );

  const baliLepasKunci = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('bali lepas kunci')
  );

  const baliAllIn = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('bali all in')
  );

  const baliMotor = backendPackages.filter(pkg => 
    pkg.title.toLowerCase().includes('bali motor')
  );

  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleViewAll = (pkgData) => {
    setSelectedPackage(pkgData);
  };

  const renderContent = () => {
    if (activeHero === 'MERAPI' || activeHero === 'BROMO') {
      const isMerapi = activeHero === 'MERAPI';
      const filteredPackages = backendPackages.filter(pkg => 
        isMerapi 
          ? pkg.title.toLowerCase().includes('merapi') 
          : pkg.title.toLowerCase().includes('bromo') || pkg.title.toLowerCase().includes('jawa timur')
      );

      return (
        <div className="container animate-fade-in-up" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--dark)', marginBottom: '12px' }}>
              {isMerapi ? 'Paket Wisata Merapi Explore Lava Tour' : 'Paket Wisata Bromo Sunrise'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {isMerapi 
                ? 'Nikmati petualangan seru menyusuri kawasan lereng Gunung Merapi.' 
                : 'Saksikan keindahan matahari terbit dari puncak Gunung Bromo.'}
            </p>
          </div>

          {isMerapi && (
            <div style={{
              background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-soft) 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: '30px',
              color: 'white',
              marginBottom: '40px',
              boxShadow: 'var(--shadow-lg)'
            }} className="ag-float-subtle">
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', flexShrink: 0 }}>
                  <Info size={36} style={{ color: 'var(--primary-light)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'white' }}>
                    Ketentuan & Fasilitas Global (Semua Paket Jeep Merapi)
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <CheckCircle2 size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0, textAlign: 'left' }}>
                          <span style={{ color: 'white', fontWeight: '600' }}>Fasilitas yang Didapat (Include):</span>
                          <br />
                          • Driver as Guide & Dokumentasi Foto (Take a moment)<br />
                          • Tiket masuk destinasi & BBM Jeep<br />
                          • Helm keselamatan & Asuransi jiwa<br />
                          • Jasa Freelance Fotografer
                        </p>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>👥 Kapasitas Penumpang:</span> Maksimal 1 Jeep 4 Orang
                      </p>
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>⏱️ Durasi Trip:</span> Tergantung rute (mulai dari 1 Jam 30 Menit, 2 Jam, hingga 3 Jam)
                      </p>
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>⭐ Standar Keamanan:</span> Driver berpengalaman dan rute offroad berlisensi resmi.
                      </p>
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0, textAlign: 'left' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>📍 Titik Kumpul:</span> Penginapan Joglo trisaputran ({' '}
                        <a 
                          href="https://maps.app.goo.gl/yc93hWyDEhrC6S7V9" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 'bold' }}
                        >
                          Lihat Rute Maps
                        </a>{' '}
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loadingBackend ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px', color: 'var(--primary)' }}>
              <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filteredPackages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Belum ada paket wisata untuk kategori ini saat ini.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 380px))',
              justifyContent: 'center',
              gap: '30px'
            }}>
              {filteredPackages.map(pkg => (
                <BackendPackageCard 
                  key={pkg.id} 
                  pkg={pkg} 
                  onClick={handleViewAll} 
                />
              ))}
            </div>
          )}
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }

    if (activeHero === 'BALI') {
      const getBaliList = () => {
        if (activeBaliTab === 'LEPAS_KUNCI') return baliLepasKunci;
        if (activeBaliTab === 'ALL_IN') return baliAllIn;
        return baliMotor;
      };

      const currentList = getBaliList();

      return (
        <div className="container animate-fade-in-up" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--dark)', marginBottom: '12px' }}>
              Bali Rental
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Layanan rental mobil lepas kunci, mobil dengan supir (All-In), dan sewa motor terbaik di Bali dengan armada bersih dan prima.
            </p>
          </div>

          {/* Sub-tabs khusus Bali */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'LEPAS_KUNCI', label: 'Lepas Kunci (Mobil)', color: '#ec4899' },
              { id: 'ALL_IN', label: 'All In (Mobil + Driver + BBM)', color: '#ec4899' },
              { id: 'MOTOR', label: 'Sewa Motor', color: '#ec4899' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveBaliTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  backgroundColor: activeBaliTab === tab.id ? tab.color : 'var(--light-soft)',
                  color: activeBaliTab === tab.id ? 'white' : 'var(--text-muted)',
                  boxShadow: activeBaliTab === tab.id ? `0 4px 12px ${tab.color}40` : 'none',
                  transform: activeBaliTab === tab.id ? 'translateY(-2px)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Bali Rentcar Terms Banner */}
          <div style={{
            background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-soft) 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            color: 'white',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-lg)'
          }} className="ag-float-subtle">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', flexShrink: 0 }}>
                <Info size={36} style={{ color: '#fbcfe8' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'white' }}>
                  Ketentuan & Fasilitas Sewa Bali Rental
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <CheckCircle2 size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0, textAlign: 'left' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>Fasilitas yang Didapat (Include):</span>
                        <br />
                        • Unit armada bersih, harum, & disinfeksi berkala<br />
                        {activeBaliTab === 'MOTOR' ? (
                          <span>• 2 Helm Standard SNI + 2 Jas Hujan bersih<br />• Pemegang HP (Phone Holder) sepeda motor</span>
                        ) : activeBaliTab === 'ALL_IN' ? (
                          <span>• Driver ramah & berpengalaman di Bali<br />• Bahan Bakar Minyak (Bensin)</span>
                        ) : (
                          <span>• Dukungan darurat jalan raya 24/7<br />• Asuransi kendaraan standar</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left' }}>
                      <span style={{ color: 'white', fontWeight: '600' }}>📄 Syarat Penyewaan:</span> KTP/Paspor asli & SIM (SIM A untuk Lepas Kunci, SIM C untuk Motor)
                    </p>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left' }}>
                      <span style={{ color: 'white', fontWeight: '600' }}>⏱️ Durasi Sewa:</span> {activeBaliTab === 'ALL_IN' ? '10 Jam per hari' : '24 Jam per hari sewa'}
                    </p>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left' }}>
                      <span style={{ color: 'white', fontWeight: '600' }}>⚠️ Overtime:</span> {
                        activeBaliTab === 'ALL_IN' 
                          ? 'Dikenakan biaya tambahan 10% per jam' 
                          : activeBaliTab === 'LEPAS_KUNCI' 
                            ? 'Dikenakan biaya tambahan Rp 50.000 / jam' 
                            : 'Hubungi admin untuk ketentuan overtime'
                      }
                    </p>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0, textAlign: 'left' }}>
                      <span style={{ color: 'white', fontWeight: '600' }}>📍 Layanan Antar-Jemput:</span> Tersedia untuk area Bandara Ngurah Rai, Kuta, Seminyak, Sanur, Nusa Dua, dan Ubud.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Armada */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 360px))',
            justifyContent: 'center',
            gap: '30px'
          }}>
            {currentList.map(item => {
              const vehicleName = item.title
                .replace('Bali Lepas Kunci - ', '')
                .replace('Bali All In - ', '')
                .replace('Bali Motor - Sewa Motor ', '');
              const vehicleImage = item.main_image ? getMediaUrl(item.main_image) : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
              const isMotor = item.title.toLowerCase().includes('motor');
              const isHiace = item.title.toLowerCase().includes('hiace');
              const capacity = isMotor ? 'Maks 2 Orang' : (activeBaliTab === 'ALL_IN' && isHiace ? 'Maks 14 Orang' : 'Maks 5-7 Orang');
              const duration = item.duration || (activeBaliTab === 'ALL_IN' ? '10 Jam' : '24 Jam');
              const transmission = item.title.toLowerCase().includes('matic') ? 'Matic' : (item.title.toLowerCase().includes('manual') ? 'Manual' : null);

              return (
                <div
                  key={item.id}
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
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={vehicleImage}
                        alt={vehicleName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}>
                        <Car size={24} style={{ color: '#ec4899' }} />
                      </div>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '16px', color: 'var(--dark)' }}>
                        {vehicleName}
                      </h3>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={16} style={{ color: '#ec4899' }} />
                          <span>Kapasitas: <strong>{capacity}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={16} style={{ color: '#ec4899' }} />
                          <span>Durasi: <strong>{duration}</strong></span>
                        </div>
                        {transmission && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                            <span>Transmisi: <strong>{transmission}</strong></span>
                          </div>
                        )}
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
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>Tarif Sewa</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ec4899', margin: 0 }}>
                        Rp {numberFormat(item.price)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/{isMotor ? 'hari' : activeBaliTab === 'ALL_IN' ? '10 jam' : 'hari'}</span>
                      </p>
                    </div>
                    <Link
                      to={`/booking/${item.id}`}
                      className="btn btn-primary"
                      style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', backgroundColor: '#ec4899', borderColor: '#ec4899', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in-up">
        {/* Sticky Tabs */}
        <div style={{
          position: 'sticky',
          top: '70px',
          zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '40px',
          padding: '16px 0'
        }}>
          <div className="container" style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '12px',
            justifyContent: 'center',
            paddingBottom: '8px'
          }}>
            {[
              { id: JOGJA_TOUR_CATEGORIES.REGULAR, label: 'Paket Reguler', icon: Map, color: 'var(--primary)' },
              { id: JOGJA_TOUR_CATEGORIES.SUNRISE, label: 'Paket Sunrise', icon: Sun, color: 'var(--warning)' },
              { id: JOGJA_TOUR_CATEGORIES.CAR_RENTAL, label: 'Sewa Armada', icon: Car, color: 'var(--accent)' },
              { id: JOGJA_TOUR_CATEGORIES.AIRPORT_TRANSFER, label: 'Transfer Bandara', icon: Plane, color: '#8b5cf6' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab.id ? tab.color : 'var(--light-soft)',
                  color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                  boxShadow: activeTab === tab.id ? `0 4px 12px ${tab.color}40` : 'none',
                  transform: activeTab === tab.id ? 'translateY(-2px)' : 'none'
                }}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="container" style={{ paddingBottom: '80px' }}>
          {/* T&C Banner Global */}
          <div style={{
            background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-soft) 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '30px',
            color: 'white',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-lg)'
          }} className="ag-float-subtle">
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', flexShrink: 0 }}>
                <Info size={36} style={{ color: 'var(--primary-light)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'white' }}>
                  Syarat & Ketentuan Global
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <CheckCircle2 size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0 }}><span style={{ color: 'white', fontWeight: '600' }}>Include:</span> {globalTerms.includes.join(', ')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <XCircle size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0 }}><span style={{ color: 'white', fontWeight: '600' }}>Exclude:</span> {globalTerms.excludes.join(', ')}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px' }}><span style={{ color: 'white', fontWeight: '600' }}>Kapasitas & Durasi:</span> Maks {globalTerms.maxCapacity} orang, Durasi {globalTerms.durationHours} Jam/Hari</p>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px' }}><span style={{ color: 'white', fontWeight: '600' }}>Sistem Harga:</span> {globalTerms.priceSystem}</p>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '8px' }}><span style={{ color: 'white', fontWeight: '600' }}>Penjemputan:</span> {globalTerms.pickup}</p>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0 }}><span style={{ color: 'white', fontWeight: '600' }}>Overtime:</span> {globalTerms.overtimePenalty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 380px))',
            justifyContent: 'center',
            gap: '30px'
          }}>
            {activeTab === JOGJA_TOUR_CATEGORIES.REGULAR && regularPackages.map(pkg => (
              <BackendPackageCard key={pkg.id} pkg={pkg} onClick={handleViewAll} />
            ))}
            
            {activeTab === JOGJA_TOUR_CATEGORIES.SUNRISE && sunrisePackages.map(pkg => (
              <BackendPackageCard key={pkg.id} pkg={pkg} onClick={handleViewAll} />
            ))}

            {activeTab === JOGJA_TOUR_CATEGORIES.CAR_RENTAL && carRentalPackages.map(fleet => {
              const vehicleName = fleet.title.replace('Sewa Armada - ', '');
              return (
                <div key={fleet.id} style={{
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
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={fleet.main_image ? getMediaUrl(fleet.main_image) : "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"}
                        alt={vehicleName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}>
                        <Car size={24} style={{ color: 'var(--accent)' }} />
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: 'var(--dark)' }}>
                        {vehicleName}
                      </h3>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={16} style={{ color: 'var(--primary)' }} />
                          <span>Kapasitas: <strong>Maks 5 Orang</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={16} style={{ color: 'var(--primary)' }} />
                          <span>Durasi: <strong>{fleet.duration || '12 Jam'}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', marginTop: '4px' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                          <span>Termasuk: <strong>Mobil, Supir & BBM</strong></span>
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
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>Tarif Sewa</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)', margin: 0 }}>
                        Rp {numberFormat(fleet.price)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/12 jam</span>
                      </p>
                    </div>
                    <Link 
                      to={`/booking/${fleet.id}`}
                      className="btn btn-primary" 
                      style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              );
            })}

            {activeTab === JOGJA_TOUR_CATEGORIES.AIRPORT_TRANSFER && airportTransferPackages.map(transfer => {
              const name = transfer.title.replace('Airport Transfer - ', '');
              const isDrop = transfer.title.toLowerCase().includes('antar');
              return (
                <div key={transfer.id} style={{
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
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={transfer.main_image ? getMediaUrl(transfer.main_image) : "https://images.unsplash.com/photo-1436491865332-7a615061c443?auto=format&fit=crop&w=800&q=80"}
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}>
                        <Plane size={24} style={{ color: isDrop ? 'var(--secondary)' : 'var(--accent)', transform: isDrop ? 'rotate(45deg)' : 'rotate(135deg)' }} />
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px', color: 'var(--dark)' }}>
                        {name}
                      </h3>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                          <Map size={16} style={{ color: 'var(--primary)' }} />
                          <span>Rute: <strong>Semua Area Jogja {isDrop ? '➔ YIA' : '➔ Semua Area Jogja'}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', marginTop: '4px' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                          <span>Termasuk: <strong>Mobil, Supir & BBM</strong></span>
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
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>Tarif Sekali Jalan</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: isDrop ? 'var(--secondary)' : 'var(--accent)', margin: 0 }}>
                        Rp {numberFormat(transfer.price)} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>/mobil</span>
                      </p>
                    </div>
                    <Link 
                      to={`/booking/${transfer.id}`}
                      className="btn btn-primary" 
                      style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Section (Similar to Packages page) */}
      <div style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(to bottom, #e0f2fe 0%, #f8fafc 100%)', zIndex: 0
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }} className="animate-fade-in-up">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', color: 'var(--dark)', marginBottom: '16px' }}>
            Eksplorasi Tanpa Batas
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Temukan pengalaman perjalanan terbaik di Jogja & Jawa Tengah dengan armada eksklusif dan layanan profesional kami.
          </p>
        </div>
      </div>

      {/* Hero Cards */}
      <div className="container" style={{ position: 'relative', zIndex: 2, marginTop: '-20px', paddingBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { id: 'MERAPI', title: 'Merapi Explore Lava Tour', icon: Map, color: 'var(--success)', bg: '#dcfce7', desc: 'Petualangan lava tour dengan Jeep klasik menyusuri jejak erupsi.' },
            { id: 'JOGJA_PRIVATE', title: 'Jogja Private Trip', icon: Car, color: 'var(--primary)', bg: '#ccfbf1', desc: 'Pilihan puluhan paket wisata eksklusif mengelilingi destinasi hits.' },
            { id: 'BALI', title: 'Bali Rental', icon: Car, color: '#ec4899', bg: '#fce7f3', desc: 'Sewa mobil lepas kunci, all-in driver+bensin, dan sewa motor di Bali.' },
            { id: 'BROMO', title: 'Bromo Sunrise', icon: Sun, color: 'var(--warning)', bg: '#fef3c7', desc: 'Keajaiban matahari terbit dari puncak kawah eksotis Jawa Timur.' }
          ].map(hero => (
            <div 
              key={hero.id}
              onClick={() => setActiveHero(hero.id)}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '30px',
                border: activeHero === hero.id ? `2px solid ${hero.color}` : '1px solid #e2e8f0',
                boxShadow: activeHero === hero.id ? `0 20px 25px -5px ${hero.color}30` : 'var(--shadow-sm)',
                transform: activeHero === hero.id ? 'scale(1.03)' : 'none',
                cursor: 'pointer',
                transition: 'var(--transition)',
                opacity: activeHero === hero.id ? 1 : 0.7
              }}
              onMouseOver={e => {
                if (activeHero !== hero.id) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.opacity = 1;
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseOut={e => {
                if (activeHero !== hero.id) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.opacity = 0.7;
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: hero.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <hero.icon size={32} style={{ color: hero.color }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--dark)', marginBottom: '10px' }}>{hero.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{hero.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {renderContent()}

      {/* Modal / Popup Detail Rute */}
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
        }} className="animate-fade-in" onClick={() => setSelectedPackage(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '550px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: 'scale(1)',
            transition: 'transform 0.3s'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dark)', margin: '0 0 4px 0' }}>{selectedPackage.packageName || selectedPackage.title}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '600', margin: 0 }}>Detail Rute Perjalanan</p>
              </div>
              <button 
                onClick={() => setSelectedPackage(null)}
                style={{
                  background: 'var(--light-soft)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--light-soft)'}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '30px', maxHeight: '50vh', overflowY: 'auto' }} className="modal-content-area">
              {selectedPackage.destinations ? (
                selectedPackage.destinations.map((dest, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i === selectedPackage.destinations.length - 1 ? 0 : '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}>
                        {i + 1}
                      </div>
                      {i < selectedPackage.destinations.length - 1 && (
                        <div style={{ width: '2px', height: '100%', minHeight: '20px', backgroundColor: 'var(--primary-light)', marginTop: '8px' }}></div>
                      )}
                    </div>
                    <div style={{ paddingTop: '4px', paddingBottom: '16px' }}>
                      <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--dark-soft)', margin: 0 }}>{dest}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div 
                  style={{ color: 'var(--text-dark)', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: selectedPackage.description }}
                />
              )}
            </div>

            <div className="modal-footer" style={{
              padding: '24px 30px',
              backgroundColor: 'var(--light-soft)',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 4px 0' }}>Harga Paket</p>
                <p style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>
                  Rp {numberFormat(selectedPackage.price)}
                </p>
              </div>
              {selectedPackage.title.toLowerCase().includes('bromo') ? (
                <button 
                  className="btn btn-secondary"
                  style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'not-allowed', opacity: 0.7 }}
                  disabled
                >
                  Belum Tersedia
                </button>
              ) : (
                <Link 
                  to={`/booking/${selectedPackage.id}`}
                  onClick={() => setSelectedPackage(null)}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  Pesan Sekarang
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 600px) {
          .modal-footer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .modal-footer > div {
            text-align: center !important;
          }
          .modal-footer > a {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JogjaTour;
