import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import { Menu, X } from 'lucide-react';

// Visitor Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Receipt from './pages/Receipt';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Documentation from './pages/Documentation';
import Gallery from './pages/Gallery';
import JogjaTour from './pages/JogjaTour';
import CheckBooking from './pages/CheckBooking';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageBookings from './pages/admin/ManageBookings';
import ManagePackages from './pages/admin/ManagePackages';
import ManageDestinations from './pages/admin/ManageDestinations';
import ManageCategories from './pages/admin/ManageCategories';
import ManageEvents from './pages/admin/ManageEvents';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageArticles from './pages/admin/ManageArticles';
import SubscribersList from './pages/admin/SubscribersList';
import RegistrationsList from './pages/admin/RegistrationsList';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem', color: '#0d9488' }}>
        Memuat Halaman Admin...
      </div>
    );
  }
  
  return admin ? children : <Navigate to="/masuk-petugas" replace />;
};

// Layout for Visitors
const VisitorLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

// Layout for Admin
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', position: 'relative' }}>
      <AdminSidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* Mobile Top Bar for Admin */}
      <div className="admin-mobile-header" style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: 'var(--dark)',
        color: 'white',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        zIndex: 99,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
          KAWAN JALAN <span style={{ color: 'var(--secondary)' }}>Admin</span>
        </h3>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <main style={{ 
        flexGrow: 1, 
        padding: '40px 24px', 
        overflowY: 'auto',
        transition: 'all 0.3s ease'
      }} className="admin-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 1024px) {
          .admin-mobile-header { display: flex !important; }
          .admin-main { padding-top: 80px !important; }
        }
      `}</style>
    </div>
  );
};

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Visitor Routes */}
          <Route path="/" element={<VisitorLayout><Home /></VisitorLayout>} />
          <Route path="/destinations" element={<VisitorLayout><Destinations /></VisitorLayout>} />
          <Route path="/destinations/:id" element={<VisitorLayout><DestinationDetail /></VisitorLayout>} />
          <Route path="/packages" element={<VisitorLayout><JogjaTour /></VisitorLayout>} />
          <Route path="/documentation" element={<VisitorLayout><Documentation /></VisitorLayout>} />
          <Route path="/gallery" element={<VisitorLayout><Gallery /></VisitorLayout>} />
          <Route path="/booking/:packageId" element={<VisitorLayout><Booking /></VisitorLayout>} />
          <Route path="/payment/:bookingId" element={<VisitorLayout><Payment /></VisitorLayout>} />
          <Route path="/check-booking" element={<VisitorLayout><CheckBooking /></VisitorLayout>} />
          <Route path="/receipt/:bookingId" element={<Receipt />} /> {/* Receipt stands alone for print layout */}
          <Route path="/events" element={<VisitorLayout><Events /></VisitorLayout>} />
          <Route path="/events/:id" element={<VisitorLayout><EventDetail /></VisitorLayout>} />
          <Route path="/blog" element={<VisitorLayout><Blog /></VisitorLayout>} />
          <Route path="/blog/:id" element={<VisitorLayout><ArticleDetail /></VisitorLayout>} />

          {/* Admin Auth Route */}
          <Route path="/masuk-petugas" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageBookings />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/packages" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManagePackages />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/destinations" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageDestinations />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageCategories />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/events" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageEvents />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/testimonials" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageTestimonials />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/articles" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageArticles />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/subscribers" element={
            <ProtectedRoute>
              <AdminLayout>
                <SubscribersList />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/registrations" element={
            <ProtectedRoute>
              <AdminLayout>
                <RegistrationsList />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
