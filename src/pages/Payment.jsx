import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, AlertCircle, PhoneCall, Receipt, ArrowRight, MapPin } from 'lucide-react';
import api from '../services/api';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch booking details
  const fetchBooking = async (isPoll = false) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      setBooking(response.data.booking);
      if (!isPoll) {
        setSecondsRemaining(response.data.seconds_remaining);
      }
    } catch (error) {
      console.error('Error fetching booking payment details:', error);
      if (!isPoll) {
        setErrorMsg('Gagal memuat rincian pembayaran.');
      }
    } finally {
      if (!isPoll) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  // Countdown timer logic
  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Fetch status from API to confirm cancel
          fetchBooking();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  // Status Polling logic - every 10 seconds
  useEffect(() => {
    if (!booking || booking.payment_status !== 'waiting_payment') return;

    const pollInterval = setInterval(() => {
      fetchBooking(true);
    }, 10000); // 10 seconds

    return () => clearInterval(pollInterval);
  }, [booking]);

  // Format seconds to HH:MM:SS
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // Generate WA chat confirmation link
  const getWhatsAppConfirmLink = () => {
    if (!booking) return '#';
    const adminPhone = '6281913052180'; // fallback admin phone
    const totalTransfer = parseFloat(booking.dp_amount) + parseInt(booking.unique_code || 0);
    const formattedTotal = numberFormat(totalTransfer);
    const formattedRemaining = numberFormat(parseFloat(booking.total_price) - parseFloat(booking.dp_amount));
    
    let docInfo = '';
    if (booking.photo_package_name) {
      docInfo += ` + Jasa Foto ${booking.photo_package_name}`;
    }
    if (booking.addon_drone) {
      docInfo += ` + Drone`;
    }

    const text = `Halo Admin KawanJalan Tour & Travel,\n\nSaya ingin melakukan konfirmasi pembayaran DP 30%:\n- Kode Booking: ${booking.booking_code || '#EXP-' + booking.id}\n- Nama Pemesan: ${booking.customer_name}\n- Paket Wisata: ${booking.package?.title}${docInfo}\n- Nominal Transfer DP + Kode Unik: Rp ${formattedTotal}\n- Sisa Pelunasan di Lokasi: Rp ${formattedRemaining}\n\nSaya telah mentransfer dana DP ke Bank Mandiri. Berikut saya sertakan bukti transfernya.`;
    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Memuat rincian pembayaran...</div>;
  }

  if (errorMsg || !booking) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{errorMsg || 'Booking tidak ditemukan.'}</h3>
        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
      </div>
    );
  }

  const isWaiting = booking.payment_status === 'waiting_payment';
  const isPaid = booking.payment_status === 'paid_dp' || booking.payment_status === 'completed';
  const isCancelled = booking.payment_status === 'cancelled';

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container" style={{ maxWidth: '750px' }}>
        {/* Success / Status Card */}
        <div className="glass" style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
          border: isPaid ? '2px solid var(--success)' : isCancelled ? '2px solid var(--danger)' : '1px solid #cbd5e1'
        }}>
          {isPaid && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckCircle2 size={64} style={{ color: 'var(--success)', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--success)', fontWeight: 800 }}>Pembayaran Terverifikasi!</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '500px' }}>
                Pembayaran uang muka (DP 30%) telah kami terima. E-Tiket Anda sekarang sudah aktif dan dapat diunduh di bawah ini. Sisa pelunasan dibayarkan di lokasi.
              </p>

              {booking.package?.title?.toLowerCase().includes('merapi') && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '24px',
                  width: '100%',
                  maxWidth: '500px',
                  textAlign: 'left',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <MapPin size={24} style={{ color: '#166534', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 600, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📍 Titik Kumpul (Meeting Point):</span>
                    <span style={{ fontSize: '1rem', color: '#14532d', fontWeight: 'bold', display: 'block', marginTop: '2px', marginBottom: '8px' }}>Penginapan Joglo trisaputran</span>
                    <a 
                      href="https://maps.app.goo.gl/yc93hWyDEhrC6S7V9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        padding: '6px 12px', 
                        fontSize: '0.85rem', 
                        color: '#166534', 
                        borderColor: '#166534',
                        backgroundColor: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 600
                      }}
                    >
                      Buka Rute Google Maps
                    </a>
                  </div>
                </div>
              )}

              <Link to={`/receipt/${booking.booking_code || booking.id}`} className="btn btn-primary" style={{ padding: '12px 30px', borderRadius: '8px', marginTop: '24px', fontSize: '1.05rem' }}>
                <Receipt size={20} /> Cetak E-Tiket / Struk
              </Link>
            </div>
          )}

          {isCancelled && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AlertCircle size={64} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--danger)', fontWeight: 800 }}>Pemesanan Dibatalkan</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '500px' }}>
                Booking {booking.booking_code || '#EXP-' + booking.id} telah dibatalkan karena batas waktu pembayaran (1 jam) telah habis sebelum pembayaran DP diverifikasi.
              </p>
              <Link to="/packages" className="btn btn-outline" style={{ marginTop: '24px', borderWidth: '1px' }}>
                Cari Paket Wisata Lain <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {isWaiting && (
            <div>
              {/* Countdown Alert */}
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#b45309',
                fontWeight: 600,
                fontSize: '1rem',
                marginBottom: '32px'
              }}>
                <Clock size={20} />
                <span>Selesaikan transfer dalam waktu: </span>
                <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: 'var(--secondary)', fontWeight: 'bold' }}>
                  {formatTime(secondsRemaining)}
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', color: 'var(--dark)', fontWeight: 800 }}>Instruksi Pembayaran DP (30%)</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                Untuk mengaktifkan booking Anda, silakan transfer pembayaran DP (30%) ke rekening di bawah:
              </p>

              {/* Transfer Details */}
              <div style={{
                backgroundColor: 'var(--light-soft)',
                padding: '30px',
                borderRadius: 'var(--radius-lg)',
                margin: '32px 0',
                border: '1px solid #e2e8f0',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px' }}>
                  <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Paket Jeep Tour:</span>
                    <span style={{ fontWeight: 600, color: 'var(--dark)', textAlign: 'right' }}>{booking.package?.title}</span>
                  </div>
                  {booking.photo_package_name && (
                    <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Jasa Dokumentasi ({booking.photo_package_name}):</span>
                      <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Rp {numberFormat(booking.photo_package_price)}</span>
                    </div>
                  )}
                  {booking.addon_drone ? (
                    <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Add-on Drone Service:</span>
                      <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Rp {numberFormat(booking.addon_drone_price)}</span>
                    </div>
                  ) : null}
                  <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Total Biaya Trip:</span>
                    <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Rp {numberFormat(booking.total_price)}</span>
                  </div>
                  <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Uang Muka (DP 30%):</span>
                    <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Rp {numberFormat(booking.dp_amount)}</span>
                  </div>
                  <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sisa Pelunasan (Di Tempat):</span>
                    <span style={{ fontWeight: 600, color: 'var(--dark)' }}>Rp {numberFormat(parseFloat(booking.total_price) - parseFloat(booking.dp_amount))}</span>
                  </div>
                  <div className="payment-info-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Kode Unik (Identifikasi):</span>
                    <span style={{ fontWeight: 600, color: 'var(--success)' }}>+ Rp {booking.unique_code || 0}</span>
                  </div>
                  <div className="payment-total-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--dark)' }}>Total Wajib Transfer DP:</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary)' }}>
                      Rp {numberFormat(parseFloat(booking.dp_amount) + parseInt(booking.unique_code || 0))}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#b45309', backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontWeight: 500 }}>
                  ⚠️ Penting: Transfer nominal DP <strong>persis sampai 3 digit terakhir</strong> agar pembayaran Anda dapat diverifikasi dengan cepat oleh admin kami. Sisa pelunasan dibayarkan di lokasi trip kepada driver/guide.
                </p>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>
                  Transfer Ke Rekening:
                </p>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--dark)' }}>1370024593770</h3>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--dark-soft)' }}>Bank Mandiri</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>a.n. Andriyana</p>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <a
                  href={getWhatsAppConfirmLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '12px 30px', borderRadius: '8px', width: '100%', maxWidth: '400px', fontSize: '1rem' }}
                >
                  <PhoneCall size={20} /> Konfirmasi Transfer via WhatsApp
                </a>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '8px' }}>
                  *Status halaman ini akan diperbarui otomatis dalam 10 detik setelah Admin memverifikasi pembayaran Anda.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 500px) {
          .payment-info-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .payment-info-row > span:last-child {
            text-align: left !important;
          }
          .payment-total-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .payment-total-row > span:last-child {
            font-size: 1.25rem !important;
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

export default Payment;
