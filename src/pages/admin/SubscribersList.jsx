import React, { useState, useEffect } from 'react';
import { Trash2, Download, Mail, Users } from 'lucide-react';
import api from '../../services/api';

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchSubscribers = async () => {
    try {
      const response = await api.get('/admin/subscribers');
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus email langganan ini?')) {
      try {
        await api.delete(`/admin/subscribers/${id}`);
        alert('Subscriber berhasil dihapus!');
        fetchSubscribers();
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        alert('Gagal menghapus subscriber.');
      }
    }
  };

  // Export to CSV using Blob to support Sanctum Auth headers
  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const response = await api.get('/admin/subscribers-export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `subscribers_kawanjalan_tour_travel_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Gagal mengekspor data subscribers:', error);
      alert('Terjadi kesalahan saat mengekspor data.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Daftar Newsletter Subscribers</h1>
          <p style={{ color: 'var(--text-muted)' }}>Melihat alamat email pengunjung yang terdaftar dalam newsletter promosi.</p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={exporting || subscribers.length === 0}
          className="btn btn-outline"
          style={{ padding: '10px 20px', borderRadius: '8px', borderWidth: '1px' }}
        >
          <Download size={16} />
          {exporting ? 'Mengekspor...' : 'Ekspor Data (CSV)'}
        </button>
      </div>

      {/* Main Table */}
      {loading ? (
        <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat data subscriber...</div>
      ) : subscribers.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Mail size={40} style={{ color: '#cbd5e1', marginBottom: '8px' }} />
          <p>Belum ada email pelanggan terdaftar dalam newsletter.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--light-soft)', color: 'var(--text-muted)', borderBottom: '1px solid #cbd5e1', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px', width: '80px' }}>ID</th>
                <th style={{ padding: '12px 16px' }}>Nama Lengkap</th>
                <th style={{ padding: '12px 16px' }}>Alamat Email</th>
                <th style={{ padding: '12px 16px' }}>No. Telepon / WA</th>
                <th style={{ padding: '12px 16px' }}>Tanggal Bergabung</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>#{sub.id}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold' }}>{sub.name || '-'}</td>
                  <td style={{ padding: '14px 16px' }}>{sub.email}</td>
                  <td style={{ padding: '14px 16px' }}>{sub.phone || '-'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {new Date(sub.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                        title="Hapus Subscriber"
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

export default SubscribersList;
