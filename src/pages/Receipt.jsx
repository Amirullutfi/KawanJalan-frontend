import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Compass, ArrowLeft, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const Receipt = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}`);
        setBooking(response.data.booking);
      } catch (error) {
        console.error('Error fetching booking for receipt:', error);
        setErrorMsg('Gagal memuat e-tiket.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Memuat E-Tiket...</div>;
  }

  if (errorMsg || !booking) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{errorMsg || 'Booking tidak ditemukan.'}</h3>
        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
      </div>
    );
  }

  const isCompleted = booking.payment_status === 'completed';
  const remainingBalance = isCompleted ? 0 : (parseFloat(booking.total_price) - parseFloat(booking.dp_amount));
  const paidAmount = isCompleted ? parseFloat(booking.total_price) : parseFloat(booking.dp_amount);
  const isPaid = booking.payment_status === 'paid_dp' || booking.payment_status === 'completed';

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Navigation Action Bar - Hidden during print */}
        <div className="no-print" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <Link to={`/payment/${booking.booking_code || booking.id}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            fontWeight: 600
          }}>
            <ArrowLeft size={16} /> Kembali ke Pembayaran
          </Link>
          
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={18} /> Cetak / Simpan PDF
          </button>
        </div>

        {/* E-Ticket Sheet card */}
        <div className="print-receipt-card" style={{
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Decorative Border */}
          <div style={{
            height: '6px',
            backgroundColor: 'var(--primary)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          }} />

          {/* Ticket Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px dashed #e2e8f0',
            paddingBottom: '30px',
            marginBottom: '30px'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--primary)'
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
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                E-Ticket & Bukti Pembayaran Resmi
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Kode Booking</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark)' }}>{booking.booking_code || '#EXP-' + booking.id}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Diterbitkan: {new Date(booking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Booking Status Stamp */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            {booking.payment_status === 'completed' ? (
              <div className="digital-stamp">LUNAS</div>
            ) : booking.payment_status === 'paid_dp' ? (
              <div className="digital-stamp">TERKONFIRMASI</div>
            ) : booking.payment_status === 'cancelled' ? (
              <div className="digital-stamp cancelled">BATAL / EXPIRED</div>
            ) : (
              <div className="digital-stamp waiting">MENUNGGU TRANSFER</div>
            )}
          </div>

          {/* Details Row: Customer & Travel Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '40px'
          }} className="detail-layout">
            
            {/* Customer info */}
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--dark)', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px' }}>
                Data Pemesan
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)', width: '110px' }}>Nama Lengkap</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {booking.customer_name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)' }}>Email</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {booking.customer_email}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)' }}>No. WhatsApp</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {booking.customer_phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Travel info */}
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--dark)', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px' }}>
                Rincian Perjalanan
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)', width: '120px' }}>Paket Wisata</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {booking.package?.title}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)' }}>Tanggal Tour</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {new Date(booking.travel_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)' }}>Jumlah Peserta</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {booking.num_people} {booking.package?.price_unit}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: 'var(--text-muted)' }}>Durasi Wisata</td>
                    <td style={{ padding: '6px 0', fontWeight: 'bold' }}>: {booking.package?.duration}</td>
                  </tr>
                  {booking.package?.title?.toLowerCase().includes('merapi') && (
                    <tr>
                      <td style={{ padding: '6px 0', color: 'var(--text-muted)' }}>Titik Kumpul</td>
                      <td style={{ padding: '6px 0', fontWeight: 'bold' }}>
                        : Penginapan Joglo trisaputran
                        <br />
                        <span style={{ display: 'inline-block', marginTop: '4px' }}>
                          <a 
                            href="https://maps.app.goo.gl/yc93hWyDEhrC6S7V9" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 'bold' }}
                          >
                            Lihat Rute Google Maps
                          </a>
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Ledger Table */}
          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--dark)', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '16px' }}>
              Rincian Biaya & Pelunasan
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--light-soft)', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 'bold' }}>Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 'bold', width: '100px' }}>Kuantitas</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', width: '180px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Jeep Tour Row */}
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px' }}>
                    Sewa Jeep - {booking.package?.title}
                    <br />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Tarif: Rp {numberFormat(booking.package?.price)} /{booking.package?.price_unit}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {booking.num_people}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                    Rp {numberFormat(booking.package?.price_unit === 'orang' ? booking.package?.price * booking.num_people : booking.package?.price)}
                  </td>
                </tr>

                {/* Photo Package Row */}
                {booking.photo_package_name && (
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px' }}>
                      Jasa Dokumentasi - Paket {booking.photo_package_name}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      1
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                      Rp {numberFormat(booking.photo_package_price)}
                    </td>
                  </tr>
                )}

                {/* Drone Add-on Row */}
                {booking.addon_drone ? (
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px' }}>
                      Layanan Ekstra Drone (Video + Pilot)
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      1
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                      Rp {numberFormat(booking.addon_drone_price)}
                    </td>
                  </tr>
                ) : null}

                {/* Subtotal Total Biaya Trip Row */}
                <tr style={{ borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }} colSpan={2}>
                    Total Biaya Trip:
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    Rp {numberFormat(booking.total_price)}
                  </td>
                </tr>
                {/* Total Paid Row */}
                <tr style={{ color: 'var(--success)' }}>
                  <td style={{ padding: '8px 16px', textAlign: 'right', fontSize: '0.9rem' }} colSpan={2}>
                    {isCompleted ? 'Pembayaran Lunas:' : 'Uang Muka (DP 30%):'}
                  </td>
                  <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                    - Rp {numberFormat(paidAmount)}
                  </td>
                </tr>
                <tr style={{ color: 'var(--success)' }}>
                  <td style={{ padding: '8px 16px', textAlign: 'right', fontSize: '0.9rem' }} colSpan={2}>
                    Kode Unik Pembayaran:
                  </td>
                  <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                    - Rp {numberFormat(booking.unique_code || 0)}
                  </td>
                </tr>
                <tr style={{ color: 'var(--success)', fontWeight: 'bold', borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }} colSpan={2}>
                    Total Terbayar:
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                    - Rp {numberFormat(paidAmount + parseInt(booking.unique_code || 0))}
                  </td>
                </tr>
                {/* Balance Row */}
                <tr style={{ backgroundColor: 'var(--primary-light)', fontWeight: 800, borderTop: '2px solid var(--primary)' }}>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }} colSpan={2}>
                    Sisa Pelunasan Wajib di Lokasi:
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--primary-hover)', fontSize: '1.1rem' }}>
                    Rp {numberFormat(remainingBalance)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ticket Footer / Instructions */}
          <div style={{
            borderTop: '1px solid #cbd5e1',
            paddingTop: '24px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <ShieldCheck size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontWeight: 'bold', color: 'var(--dark-soft)' }}>Ketentuan Pemakaian E-Tiket:</p>
              <ul style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Tunjukkan struk/e-tiket digital ini kepada pemandu wisata atau perwakilan kami di lokasi awal keberangkatan.</li>
                {isCompleted ? (
                  <li>Pemesanan Anda telah lunas sepenuhnya. Tidak ada tagihan sisa pembayaran di lokasi.</li>
                ) : (
                  <li>Pemesanan Anda telah dikonfirmasi dengan pembayaran Uang Muka (DP 30%). Sisa pelunasan sebesar Rp {numberFormat(remainingBalance)} wajib dibayarkan di lokasi trip kepada driver/guide.</li>
                )}
                <li>Simpan struk ini sebagai bukti pembayaran yang sah.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Responsive CSS helper */}
        <style>{`
          @media (max-width: 768px) {
            .print-receipt-card {
              padding: 24px !important;
            }
            .detail-layout {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            .print-receipt-card table {
              font-size: 0.85rem !important;
            }
            .print-receipt-card h3 {
              font-size: 1.25rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// Helper function
const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default Receipt;
