import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderPlus, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api, { getMediaUrl } from '../../services/api';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [pkgId, setPkgId] = useState(null); // null means adding, number means editing
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('orang');
  const [duration, setDuration] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEditClick = (pkg) => {
    setPkgId(pkg.id);
    setTitle(pkg.title);
    setDescription(pkg.description || '');
    setPrice(pkg.price);
    setPriceUnit(pkg.price_unit);
    setDuration(pkg.duration || '');
    setImagePreview(getMediaUrl(pkg.main_image));
    setImageFile(null);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setPkgId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setPriceUnit('orang');
    setDuration('');
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
    if (!title || !price || !priceUnit || !duration) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('price_unit', priceUnit);
    formData.append('duration', duration);
    if (imageFile) {
      formData.append('main_image', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (pkgId) {
        // Edit Package
        // Note: For Laravel uploads in PUT requests sometimes it gets empty, 
        // hence in api.php we map POST route to handle update with custom POST routes
        await api.post(`/admin/packages/${pkgId}`, formData, config);
        alert('Paket wisata berhasil diperbarui!');
      } else {
        // Add Package
        await api.post('/admin/packages', formData, config);
        alert('Paket wisata baru berhasil ditambahkan!');
      }
      setShowForm(false);
      setTitle('');
      setDescription('');
      setPrice('');
      setPriceUnit('orang');
      setDuration('');
      setImageFile(null);
      setImagePreview('');
      setPkgId(null);
      fetchPackages();
    } catch (error) {
      console.error('Error submitting package form:', error);
      alert('Terjadi kesalahan saat memproses data paket wisata.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus paket wisata ini secara permanen?')) {
      try {
        await api.delete(`/admin/packages/${id}`);
        alert('Paket wisata berhasil dihapus!');
        fetchPackages();
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('Gagal menghapus paket wisata.');
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Paket Wisata</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tambahkan, perbarui, atau hapus katalog paket tour wisata pariwisata.</p>
        </div>
        {!showForm && (
          <button onClick={handleAddClick} className="btn btn-primary">
            <Plus size={16} /> Tambah Paket Tour
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
            {pkgId ? 'Ubah Rincian Paket' : 'Tambah Paket Tour Baru'}
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
                  <label className="form-label">Nama Paket Wisata (Title)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Bali Paradise Getaway (3 Hari 2 Malam)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Lengkap Paket</label>
                  <textarea
                    required
                    className="form-input"
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tuliskan rincian perjalanan, destinasi yang dikunjungi, fasilitas, hotel, dll..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr 1fr',
                  gap: '16px'
                }}>
                  <div className="form-group">
                    <label className="form-label">Harga Tarif (Rp)</label>
                    <input
                      type="number"
                      required
                      className="form-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Contoh: 1500000"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Satuan Harga</label>
                    <select
                      className="form-input"
                      value={priceUnit}
                      onChange={(e) => setPriceUnit(e.target.value)}
                    >
                      <option value="orang">Per Orang (Pax)</option>
                      <option value="unit">Per Unit (Mobil/Hiace)</option>
                      <option value="grup">Per Grup (Rombongan)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Durasi Perjalanan</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Contoh: 3 Hari 2 Malam, 12 Jam"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column Upload Banner */}
              <div>
                <div className="form-group">
                  <label className="form-label">Foto Utama / Banner Paket</label>
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
                  }} onClick={() => document.getElementById('pkgImageInput').click()}>
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
                    id="pkgImageInput"
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
                    {submitting ? 'Menyimpan...' : 'Simpan Paket'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Table of packages */
        loading ? (
          <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat katalog paket wisata...</div>
        ) : packages.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Belum ada paket wisata ditambahkan.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={getMediaUrl(pkg.main_image)}
                      alt={pkg.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--dark)', marginBottom: '8px' }}>{pkg.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                      {pkg.description ? stripHtml(pkg.description).slice(0, 100) + '...' : ''}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>Durasi: <strong>{pkg.duration}</strong></span>
                      <span>Tarif: <strong>Rp {pkg.price.toLocaleString('id-ID')} /{pkg.price_unit}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  borderTop: '1px solid #f1f5f9',
                  backgroundColor: 'var(--light-soft)'
                }}>
                  <button
                    onClick={() => handleEditClick(pkg)}
                    className="btn btn-outline"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px', borderWidth: '1px' }}
                  >
                    <Edit size={12} /> Ubah
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="btn btn-outline"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)', borderWidth: '1px' }}
                  >
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

// Helper function
const stripHtml = (htmlString) => {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]*>?/gm, '');
};

export default ManagePackages;
