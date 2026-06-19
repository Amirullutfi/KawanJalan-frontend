import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Compass,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  Mail,
  LogOut,
  FolderOpen
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsSidebarOpen }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Dashboard?")) {
      if (setIsSidebarOpen) setIsSidebarOpen(false);
      await logout();
      navigate('/masuk-petugas');
    }
  };

  const navItems = [
    { label: 'Ringkasan', path: '/admin', icon: <LayoutDashboard size={20} />, end: true },
    { label: 'Kelola Booking', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { label: 'Kelola Kategori', path: '/admin/categories', icon: <FolderOpen size={20} /> },
    { label: 'Kelola Destinasi', path: '/admin/destinations', icon: <Compass size={20} /> },
    { label: 'Kelola Paket Tour', path: '/admin/packages', icon: <Briefcase size={20} /> },
    { label: 'Kelola Event', path: '/admin/events', icon: <Users size={20} /> },
    { label: 'Kelola Testimoni', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { label: 'Kelola Artikel', path: '/admin/articles', icon: <FileText size={20} /> },
    { label: 'Newsletter Subscribers', path: '/admin/subscribers', icon: <Mail size={20} /> },
    { label: 'Pendaftar Event', path: '/admin/registrations', icon: <Users size={20} /> },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 98,
            backdropFilter: 'blur(2px)',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      <aside style={{
        width: '280px',
        backgroundColor: 'var(--dark)',
        color: 'var(--text-light)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1e293b',
        flexShrink: 0,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }} className={`sidebar-admin ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutDashboard style={{ color: 'var(--primary)' }} />
            KAWAN JALAN <span style={{ color: 'var(--secondary)' }}>Tour & Travel</span>
          </h2>
          {admin && (
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '8px' }}>
              Login sebagai: <strong style={{ color: 'white' }}>{admin.name}</strong>
            </p>
          )}
        </div>

        {/* Navigation Links */}
        <nav style={{
          flexGrow: 1,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto'
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '0.95rem',
                color: isActive ? 'white' : '#94a3b8',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                transition: 'var(--transition)'
              })}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: '24px 16px',
          borderTop: '1px solid #1e293b'
        }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: '#1e293b',
              color: '#f87171',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#7f1d1d'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#f87171'; }}
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-admin {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            transform: translateX(-100%);
          }
          .sidebar-admin.open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
