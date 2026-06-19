import React, { useState, useEffect } from 'react';
import { Compass, CalendarCheck, Users, Mail, TrendingUp, RefreshCw } from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    destinations: 0,
    bookings: 0,
    registrations: 0,
    subscribers: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      const [destRes, bookRes, regRes, subRes] = await Promise.all([
        api.get('/destinations'),
        api.get('/admin/bookings'),
        api.get('/admin/registrations'),
        api.get('/admin/subscribers')
      ]);

      setStats({
        destinations: destRes.data.length,
        bookings: bookRes.data.length,
        registrations: regRes.data.length,
        subscribers: subRes.data.length
      });

      setRecentBookings(bookRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Memuat ringkasan dashboard...</div>;
  }

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      waiting_payment: { bg: '#fffbeb', text: '#b45309', label: 'Menunggu Bayar' },
      paid_dp: { bg: '#d1fae5', text: '#065f46', label: 'DP Terbayar' },
      completed: { bg: '#e0f2fe', text: '#0369a1', label: 'Selesai' },
      cancelled: { bg: '#fee2e2', text: '#991b1b', label: 'Dibatalkan' }
    };
    const s = styles[status] || { bg: '#f1f5f9', text: '#475569', label: status };

    return (
      <span style={{
        backgroundColor: s.bg,
        color: s.text,
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '0.78rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Ringkasan Statistik</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Selamat datang di panel kontrol KawanJalan Tour & Travel.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={refreshing}
          className="btn btn-outline"
          style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', borderWidth: '1px' }}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Grid of 4 Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Metric 1 */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Destinasi</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', marginTop: '4px' }}>{stats.destinations}</h3>
          </div>
          <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '12px', borderRadius: '12px' }}>
            <Compass size={24} />
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Transaksi Booking</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', marginTop: '4px' }}>{stats.bookings}</h3>
          </div>
          <div style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '12px', borderRadius: '12px' }}>
            <CalendarCheck size={24} />
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Pendaftar Event</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', marginTop: '4px' }}>{stats.registrations}</h3>
          </div>
          <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '12px', borderRadius: '12px' }}>
            <Users size={24} />
          </div>
        </div>

        {/* Metric 4 */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Subscribers</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', marginTop: '4px' }}>{stats.subscribers}</h3>
          </div>
          <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '12px', borderRadius: '12px' }}>
            <Mail size={24} />
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
          Pemesanan Tour Terbaru
        </h3>
        
        {recentBookings.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '20px 0', textAlign: 'center' }}>Belum ada data pemesanan masuk.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #cbd5e1', color: 'var(--text-muted)', fontWeight: 600 }}>
                  <th style={{ padding: '12px 16px' }}>Kode</th>
                  <th style={{ padding: '12px 16px' }}>Nama Pelanggan</th>
                  <th style={{ padding: '12px 16px' }}>Paket Tour</th>
                  <th style={{ padding: '12px 16px' }}>Tanggal Keberangkatan</th>
                  <th style={{ padding: '12px 16px' }}>Total Biaya</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((book) => (
                  <tr key={book.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 'bold' }}>{book.booking_code || '#EXP-' + book.id}</td>
                    <td style={{ padding: '14px 16px' }}>{book.customer_name}</td>
                    <td style={{ padding: '14px 16px' }}>{book.package?.title || 'Paket Terhapus'}</td>
                    <td style={{ padding: '14px 16px' }}>{new Date(book.travel_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>Rp {book.total_price.toLocaleString('id-ID')}</td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(book.payment_status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
