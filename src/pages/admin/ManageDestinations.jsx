import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderPlus, ArrowLeft, Image as ImageIcon, Check } from 'lucide-react';
import api, { getMediaUrl } from '../../services/api';

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [destId, setDestId] = useState(null); // null means adding, number means editing
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const [destRes, catRes] = await Promise.all([
        api.get('/destinations'),
        api.get('/categories')
      ]);
      setDestinations(destRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error('Error fetching destinations data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (dest) => {
    setDestId(dest.id);
    setCategoryId(dest.category_id);
    setTitle(dest.title);
    setExcerpt(dest.excerpt || '');
    setDescription(dest.description || '');
    setLocation(dest.location || '');
    setFeatured(dest.featured);
    setImagePreview(getMediaUrl(dest.main_image));
    setImageFile(null);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setDestId(null);
    setCategoryId(categories[0]?.id || '');
    setTitle('');
    setExcerpt('');
    setDescription('');
    setLocation('');
    setFeatured(false);
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
    if (!title || !categoryId || !location) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append('category_id', categoryId);
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('featured', featured ? 'true' : 'false');
    if (imageFile) {
      formData.append('main_image', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (destId) {
        // Edit Destination (POST route for updates since PHP multipart/form-data doesn't parse PUT on some servers)
        await api.post(`/admin/destinations/${destId}`, formData, config);
        alert('Destinasi berhasil diperbarui!');
      } else {
        // Add Destination
        await api.post('/admin/destinations', formData, config);
        alert('Destinasi baru berhasil ditambahkan!');
      }
      setShowForm(false);
      setTitle('');
      setExcerpt('');
      setDescription('');
      setLocation('');
      setFeatured(false);
      setImageFile(null);
      setImagePreview('');
      setDestId(null);
      fetchData();
    } catch (error) {
      console.error('Error submitting destination form:', error);
      alert('Terjadi kesalahan saat memproses data destinasi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus objek destinasi wisata ini secara permanen?')) {
      try {
        await api.delete(`/admin/destinations/${id}`);
        alert('Destinasi berhasil dihapus!');
        fetchData();
      } catch (error) {
        console.error('Error deleting destination:', error);
        alert('Gagal menghapus destinasi.');
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Objek Destinasi Wisata</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tambahkan, perbarui, atau hapus daftar objek wisata Indonesia.</p>
        </div>
        {!showForm && (
          <button onClick={handleAddClick} className="btn btn-primary">
            <Plus size={16} /> Tambah Destinasi
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
            {destId ? 'Ubah Rincian Destinasi' : 'Tambah Destinasi Wisata Baru'}
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
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div className="form-group">
                    <label className="form-label">Nama Destinasi (Title)</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Contoh: Pantai Pandawa Bali"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kategori Wisata</label>
                    <select
                      className="form-input"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Lokasi Administratif (Kabupaten, Provinsi)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Badung, Bali"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kutipan Singkat (Excerpt)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Deskripsi singkat 1-2 baris untuk kartu ulasan..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ulasan Lengkap (Deskripsi)</label>
                  <textarea
                    className="form-input"
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ulasan detail, peta jalan, sejarah, atraksi yang ditawarkan..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="destFeatured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="destFeatured" style={{ fontWeight: 600, cursor: 'pointer', userSelect: 'none' }}>
                    Tandai Sebagai Destinasi Unggulan (Featured)
                  </label>
                </div>
              </div>

              {/* Right Column Upload Banner */}
              <div>
                <div className="form-group">
                  <label className="form-label">Foto Utama Destinasi</label>
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
                  }} onClick={() => document.getElementById('destImageInput').click()}>
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
                    id="destImageInput"
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
                    {submitting ? 'Menyimpan...' : 'Simpan Destinasi'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Table of destinations */
        loading ? (
          <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat daftar destinasi...</div>
        ) : destinations.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Belum ada objek destinasi wisata ditambahkan.
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
                  <th style={{ padding: '12px 16px' }}>Nama Destinasi</th>
                  <th style={{ padding: '12px 16px' }}>Kategori</th>
                  <th style={{ padding: '12px 16px' }}>Lokasi Administratif</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Unggulan</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '150px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '60px', height: '45px', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={getMediaUrl(dest.main_image)} alt={dest.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{dest.title}</td>
                    <td style={{ padding: '12px 16px' }}>{dest.category?.name || 'Kategori Terhapus'}</td>
                    <td style={{ padding: '12px 16px' }}>{dest.location}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {dest.featured ? (
                        <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          Ya
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tidak</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditClick(dest)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                          title="Ubah Rincian"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(dest.id)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                          title="Hapus Destinasi"
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

export default ManageDestinations;
