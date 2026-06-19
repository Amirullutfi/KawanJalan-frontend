import React, { useState, useEffect } from 'react';
import { PhoneCall, Trash2, Search, Mail, Eye, Download } from 'lucide-react';
import api from '../../services/api';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/admin/bookings?status=${activeTab}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    try {
      await api.put(`/admin/bookings/${bookingId}/status`, { payment_status: newStatus });
      alert('Status pemesanan berhasil diperbarui!');
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal memperbarui status pemesanan.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data transaksi ini secara permanen?')) {
      try {
        await api.delete(`/admin/bookings/${bookingId}`);
        alert('Data transaksi berhasil dihapus!');
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Gagal menghapus data transaksi.');
      }
    }
  };

  // Filter bookings client-side with search query
  const filteredBookings = bookings.filter(book =>
    book.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.customer_phone.includes(searchQuery) ||
    (book.booking_code && book.booking_code.toLowerCase().includes(searchQuery.toLowerCase())) ||
    book.id.toString() === searchQuery.replace(/\D/g, '')
  );

  // Format phone to international format: starts with 62
  const formatWhatsAppNumber = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
  };

  const getStatusLabel = (status) => {
    const s = {
      waiting_payment: 'Menunggu',
      paid_dp: 'DP Terbayar',
      completed: 'Selesai',
      cancelled: 'Batal'
    };
    return s[status] || status;
  };

  const tabs = [
    { key: 'all', label: 'Semua' },
    { key: 'waiting_payment', label: 'Menunggu Bayar' },
    { key: 'paid_dp', label: 'DP Terbayar' },
    { key: 'completed', label: 'Selesai' },
    { key: 'cancelled', label: 'Batal' }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Transaksi Booking</h1>
        <p style={{ color: 'var(--text-muted)' }}>Pantau dan verifikasi pembayaran uang muka (DP 30%) dari pelanggan.</p>
      </div>

      {/* Tabs Layout */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #cbd5e1',
        marginBottom: '24px',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setLoading(true); setActiveTab(t.key); }}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: activeTab === t.key ? 'var(--primary)' : 'transparent',
              color: activeTab === t.key ? 'white' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search Filter */}
      <div style={{
        position: 'relative',
        maxWidth: '400px',
        width: '100%',
        marginBottom: '24px'
      }}>
        <Search size={16} style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)'
        }} />
        <input
          type="text"
          placeholder="Cari berdasarkan nama, no WA, atau kode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '38px', fontSize: '0.9rem', borderRadius: '8px' }}
        />
      </div>

      {/* Main Table */}
      {loading ? (
        <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat data transaksi...</div>
      ) : filteredBookings.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          Tidak ada data transaksi booking dalam kategori ini.
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--light-soft)', color: 'var(--text-muted)', borderBottom: '1px solid #cbd5e1', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Kode</th>
                <th style={{ padding: '12px 16px' }}>Detail Pelanggan</th>
                <th style={{ padding: '12px 16px' }}>Paket Wisata</th>
                <th style={{ padding: '12px 16px' }}>Waktu Tour & Pax</th>
                <th style={{ padding: '12px 16px' }}>Ledger Biaya</th>
                <th style={{ padding: '12px 16px' }}>Aksi Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Navigasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  
                  {/* Code */}
                  <td style={{ padding: '16px', fontWeight: 'bold' }}>{book.booking_code || '#EXP-' + book.id}</td>
                  
                  {/* Customer details */}
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{book.customer_name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Mail size={12} /> {book.customer_email}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <PhoneCall size={12} /> {book.customer_phone}
                    </div>
                  </td>

                  {/* Package title */}
                  <td style={{ padding: '16px', maxWidth: '180px' }}>
                    <div style={{ fontWeight: 600 }}>{book.package?.title || 'Paket Terhapus'}</div>
                    {book.photo_package_name && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--primary)', marginTop: '4px', fontWeight: 600 }}>
                        📸 Foto: {book.photo_package_name}
                      </div>
                    )}
                    {book.addon_drone ? (
                      <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', marginTop: '2px', fontWeight: 600 }}>
                        🛸 Drone: Ya
                      </div>
                    ) : null}
                  </td>

                  {/* Travel date & pax */}
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600 }}>{new Date(book.travel_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Kuantitas: {book.num_people} {book.package?.price_unit}</div>
                  </td>

                  {/* Ledger Price */}
                  <td style={{ padding: '16px' }}>
                    <div>Total: <strong>Rp {book.total_price.toLocaleString('id-ID')}</strong></div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 'bold', marginTop: '2px' }}>
                      Transfer: Rp {(parseFloat(book.dp_amount) + parseInt(book.unique_code || 0)).toLocaleString('id-ID')}
                      <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '4px' }}>(Kode: {book.unique_code || 0})</span>
                    </div>
                  </td>

                  {/* Dropdown status update */}
                  <td style={{ padding: '16px' }}>
                    <select
                      value={book.payment_status}
                      disabled={updatingId === book.id}
                      onChange={(e) => handleStatusChange(book.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: 
                          book.payment_status === 'waiting_payment' ? '#fffbeb' :
                          book.payment_status === 'paid_dp' ? '#d1fae5' :
                          book.payment_status === 'completed' ? '#e0f2fe' : '#fee2e2',
                        color: 
                          book.payment_status === 'waiting_payment' ? '#b45309' :
                          book.payment_status === 'paid_dp' ? '#065f46' :
                          book.payment_status === 'completed' ? '#0369a1' : '#991b1b',
                      }}
                    >
                      <option value="waiting_payment">Menunggu Pembayaran</option>
                      <option value="paid_dp">DP Terbayar</option>
                      <option value="completed">Selesai (Trip Selesai)</option>
                      <option value="cancelled">Batal / Expired</option>
                    </select>
                  </td>

                  {/* Navigation Links (WA, Delete, Print) */}
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <a
                        href={`https://wa.me/${formatWhatsAppNumber(book.customer_phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--success)', color: 'var(--success)' }}
                        title="Chat WhatsApp"
                      >
                        <PhoneCall size={14} />
                      </a>
                      
                      <a
                        href={`/receipt/${book.booking_code || book.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                        title="Lihat E-Tiket / Print"
                      >
                        <Eye size={14} />
                      </a>

                      <button
                        onClick={() => handleDelete(book.id)}
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                        title="Hapus Transaksi"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
