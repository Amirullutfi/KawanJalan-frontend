import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Briefcase, ArrowLeft, Calculator, CalendarDays, Camera, Video } from 'lucide-react';
import api, { fetchWithCache } from '../services/api';
import { fallbackPackages } from '../data/fallbackData';

const Booking = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [photoPackageName, setPhotoPackageName] = useState(searchParams.get('photo') || '');
  const [addonDrone, setAddonDrone] = useState(searchParams.get('drone') === 'true');

  // Status
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        let data = null;

        // Fetch from backend API
        data = await fetchWithCache(`/packages/${packageId}`, null);
        
        // If not found in cache/API (e.g. offline and first load), search in cached full list or fallback list
        if (!data) {
          const allCached = localStorage.getItem('cached__packages');
          const allPackages = allCached ? JSON.parse(allCached) : fallbackPackages;
          data = allPackages.find(item => item.id.toString() === packageId.toString());
        }

        if (data) {
          setPack(data);
        } else {
          setErrorMsg('Paket wisata tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching package detail:', error);
        setErrorMsg('Gagal memuat detail paket wisata.');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  // Real-time calculations
  const getBaseTourPrice = () => {
    if (!pack) return 0;
    if (pack.price_unit === 'orang') {
      return pack.price * numPeople;
    }
    return pack.price;
  };

  const getPhotoPackagePrice = () => {
    const photoPackagePrices = {
      'MINI': 400000,
      'SHORT': 450000,
      'MEDIUM': 500000,
      'LONG': 600000,
      'SUKA SUKA': 800000
    };
    return (photoPackageName && photoPackagePrices[photoPackageName]) ? photoPackagePrices[photoPackageName] : 0;
  };

  const getDronePrice = () => {
    return addonDrone ? 500000 : 0;
  };

  const calculateTotal = () => {
    return getBaseTourPrice() + getPhotoPackagePrice() + getDronePrice();
  };

  const calculateDp = (total) => {
    return total * 0.3; // DP 30%
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !travelDate || !numPeople) {
      setErrorMsg('Harap lengkapi seluruh kolom formulir pemesanan.');
      return;
    }

    // Validation for package ID 6 (Hanya Layanan Dokumentasi / Drone)
    if (packageId === '6' && !photoPackageName && !addonDrone) {
      setErrorMsg('Harap pilih minimal Jasa Dokumentasi Foto atau Layanan Drone.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');



    try {
      const response = await api.post('/bookings', {
        package_id: packageId,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        travel_date: travelDate,
        num_people: numPeople,
        photo_package_name: photoPackageName || null,
        addon_drone: addonDrone
      });

      // Redirect to payment details page
      const bookingId = response.data.booking_id;
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      const msg = error.response?.data?.message || 'Terjadi kesalahan saat memproses booking Anda.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Memuat formulir booking...</div>;
  }

  if (errorMsg && !pack) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{errorMsg}</h3>
        <Link to="/packages" className="btn btn-primary"><ArrowLeft size={16} /> Kembali ke Paket Tour</Link>
      </div>
    );
  }

  const totalPrice = calculateTotal();
  const dpPrice = calculateDp(totalPrice);

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Back Link */}
        <Link to="/packages" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          <ArrowLeft size={16} /> Kembali ke Daftar Paket
        </Link>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '8px', color: 'var(--dark)' }}>Formulir Pemesanan Wisata</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
          Harap isi formulir di bawah ini dengan data yang valid. Rincian pembayaran lunas dan info transfer akan ditampilkan setelah form dikirim.
        </p>

        {errorMsg && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#b91c1c',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontWeight: 500
          }}>
            {errorMsg}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '30px'
        }} className="booking-layout">
          {/* Left Column: Form */}
          <form onSubmit={handleBooking} className="glass" style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              Identitas Pemesan
            </h3>
            
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: budi@gmail.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">No. WhatsApp (Aktif)</label>
              <input
                type="tel"
                required
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890 (Gunakan kode negara atau format lokal)"
              />
            </div>

            <div className="booking-form-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div className="form-group">
                <label className="form-label">Tanggal Keberangkatan</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="form-input"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {pack.price_unit === 'orang' ? 'Jumlah Peserta (Pax)' : 'Jumlah Unit/Grup'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="form-input"
                  value={numPeople}
                  onChange={(e) => setNumPeople(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            {(pack?.title?.toLowerCase().includes('merapi') || packageId === '6') && (
              <>
                {/* Pilihan Dokumentasi Foto */}
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Camera size={18} style={{ color: 'var(--primary)' }} /> Tambah Jasa Dokumentasi Foto
                  </label>
                  <select
                    className="form-input"
                    value={photoPackageName}
                    onChange={(e) => setPhotoPackageName(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Tanpa Jasa Foto</option>
                    <option value="MINI">Paket MINI (1 Rute + Video Air) - Rp 400.000</option>
                    <option value="SHORT">Paket SHORT (2 Rute + Video Air) - Rp 450.000</option>
                    <option value="MEDIUM">Paket MEDIUM (3 Rute + Video Air) - Rp 500.000</option>
                    <option value="LONG">Paket LONG (4 Rute + Video Air) - Rp 600.000</option>
                    <option value="SUKA SUKA">Paket SUKA SUKA (Custom / Fleksibel) - Rp 800.000</option>
                  </select>
                </div>

                {/* Pilihan Drone */}
                <div className="form-group" style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  marginTop: '16px'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '12px', userSelect: 'none' }}>
                    <input
                      type="checkbox"
                      checked={addonDrone}
                      onChange={(e) => setAddonDrone(e.target.checked)}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        accentColor: 'var(--primary)'
                      }}
                    />
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Video size={16} style={{ color: 'var(--secondary)' }} /> Tambah Drone Service (+Rp 500.000)
                      </span>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Sudah termasuk Video udara + Pilot Berlisensi.
                      </span>
                    </div>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '10px', marginTop: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {submitting ? 'Memproses Booking...' : 'Konfirmasi Pemesanan'}
            </button>
          </form>

          {/* Right Column: Pricing details summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={18} style={{ color: 'var(--primary)' }} />
                Paket yang Dipilih
              </h3>
              
              <p style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--text-dark)' }}>{pack.title}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Durasi: {pack.duration}</p>
              
              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '16px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>Harga Tarif:</span>
                <span>Rp {numberFormat(pack.price)} /{pack.price_unit}</span>
              </div>
            </div>

            {/* Live Pricing Box */}
            <div style={{
              backgroundColor: 'var(--primary-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1px solid rgba(13, 148, 136, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-hover)' }}>
                <Calculator size={18} />
                Kalkulasi Biaya
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Tarif Jeep:</span>
                  <span>Rp {numberFormat(getBaseTourPrice())}</span>
                </div>

                {photoPackageName && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span>Jasa Foto ({photoPackageName}):</span>
                    <span>Rp {numberFormat(getPhotoPackagePrice())}</span>
                  </div>
                )}

                {addonDrone && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span>Add-on Drone:</span>
                    <span>Rp {numberFormat(getDronePrice())}</span>
                  </div>
                )}
                
                <hr style={{ border: 'none', borderTop: '1px solid rgba(13, 148, 136, 0.2)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 'bold' }}>
                  <span>Total Biaya:</span>
                  <span>Rp {numberFormat(totalPrice)}</span>
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px solid rgba(13, 148, 136, 0.2)' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    <span>Sisa Pelunasan (Di Tempat 70%):</span>
                    <span style={{ fontWeight: 600 }}>Rp {numberFormat(totalPrice - dpPrice)}</span>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px dashed rgba(13, 148, 136, 0.2)', margin: '4px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                    <span style={{ fontWeight: 'bold' }}>Wajib Transfer (DP 30%):</span>
                    <span style={{ fontWeight: 800, color: 'var(--secondary)', fontSize: '1.3rem' }}>
                      Rp {numberFormat(dpPrice)}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--primary-hover)', fontStyle: 'italic', marginTop: '4px' }}>
                    *Sistem mewajibkan transfer pembayaran Down Payment (DP 30%) dalam waktu 1 jam untuk mengamankan booking Anda. Sisa pelunasan dibayarkan di lokasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-layout { grid-template-columns: 1fr !important; gap: 30px !important; }
        }
        @media (max-width: 480px) {
          .booking-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

// Helper function
const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default Booking;
