import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Compass, ShieldAlert } from 'lucide-react';

const Login = () => {
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Harap masukkan email dan password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/admin');
    } else {
      setErrorMsg(result.message || 'Kredensial login salah atau akses ditolak.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(13, 148, 136, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 40%)',
      padding: '24px'
    }} className="animate-fade-in">
      <div style={{ maxWidth: '420px', width: '100%' }}>
        
        {/* Back link */}
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#94a3b8',
          fontSize: '0.9rem',
          marginBottom: '24px',
          fontWeight: 600
        }}>
          ← Kembali ke Beranda
        </Link>

        {/* Card */}
        <div className="glass-dark" style={{
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'var(--primary)'
            }}>
              <Compass size={32} />
              KAWAN JALAN TOUR & TRAVEL
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Portal Administrator
            </p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldAlert size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Email field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Alamat Email Admin</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="email"
                  required
                  placeholder="admin@kawanjalan.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #334155',
                    color: 'white',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Kata Sandi (Password)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="password"
                  required
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid #334155',
                    color: 'white',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                marginTop: '8px'
              }}
            >
              {loading ? 'Menghubungkan...' : 'Masuk Dashboard'}
            </button>
          </form>

          {/* Quick login info for convenience */}
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #1e293b',
            fontSize: '0.8rem',
            color: '#64748b',
            textAlign: 'center'
          }}>
            <p>Demo Admin Login:</p>
            <p style={{ fontFamily: 'monospace', color: '#94a3b8', marginTop: '4px' }}>
              U: admin@kawanjalan.id / P: password123
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
