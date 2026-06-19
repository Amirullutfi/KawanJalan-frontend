import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Search, FileText } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackArticles } from '../data/fallbackData';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchWithCache('/articles', fallbackArticles);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--dark)' }}>Blog & Tips Perjalanan</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
            Temukan panduan backpacker hemat, ulasan rute tersembunyi, kisah budaya lokal, dan inspirasi liburan Anda selanjutnya.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '500px', width: '100%', margin: '0 auto 48px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Cari artikel perjalanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '48px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Memuat daftar artikel...</div>
        ) : filteredArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Tidak ada artikel yang ditemukan.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'var(--transition)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div>
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      src={getMediaUrl(art.main_image)}
                      alt={art.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    {/* Meta info */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} style={{ color: 'var(--primary)' }} />
                        <span>{new Date(art.created_at || new Date()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={12} style={{ color: 'var(--primary)' }} />
                        <span>Admin</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark)' }}>
                      <Link to={`/blog/${art.id}`} style={{ color: 'inherit' }}>{art.title}</Link>
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px' }}>
                  <Link to={`/blog/${art.id}`} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--primary)'
                  }} onMouseOver={e => e.target.style.color = 'var(--primary-hover)'} onMouseOut={e => e.target.style.color = 'var(--primary)'}>
                    Baca Selengkapnya <FileText size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
