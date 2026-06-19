import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { admin } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Destinasi', path: '/destinations' },
    { label: 'Paket Tour', path: '/packages' },
    { label: 'Dokumentasi', path: '/documentation' },
    { label: 'Galeri Foto', path: '/gallery' },
    { label: 'Event Wisata', path: '/events' },
    { label: 'Blog & Artikel', path: '/blog' },
    { label: 'Cek Booking', path: '/check-booking' },
  ];

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '16px 0',
      transition: 'var(--transition)',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--primary)',
          textDecoration: 'none'
        }}>
          <Compass size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.15' }}>
            <span style={{ 
              fontWeight: 800, 
              fontSize: '1.35rem', 
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap'
            }}>
              KawanJalan
            </span>
            <span style={{ 
              fontWeight: 700, 
              fontSize: '0.7rem', 
              color: 'var(--secondary)', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              whiteSpace: 'nowrap'
            }}>
              Tour & Travel
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }} className="desktop-nav">
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '18px'
          }}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  style={{
                    fontWeight: 600,
                    color: isActive(link.path) ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: isActive(link.path) ? '2px solid var(--primary)' : '2px solid transparent',
                    paddingBottom: '4px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin panel link */}
          {admin && (
            <Link to="/admin" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-dark)',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="glass animate-fade-in" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          boxShadow: 'var(--shadow-md)',
          zIndex: 99
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontWeight: 600,
                color: isActive(link.path) ? 'var(--primary)' : 'var(--text-dark)',
                padding: '8px 0'
              }}
            >
              {link.label}
            </Link>
          ))}
          {admin && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid #cbd5e1' }} />
              <Link to="/admin" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                <LayoutDashboard size={18} />
                Dashboard Admin
              </Link>
            </>
          )}
        </div>
      )}

      {/* Embedded Mobile CSS Toggle Helper */}
      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 1150px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
