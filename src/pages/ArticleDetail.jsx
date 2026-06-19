import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackArticles } from '../data/fallbackData';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        // Try fetching with cache
        let data = await fetchWithCache(`/articles/${id}`, null);
        
        // If not found in cache/API (e.g. offline and first load), search in cached full list or fallback list
        if (!data) {
          const allCached = localStorage.getItem('cached__articles');
          const allArticles = allCached ? JSON.parse(allCached) : fallbackArticles;
          data = allArticles.find(item => item.id.toString() === id.toString());
        }

        if (data) {
          setArticle(data);
        } else {
          setErrorMsg('Artikel tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching article detail:', error);
        setErrorMsg('Gagal memuat detail artikel.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticleDetail();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Memuat artikel...</div>;
  }

  if (errorMsg || !article) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>{errorMsg || 'Artikel tidak ditemukan'}</h3>
        <Link to="/blog" className="btn btn-primary"><ArrowLeft size={16} /> Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Link */}
        <Link to="/blog" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          <ArrowLeft size={16} /> Kembali ke Blog
        </Link>

        {/* Article Meta */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} style={{ color: 'var(--primary)' }} />
            <span>{new Date(article.created_at || new Date()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User size={14} style={{ color: 'var(--primary)' }} />
            <span>Ditulis oleh: <strong>Admin KawanJalan Tour & Travel</strong></span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: 'var(--dark)', lineHeight: 1.15, marginBottom: '24px' }}>
          {article.title}
        </h1>

        {/* Cover Photo */}
        <div style={{
          height: '420px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <img
            src={getMediaUrl(article.main_image)}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Excerpt/Summary Callout */}
        <div style={{
          backgroundColor: 'var(--light-soft)',
          borderLeft: '4px solid var(--primary)',
          padding: '20px',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          fontSize: '1.1rem',
          color: 'var(--dark-soft)',
          fontStyle: 'italic',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          {article.excerpt}
        </div>

        {/* Article Body Description */}
        <div style={{
          fontSize: '1.05rem',
          color: 'var(--text-dark)',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          marginBottom: '50px'
        }}>
          {article.description || 'Konten lengkap artikel belum diunggah.'}
        </div>

        {/* Gallery Slider / Multi-images Section */}
        {article.images && article.images.length > 0 && (
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '40px'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dark)' }}>
              <ImageIcon size={20} style={{ color: 'var(--primary)' }} />
              Galeri Perjalanan
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {article.images.map((img) => (
                <div
                  key={img.id}
                  style={{
                    height: '160px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <img
                    src={getMediaUrl(img.image_name)}
                    alt="Gallery item"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'var(--transition)',
                      cursor: 'zoom-in'
                    }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.target.style.transform = 'none'}
                    onClick={() => window.open(getMediaUrl(img.image_name), '_blank')}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ArticleDetail;
