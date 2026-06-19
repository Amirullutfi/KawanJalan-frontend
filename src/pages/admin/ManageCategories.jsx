import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderPlus } from 'lucide-react';
import api from '../../services/api';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [catId, setCatId] = useState(null); // null means adding, number means editing
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (cat) => {
    setCatId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setShowForm(true);
  };

  const handleAddClick = () => {
    setCatId(null);
    setName('');
    setDescription('');
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    setSubmitting(true);
    try {
      if (catId) {
        // Edit Category
        await api.put(`/admin/categories/${catId}`, { name, description });
        alert('Kategori berhasil diperbarui!');
      } else {
        // Add Category
        await api.post('/admin/categories', { name, description });
        alert('Kategori baru berhasil ditambahkan!');
      }
      setShowForm(false);
      setName('');
      setDescription('');
      setCatId(null);
      fetchCategories();
    } catch (error) {
      console.error('Error submitting category form:', error);
      alert('Terjadi kesalahan saat memproses data kategori.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini? Menghapus kategori juga akan menghapus destinasi di bawahnya.')) {
      try {
        await api.delete(`/admin/categories/${id}`);
        alert('Kategori berhasil dihapus!');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Gagal menghapus kategori.');
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
          <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Kelola Kategori Destinasi</h1>
          <p style={{ color: 'var(--text-muted)' }}>Atur pengelompokan filter kategori untuk objek wisata.</p>
        </div>
        <button onClick={handleAddClick} className="btn btn-primary">
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>

      {/* Form Card (Inline Pop-up modal style) */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #cbd5e1',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-md)',
          maxWidth: '500px'
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FolderPlus size={18} style={{ color: 'var(--primary)' }} />
            {catId ? 'Ubah Kategori' : 'Tambah Kategori Baru'}
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Nama Kategori</label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Wisata Religi, Wisata Kuliner"
                style={{ padding: '10px 14px' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Deskripsi Ringkas</label>
              <textarea
                className="form-input"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Penjelasan singkat mengenai kategori wisata..."
                style={{ padding: '10px 14px', resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-outline"
                style={{ padding: '8px 16px', fontSize: '0.85rem', borderWidth: '1px' }}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                {submitting ? 'Menyimpan...' : 'Simpan Kategori'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table */}
      {loading ? (
        <div style={{ padding: '40px 0', color: 'var(--text-muted)' }}>Memuat data kategori...</div>
      ) : categories.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          Belum ada data kategori ditambahkan.
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
                <th style={{ padding: '12px 16px' }}>Nama Kategori</th>
                <th style={{ padding: '12px 16px' }}>Slug Rute</th>
                <th style={{ padding: '12px 16px' }}>Deskripsi</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', width: '150px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold' }}>{cat.name}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>{cat.slug}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)', maxWidth: '300px' }}>{cat.description || '-'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleEditClick(cat)}
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                        title="Ubah Kategori"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="btn btn-outline"
                        style={{ padding: '6px 10px', borderRadius: '6px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                        title="Hapus Kategori"
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

export default ManageCategories;
