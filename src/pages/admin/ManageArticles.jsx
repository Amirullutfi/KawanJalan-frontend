import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderPlus, ArrowLeft, Image as ImageIcon, Trash } from 'lucide-react';
import api, { getMediaUrl } from '../../services/api';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [artId, setArtId] = useState(null); // null means adding, number means editing
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Gallery images multi-upload state
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleEditClick = async (art) => {
    setLoading(true);
    try {
      // Fetch details with relationships ('images')
      const response = await api.get(`/articles/${art.id}`);
      const fullArt = response.data;
      
      setArtId(fullArt.id);
      setTitle(fullArt.title);
      setExcerpt(fullArt.excerpt || '');
      setDescription(fullArt.description || '');
      setImagePreview(getMediaUrl(fullArt.main_image));
      setExistingGallery(fullArt.images || []);
      setImageFile(null);
      setGalleryFiles([]);
      setShowForm(true);
    } catch (error) {
      console.error('Error fetching article detail for edit:', error);
      alert('Gagal mengambil detail artikel.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setArtId(null);
    setTitle('');
    setExcerpt('');
    setDescription('');
    setImagePreview('');
    setImageFile(null);
    setGalleryFiles([]);
    setExistingGallery([]);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
  };

  const deleteExistingGalleryImage = async (imgId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini dari galeri artikel?')) {
      try {
        await api.delete(`/admin/articles/gallery/${imgId}`);
        setExistingGallery(prev => prev.filter(img => img.id !== imgId));
        alert('Foto galeri berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting gallery image:', error);
        alert('Gagal menghapus foto galeri.');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('description', description);
    if (imageFile) {
      formData.append('main_image', imageFile);
    }
    
    // Add multiple gallery images
    if (galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        formData.append('gallery_images[]', galleryFiles[i]);
      }
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (artId) {
        // Edit Article (POST route for updates in PHP to handle uploads correctly)
        await api.post(`/admin/articles/${artId}`, formData, config);
        alert('Artikel berhasil diperbarui!');
      } else {
        // Add Article
        await api.post('/admin/articles', formData, config);
        alert('Artikel baru berhasil ditambahkan!');
      }
      setShowForm(false);
      setTitle('');
      setExcerpt('');
      setDescription('');
      setImageFile(null);
      setImagePreview('');
      setGalleryFiles([]);
      setExistingGallery([]);
      setArtId(null);
      fetchArticles();
    } catch (error) {
      console.error('Error submitting article form:', error);
      alert('Terjadi kesalahan saat memproses data artikel.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel berita ini beserta seluruh galeri gambarnya secara permanen?')) {
      try {
        await api.delete(`/admin/articles/${id}`);
        alert('Artikel berhasil dihapus!');
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Gagal menghapus artikel.');
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Artikel & Tips Perjalanan</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tulis panduan backpacker, info promo pariwisata, atau blog kebudayaan daerah.</p>
        </div>
        {!showForm && (
          <button onClick={handleAddClick} className="btn btn-primary">
            <Plus size={16} /> Tambah Artikel
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
            {artId ? 'Ubah Konten Artikel' : 'Tulis Artikel Baru'}
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
                  <label className="form-label">Judul Artikel (Title)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Tips Mendaki Gunung Bromo di Musim Hujan"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kutipan Ringkas (Excerpt)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Rangkuman 1 baris pembuka untuk kartu artikel..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Konten Lengkap Artikel (Markdown/Teks)</label>
                  <textarea
                    className="form-input"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Isi konten tulisan secara detail..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Multi-images gallery upload */}
                <div className="form-group" style={{ marginTop: '24px', borderTop: '1px solid #cbd5e1', paddingTop: '20px' }}>
                  <label className="form-label">Tambahkan Foto Galeri Perjalanan (Multi-Upload)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-input"
                    onChange={handleGalleryChange}
                    style={{ padding: '8px 12px' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Pilih beberapa foto sekaligus untuk ditampilkan sebagai galeri slider artikel.
                  </p>
                  
                  {galleryFiles.length > 0 && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '8px', fontWeight: 600 }}>
                      ✓ {galleryFiles.length} foto baru dipilih untuk diunggah.
                    </div>
                  )}
                </div>

                {/* Existing Gallery management */}
                {artId && existingGallery.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Kelola Galeri Terunggah saat ini:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                      {existingGallery.map(img => (
                        <div key={img.id} style={{ position: 'relative', width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                          <img src={getMediaUrl(img.image_name)} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={() => deleteExistingGalleryImage(img.id)}
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              backgroundColor: 'rgba(239, 68, 68, 0.9)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '2px',
                              padding: '2px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column Upload Banner */}
              <div>
                <div className="form-group">
                  <label className="form-label">Foto Sampul Utama (Cover)</label>
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
                  }} onClick={() => document.getElementById('artImageInput').click()}>
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
                    id="artImageInput"
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
                    {submitting ? 'Menyimpan...' : 'Simpan Artikel'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* Table of articles */
        loading ? (
          <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat daftar artikel...</div>
        ) : articles.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            Belum ada artikel ulasan ditambahkan.
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
                  <th style={{ padding: '12px 16px', width: '80px' }}>Sampul</th>
                  <th style={{ padding: '12px 16px' }}>Judul Artikel</th>
                  <th style={{ padding: '12px 16px' }}>Slug Rute</th>
                  <th style={{ padding: '12px 16px' }}>Kutipan Pembuka</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', width: '150px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((art) => (
                  <tr key={art.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '60px', height: '45px', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={getMediaUrl(art.main_image)} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{art.title}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{art.slug}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)', maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{art.excerpt}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditClick(art)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                          title="Ubah Rincian"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                          title="Hapus Artikel"
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

export default ManageArticles;
