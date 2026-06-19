import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderPlus, ArrowLeft, Image as ImageIcon, Star } from 'lucide-react';
import api, { getMediaUrl } from '../../services/api';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [testiId, setTestiId] = useState(null); // null means adding, number means editing
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEditClick = (testi) => {
    setTestiId(testi.id);
    setName(testi.name);
    setProfession(testi.profession || '');
    setQuote(testi.quote || '');
    setRating(testi.rating);
    setImagePreview(getMediaUrl(testi.image));
    setImageFile(null);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setTestiId(null);
    setName('');
    setProfession('');
    setQuote('');
    setRating(5);
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
    if (!name || !quote || !rating) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('profession', profession);
    formData.append('quote', quote);
    formData.append('rating', rating);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (testiId) {
        // Edit Testimonial (POST route to support uploads update in PHP)
        await api.post(`/admin/testimonials/${testiId}`, formData, config);
        alert('Testimoni berhasil diperbarui!');
      } else {
        // Add Testimonial
        await api.post('/admin/testimonials', formData, config);
        alert('Testimoni baru berhasil ditambahkan!');
      }
      setShowForm(false);
      setName('');
      setProfession('');
      setQuote('');
      setRating(5);
      setImageFile(null);
      setImagePreview('');
      setTestiId(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Error submitting testimonial form:', error);
      alert('Terjadi kesalahan saat memproses data testimoni.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus ulasan testimoni ini secara permanen?')) {
      try {
        await api.delete(`/admin/testimonials/${id}`);
        alert('Testimoni berhasil dihapus!');
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Gagal menghapus testimoni.');
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Ulasan Testimoni</h1>
          <p style={{ color: 'var(--text-muted)' }}>Atur ulasan dan tingkat kepuasan bintang (1-5) dari pengunjung website.</p>
        </div>
        {!showForm && (
          <button onClick={handleAddClick} className="btn btn-primary">
            <Plus size={16} /> Tambah Testimoni
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
            {testiId ? 'Ubah Ulasan Testimoni' : 'Tambah Testimoni Baru'}
          </h3>

          <form onSubmit={handleFormSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '30px'
            }} className="booking-layout">
              {/* Left Column Fields */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '16px'
                }}>
                  <div className="form-group">
                    <label className="form-label">Nama Klien / Pengunjung</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Ferry Setiawan"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Profesi / Pekerjaan</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="Contoh: Karyawan Swasta"
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '16px'
                }}>
                  <div className="form-group">
                    <label className="form-label">Skala Bintang Kepuasan (Rating)</label>
                    <select
                      className="form-input"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 Bintang)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Bintang)</option>
                      <option value="3">⭐⭐⭐ (3 Bintang)</option>
                      <option value="2">⭐⭐ (2 Bintang)</option>
                      <option value="1">⭐ (1 Bintang)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Isi Kutipan Ulasan (Quote)</label>
                  <textarea
                    required
                    className="form-input"
                    rows="4"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Tuliskan pengalaman positif pelanggan selama mengikuti tour..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Right Column Upload Banner */}
              <div>
                <div className="form-group">
                  <label className="form-label">Foto Profil Klien (Opsional)</label>
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
                  }} onClick={() => document.getElementById('testiImageInput').click()}>
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
                    id="testiImageInput"
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
                    {submitting ? 'Menyimpan...' : 'Simpan Ulasan'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Table of testimonials */
        loading ? (
          <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat daftar testimoni...</div>
        ) : testimonials.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Belum ada ulasan testimoni ditambahkan.
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
                  <th style={{ padding: '12px 16px', width: '80px' }}>Foto</th>
                  <th style={{ padding: '12px 16px' }}>Nama Pelanggan</th>
                  <th style={{ padding: '12px 16px' }}>Profesi</th>
                  <th style={{ padding: '12px 16px' }}>Kutipan Review</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Rating</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '150px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testi) => (
                  <tr key={testi.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                        <img src={getMediaUrl(testi.image)} alt={testi.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{testi.name}</td>
                    <td style={{ padding: '12px 16px' }}>{testi.profession || '-'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)', maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>"{testi.quote}"</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
                        {Array.from({ length: testi.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditClick(testi)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                          title="Ubah Ulasan"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(testi.id)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                          title="Hapus Ulasan"
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

export default ManageTestimonials;
