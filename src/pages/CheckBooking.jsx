import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, Compass, ShieldCheck, Clock, CheckCircle2, AlertCircle, Eye, Receipt, ArrowRight, User, Phone } from 'lucide-react';
import api from '../services/api';

const CheckBooking = () => {
  const navigate = useNavigate();
  const [bookingCode, setBookingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setBooking(null);
    setHasSearched(true);

    // Clean code: trim and remove starting '#' if present
    let cleanedId = bookingCode.trim();
    if (cleanedId.startsWith('#')) {
      cleanedId = cleanedId.substring(1);
    }

    if (!cleanedId) {
      setErrorMsg('Format kode booking tidak valid. Silakan masukkan kode booking yang benar.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/bookings/${cleanedId}`);
      if (response.data && response.data.booking) {
        setBooking(response.data.booking);
      } else {
        setErrorMsg('Data pemesanan tidak ditemukan.');
      }
    } catch (error) {
      console.error('Error searching booking:', error);
      setErrorMsg(error.response?.data?.message || 'Gagal memuat data pemesanan. Pastikan kode booking Anda benar.');
    } finally {
      setLoading(false);
    }
  };

  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getStatusDetails = (status) => {
    const details = {
      waiting_payment: { 
        label: 'Menunggu Pembayaran DP', 
        bg: '#fffbeb', 
        color: '#b45309', 
        icon: Clock,
        desc: 'Segera selesaikan transfer Down Payment (DP 30%) Anda untuk mengamankan slot perjalanan.'
      },
      paid_dp: { 
        label: 'DP Terbayar (Terkonfirmasi)', 
        bg: '#d1fae5', 
        color: '#065f46', 
        icon: ShieldCheck,
        desc: 'Pembayaran DP 30% telah kami terima. E-Tiket Anda sekarang aktif dan sisa pelunasan dibayar di lokasi.'
      },
      completed: { 
        label: 'Trip Selesai', 
        bg: '#e0f2fe', 
        color: '#0369a1', 
        icon: CheckCircle2,
        desc: 'Trip wisata Anda telah selesai. Terima kasih telah bepergian bersama kami!'
      },
      cancelled: { 
        label: 'Dibatalkan', 
        bg: '#fee2e2', 
        color: '#991b1b', 
        icon: AlertCircle,
        desc: 'Booking dibatalkan karena batas waktu pembayaran habis atau dibatalkan oleh admin.'
      }
    };
    return details[status] || { label: status, bg: '#f1f5f9', color: '#475569', icon: Clock, desc: '' };
  };

  return (
    <div style={{ padding: '60px 0 100px', backgroundColor: '#f8fafc', minHeight: '85vh' }} className="animate-fade-in">
      <div className="container" style={{ maxWidth: '750px' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--dark)', marginBottom: '12px' }}>
            Cek Status Pemesanan
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Masukkan kode booking Anda di bawah ini untuk melihat status pembayaran dan mengunduh E-Tiket perjalanan Anda.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="glass" style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          gap: '16px',
          marginBottom: '30px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '250px' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Contoh: EXP-W9B8XT atau #EXP-12"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '44px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1'
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              padding: '12px 28px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              minWidth: '150px'
            }}
          >
            {loading ? 'Mencari...' : 'Cari Booking'}
          </button>
        </form>

        {/* Error Message */}
        {errorMsg && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#b91c1c',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '30px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Search Results */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Menghubungkan ke server untuk mencari data pemesanan...
          </div>
        )}

        {hasSearched && !loading && booking && (() => {
          const status = getStatusDetails(booking.payment_status);
          const StatusIcon = status.icon;
          const remainingBalance = booking.payment_status === 'completed' ? 0 : (parseFloat(booking.total_price) - parseFloat(booking.dp_amount));

          return (
            <div className="glass animate-fade-in-up" style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid #cbd5e1'
            }}>
              {/* Header Status */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '20px',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>Kode Booking</p>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--dark)', margin: 0 }}>{booking.booking_code || '#EXP-' + booking.id}</h3>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: status.bg,
                  color: status.color,
                  padding: '8px 16px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase'
                }}>
                  <StatusIcon size={16} />
                  <span>{status.label}</span>
                </div>
              </div>

              {/* Status Explanation */}
              {status.desc && (
                <div style={{
                  backgroundColor: status.bg,
                  color: status.color,
                  padding: '14px 18px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: '24px'
                }}>
                  {status.desc}
                </div>
              )}

              {/* Booking Summary Columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                marginBottom: '30px'
              }} className="detail-layout">
                {/* Column 1: Pelanggan */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Informasi Kontak
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} style={{ color: 'var(--primary)' }} />
                      <span>{booking.customer_name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                      <span>✉ {booking.customer_email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                      <Phone size={16} style={{ color: 'var(--primary)' }} />
                      <span>{booking.customer_phone}</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Rincian Tour */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Rincian Perjalanan
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--dark-soft)' }}>
                      {booking.package?.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                      <Calendar size={16} style={{ color: 'var(--primary)' }} />
                      <span>Keberangkatan: {new Date(booking.travel_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div>
                      Jumlah Peserta: <strong>{booking.num_people} {booking.package?.price_unit}</strong>
                    </div>
                    {booking.package?.title?.toLowerCase().includes('merapi') && (
                      <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 600, display: 'block' }}>📍 Titik Kumpul:</span>
                        <span style={{ fontSize: '0.88rem', color: '#14532d', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Penginapan Joglo trisaputran</span>
                        <a 
                          href="https://maps.app.goo.gl/yc93hWyDEhrC6S7V9" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: 'var(--primary)', textDecoration: 'underline', fontSize: '0.82rem', fontWeight: 'bold' }}
                        >
                          Lihat Rute Google Maps
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{
                backgroundColor: 'var(--light-soft)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #cbd5e1',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--dark-soft)', marginBottom: '16px' }}>Status Pembayaran</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Total Biaya Trip:</span>
                    <span style={{ fontWeight: 600 }}>Rp {numberFormat(booking.total_price)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Uang Muka (DP 30%):</span>
                    <span style={{ fontWeight: 600 }}>Rp {numberFormat(booking.dp_amount)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Kode Unik:</span>
                    <span style={{ fontWeight: 600, color: 'var(--success)' }}>+ Rp {booking.unique_code || 0}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Total Pembayaran DP:</span>
                    <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>Rp {numberFormat(parseFloat(booking.dp_amount) + parseInt(booking.unique_code || 0))}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.05rem', paddingTop: '4px' }}>
                    <span style={{ color: 'var(--dark)' }}>Sisa Pelunasan di Lokasi:</span>
                    <span style={{ color: 'var(--primary)' }}>Rp {numberFormat(remainingBalance)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {booking.payment_status === 'waiting_payment' && (
                  <Link
                    to={`/payment/${booking.booking_code || booking.id}`}
                    className="btn btn-primary"
                    style={{ padding: '12px 30px', borderRadius: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Lanjutkan ke Pembayaran <ArrowRight size={16} />
                  </Link>
                )}

                {(booking.payment_status === 'paid_dp' || booking.payment_status === 'completed') && (
                  <Link
                    to={`/receipt/${booking.booking_code || booking.id}`}
                    target="_blank"
                    className="btn btn-primary"
                    style={{ padding: '12px 30px', borderRadius: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Receipt size={18} /> Cetak E-Tiket / Struk
                  </Link>
                )}

                {booking.payment_status === 'cancelled' && (
                  <Link
                    to="/packages"
                    className="btn btn-outline"
                    style={{ padding: '12px 30px', borderRadius: '10px', fontSize: '1rem', borderWidth: '1px' }}
                  >
                    Cari Paket Lain <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        {hasSearched && !loading && !booking && !errorMsg && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Hasil pencarian kosong. Silakan periksa kembali kode booking Anda.
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 576px) {
          .detail-layout { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default CheckBooking;
