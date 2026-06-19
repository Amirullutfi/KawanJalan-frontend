import React, { useState, useEffect } from 'react';
import { Trash2, Download, Users, Mail, PhoneCall } from 'lucide-react';
import api from '../../services/api';

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const response = await api.get('/admin/registrations');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching event registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data registrasi peserta ini?')) {
      try {
        await api.delete(`/admin/registrations/${id}`);
        alert('Registrasi peserta berhasil dihapus!');
        fetchRegistrations();
      } catch (error) {
        console.error('Error deleting registration:', error);
        alert('Gagal menghapus registrasi peserta.');
      }
    }
  };

  // Helper to format WhatsApp phone number
  const formatWhatsAppNumber = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
  };

  // Export to CSV using Blob to support Sanctum Auth headers
  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const response = await api.get('/admin/registrations-export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `event_registrations_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Gagal mengekspor data registrasi event:', error);
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Daftar Pendaftar Event</h1>
          <p style={{ color: 'var(--text-muted)' }}>Melihat dan mengunduh daftar pengunjung yang terdaftar dalam event wisata daerah.</p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={exporting || registrations.length === 0}
          className="btn btn-outline"
          style={{ padding: '10px 20px', borderRadius: '8px', borderWidth: '1px' }}
        >
          <Download size={16} />
          {exporting ? 'Mengekspor...' : 'Ekspor Data (CSV)'}
        </button>
      </div>

      {/* Main Table */}
      {loading ? (
        <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat data pendaftar event...</div>
      ) : registrations.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Users size={40} style={{ color: '#cbd5e1', marginBottom: '8px' }} />
          <p>Belum ada peserta yang mendaftar event daerah saat ini.</p>
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
                <th style={{ padding: '12px 16px' }}>Peserta</th>
                <th style={{ padding: '12px 16px' }}>Event Wisata yang Diikuti</th>
                <th style={{ padding: '12px 16px' }}>Tanggal Acara</th>
                <th style={{ padding: '12px 16px' }}>Tempat Pelaksanaan</th>
                <th style={{ padding: '12px 16px' }}>Waktu Pendaftaran</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', width: '150px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  
                  {/* Participant details */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{reg.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Mail size={12} /> {reg.email}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <PhoneCall size={12} /> {reg.phone}
                    </div>
                  </td>

                  {/* Event Title */}
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--primary-hover)', maxWidth: '200px' }}>
                    {reg.event?.title || 'Event Terhapus'}
                  </td>

                  {/* Event Date */}
                  <td style={{ padding: '14px 16px' }}>
                    {reg.event ? new Date(reg.event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                  </td>

                  {/* Event Location */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {reg.event?.location || '-'}
                  </td>

                  {/* Date registered */}
                  <td style={{ padding: '14px 16px' }}>
                    {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                  </td>

                  {/* Actions (WhatsApp & Delete) */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <a
                        href={`https://wa.me/${formatWhatsAppNumber(reg.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--success)', color: 'var(--success)' }}
                        title="Chat WhatsApp"
                      >
                        <PhoneCall size={14} />
                      </a>
                      <button
                        onClick={() => handleDelete(reg.id)}
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                        title="Hapus Registrasi"
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

export default RegistrationsList;
