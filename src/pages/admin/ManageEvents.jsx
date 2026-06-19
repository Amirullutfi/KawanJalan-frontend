import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderPlus, ArrowLeft, Image as ImageIcon, Calendar } from 'lucide-react';
import api, { getMediaUrl } from '../../services/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [evtId, setEvtId] = useState(null); // null means adding, number means editing
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEditClick = (evt) => {
    setEvtId(evt.id);
    setTitle(evt.title);
    setDescription(evt.description || '');
    // Convert UTC datetime to local datetime string format for inputs
    const d = new Date(evt.date);
    const tzoffset = d.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(d.getTime() - tzoffset)).toISOString().slice(0, 16);
    setDate(localISOTime);
    
    setLocation(evt.location || '');
    setImagePreview(getMediaUrl(evt.main_image));
    setImageFile(null);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEvtId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setImagePreview('');
    setImageFile(null);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !location) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    if (imageFile) {
      formData.append('main_image', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (evtId) {
        // Edit Event (POST route to support multipart updates in PHP)
        await api.post(`/admin/events/${evtId}`, formData, config);
        alert('Event berhasil diperbarui!');
      } else {
        // Add Event
        await api.post('/admin/events', formData, config);
        alert('Event baru berhasil ditambahkan!');
      }
      setShowForm(false);
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setImageFile(null);
      setImagePreview('');
      setEvtId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error submitting event form:', error);
      alert('Terjadi kesalahan saat memproses data event.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus event pariwisata ini secara permanen?')) {
      try {
        await api.delete(`/admin/events/${id}`);
        alert('Event berhasil dihapus!');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Gagal menghapus event.');
      }
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Jadwal Event Daerah</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tambahkan, perbarui, atau hapus jadwal event seni budaya pariwisata daerah.</p>
        </div>
        {!showForm && (
          <button onClick={handleAddClick} className="btn btn-primary">
            <Plus size={16} /> Tambah Event
          </button>
        )}
      </div>

      {/* CRUD Form card */}
      {showForm ? (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #cbd5e1',
          padding: '30px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <button onClick={() => setShowForm(false)} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
            border: 'none',
            fontWeight: 600,
            marginBottom: '20px',
            cursor: 'pointer'
          }}>
            <ArrowLeft size={16} /> Kembali ke Daftar
          </button>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderPlus size={20} style={{ color: 'var(--primary)' }} />
            {evtId ? 'Ubah Rincian Event' : 'Tambah Event Wisata Baru'}
          </h3>

          <form onSubmit={handleFormSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '30px'
            }} className="booking-layout">
              {/* Left Column Fields */}
              <div>
                <div className="form-group">
                  <label className="form-label">Nama Kegiatan (Title)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Pesta Kesenian Bali (Bali Arts Festival) 2026"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rincian Kegiatan (Deskripsi)</label>
                  <textarea
                    className="form-input"
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tuliskan jadwal kegiatan, pengisi acara, tiket masuk, dll..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.2fr',
                  gap: '16px'
                }}>
                  <div className="form-group">
                    <label className="form-label">Tanggal & Jam Pelaksanaan</label>
                    <input
                      type="datetime-local"
                      required
                      className="form-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tempat / Lokasi</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Contoh: Art Center Denpasar, Bali"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column Upload Banner */}
              <div>
                <div className="form-group">
                  <label className="form-label">Gambar Banner / Pamflet Event</label>
                  <div style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'var(--light-soft)',
                    position: 'relative',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }} onClick={() => document.getElementById('evtImageInput').click()}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                    ) : (
                      <>
                        <ImageIcon size={40} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Klik untuk unggah gambar</span>
                      </>
                    )}
                  </div>
                  <input
                    id="evtImageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-outline"
                    style={{ width: '100px', padding: '10px', fontSize: '0.9rem', borderWidth: '1px' }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ flexGrow: 1, padding: '10px', fontSize: '0.9rem' }}
                  >
                    {submitting ? 'Menyimpan...' : 'Simpan Event'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Table of events */
        loading ? (
          <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat daftar event...</div>
        ) : events.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Belum ada data event pariwisata ditambahkan.
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
                  <th style={{ padding: '12px 16px', width: '80px' }}>Banner</th>
                  <th style={{ padding: '12px 16px' }}>Nama Event</th>
                  <th style={{ padding: '12px 16px' }}>Tanggal Acara</th>
                  <th style={{ padding: '12px 16px' }}>Lokasi</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '150px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => (
                  <tr key={evt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '60px', height: '45px', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={getMediaUrl(evt.main_image)} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{evt.title}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {new Date(evt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                    </td>
                    <td style={{ padding: '12px 16px' }}>{evt.location}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditClick(evt)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                          title="Ubah Rincian"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(evt.id)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                          title="Hapus Event"
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
        )
      )}
    </div>
  );
};

export default ManageEvents;
