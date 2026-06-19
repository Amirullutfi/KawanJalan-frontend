import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Grid } from 'lucide-react';
import api, { getMediaUrl, fetchWithCache } from '../services/api';
import { fallbackCategories, fallbackDestinations } from '../data/fallbackData';

const Destinations = () => {
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, destData] = await Promise.all([
          fetchWithCache('/categories', fallbackCategories),
          fetchWithCache('/destinations', fallbackDestinations)
        ]);
        setCategories(catData);
        setDestinations(destData);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = activeCategory === 'all' || dest.category_id.toString() === activeCategory.toString();
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '60px 0 100px' }} className="animate-fade-in">
      <div className="container">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--dark)' }}>Jelajahi Indonesia</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
            Temukan tempat-tempat menakjubkan, kuliner lezat, cagar budaya bersejarah, dan keindahan bawah laut nusantara.
          </p>
        </div>

        {/* Filter Bar: Search + Categories */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {/* Search bar */}
          <div style={{
            position: 'relative',
            maxWidth: '500px',
            width: '100%',
            margin: '0 auto'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Cari nama objek wisata atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '48px',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #cbd5e1'
              }}
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => handleCategoryChange('all')}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                backgroundColor: activeCategory === 'all' ? 'var(--primary)' : 'white',
                color: activeCategory === 'all' ? 'white' : 'var(--text-dark)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition)'
              }}
            >
              Semua Kategori
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  backgroundColor: activeCategory.toString() === cat.id.toString() ? 'var(--primary)' : 'white',
                  color: activeCategory.toString() === cat.id.toString() ? 'white' : 'var(--text-dark)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Memuat objek wisata...</div>
        ) : filteredDestinations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>
            <Compass size={48} style={{ margin: '0 auto 16px', color: '#cbd5e1' }} />
            <p style={{ fontSize: '1.1rem' }}>Tidak ada destinasi yang cocok dengan pencarian Anda.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredDestinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                className="glass"
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
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
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={getMediaUrl(dest.main_image)}
                    alt={dest.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {dest.category?.name || 'Wisata'}
                  </div>
                </div>
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark)' }}>{dest.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{dest.excerpt}</p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '12px'
                  }}>
                    <MapPin size={14} style={{ color: 'var(--primary)' }} />
                    <span>{dest.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
