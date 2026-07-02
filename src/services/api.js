import { 
  fallbackDestinations, 
  fallbackPackages, 
  fallbackEvents, 
  fallbackCategories,
  fallbackTestimonials,
  fallbackArticles
} from '../data/fallbackData';

// Simulated DB Helpers using localStorage
const getLocalDB = (key, defaultData = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
};
const saveLocalDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const mockApi = {
  get: async (url, config = {}) => {
    await mockDelay();
    console.log(`[Mock API GET] ${url}`);
    
    // Check local storage first for dynamic data
    if (url.includes('/bookings')) {
      const bookings = getLocalDB('mock_bookings', []);
      if (url === '/admin/bookings') return { data: bookings };
      // match /bookings/123
      const idMatch = url.match(/\/bookings\/(\w+)/);
      if (idMatch) {
         const booking = bookings.find(b => b.id == idMatch[1] || b.booking_code === idMatch[1]);
         if (!booking) throw new Error('Booking not found');
         return { data: { booking, seconds_remaining: 3600 } };
      }
      return { data: bookings };
    }
    
    if (url.includes('/events')) {
      const idMatch = url.match(/\/events\/(\d+)/);
      if (idMatch) {
         return { data: fallbackEvents.find(e => e.id == idMatch[1]) };
      }
      return { data: fallbackEvents || [] };
    }
    
    if (url.includes('/packages')) {
      const idMatch = url.match(/\/packages\/(\d+)/);
      if (idMatch) {
         return { data: fallbackPackages.find(p => p.id == idMatch[1]) };
      }
      return { data: fallbackPackages };
    }
    
    if (url.includes('/destinations')) {
      const idMatch = url.match(/\/destinations\/(\d+)/);
      if (idMatch) {
         return { data: fallbackDestinations.find(d => d.id == idMatch[1]) };
      }
      return { data: fallbackDestinations };
    }
    
    if (url.includes('/categories')) return { data: fallbackCategories };
    if (url.includes('/testimonials')) return { data: fallbackTestimonials };
    if (url.includes('/articles')) return { data: fallbackArticles || [] };
    
    if (url.includes('/admin/subscribers')) return { data: getLocalDB('mock_subscribers', []) };
    if (url.includes('/admin/registrations')) return { data: getLocalDB('mock_registrations', []) };
    
    if (url.includes('/admin/dashboard')) {
       const bookings = getLocalDB('mock_bookings', []);
       return { data: {
           total_destinations: fallbackDestinations.length,
           total_bookings: bookings.length,
           total_subscribers: getLocalDB('mock_subscribers', []).length,
           total_events: (fallbackEvents || []).length
       }};
    }
    
    return { data: [] };
  },
  
  post: async (url, data, config = {}) => {
    await mockDelay();
    console.log(`[Mock API POST] ${url}`, data);
    
    if (url === '/admin/login') {
       if (data.email === 'admin@explora.id' && data.password === 'password123') {
           localStorage.setItem('admin_token', 'mock_token_123');
           return { data: { token: 'mock_token_123', user: { name: 'Admin', role: 'admin' } } };
       }
       throw new Error('Invalid credentials');
    }
    
    if (url === '/bookings') {
       // [KONEKSI BACKEND] Mengirim data ke server Laravel secara background agar pesan WA terkirim
       fetch('http://localhost:8000/api/bookings', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
           body: JSON.stringify(data)
       }).then(res => console.log('Backend notification sent:', res.status))
         .catch(err => console.error('Gagal mengirim notifikasi ke backend:', err));

       const bookings = getLocalDB('mock_bookings', []);
       const packageData = fallbackPackages.find(p => p.id == data.package_id);
       let basePrice = packageData ? (packageData.price_unit === 'orang' ? packageData.price * data.num_people : packageData.price) : 0;
       
       let photoPrice = 0;
       if (data.photo_package_name) {
         const photoPrices = { 'MINI': 400000, 'SHORT': 450000, 'MEDIUM': 500000, 'LONG': 600000, 'SUKA SUKA': 800000 };
         photoPrice = photoPrices[data.photo_package_name] || 0;
       }
       
       let dronePrice = data.addon_drone ? 500000 : 0;
       let totalPrice = basePrice + photoPrice + dronePrice;
       let dpAmount = totalPrice * 0.3;
       let uniqueCode = Math.floor(Math.random() * 900) + 100;

       const newBooking = {
           id: Date.now(),
           booking_code: 'BK' + Date.now().toString().slice(-6),
           ...data,
           package: packageData,
           photo_package_price: photoPrice,
           addon_drone_price: dronePrice,
           total_price: totalPrice,
           dp_amount: dpAmount,
           unique_code: uniqueCode,
           payment_status: 'waiting_payment',
           created_at: new Date().toISOString()
       };
       bookings.push(newBooking);
       saveLocalDB('mock_bookings', bookings);
       return { data: { booking: newBooking, booking_id: newBooking.booking_code, message: 'Booking successful' } };
    }
    
    if (url.includes('/register')) {
       const regs = getLocalDB('mock_registrations', []);
       regs.push({ id: Date.now(), ...data, created_at: new Date().toISOString() });
       saveLocalDB('mock_registrations', regs);
       return { data: { message: 'Registration successful' } };
    }
    
    if (url === '/subscribe') {
       const subs = getLocalDB('mock_subscribers', []);
       subs.push({ id: Date.now(), ...data, subscribed_at: new Date().toISOString() });
       saveLocalDB('mock_subscribers', subs);
       return { data: { message: 'Subscribed' } };
    }
    
    return { data: { success: true } };
  },
  
  put: async (url, data, config = {}) => {
    await mockDelay();
    console.log(`[Mock API PUT] ${url}`, data);
    if (url.includes('/admin/bookings/')) {
       const idMatch = url.match(/\/admin\/bookings\/(\d+)/);
       if (idMatch) {
           let bookings = getLocalDB('mock_bookings', []);
           bookings = bookings.map(b => b.id == idMatch[1] ? { ...b, ...data } : b);
           saveLocalDB('mock_bookings', bookings);
           return { data: { message: 'Status updated' } };
       }
    }
    return { data: { success: true } };
  },
  
  delete: async (url, config = {}) => {
    await mockDelay();
    console.log(`[Mock API DELETE] ${url}`);
    if (url.includes('/admin/bookings/')) {
       const idMatch = url.match(/\/admin\/bookings\/(\d+)/);
       if (idMatch) {
           let bookings = getLocalDB('mock_bookings', []);
           bookings = bookings.filter(b => b.id != idMatch[1]);
           saveLocalDB('mock_bookings', bookings);
           return { data: { message: 'Deleted' } };
       }
    }
    return { data: { success: true } };
  },
  
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} }
  }
};

export const getMediaUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';
  if (path.startsWith('http')) return path;
  
  // Return local path directly if it starts with /
  if (path.startsWith('/')) return path;

  // Otherwise assume it's an uploaded file in backend storage
  return `http://localhost:8000/storage/${path}`;
};

export const fetchWithCache = async (url, fallbackData = null) => {
  try {
     const response = await mockApi.get(url);
     return response.data || fallbackData;
  } catch (err) {
     return fallbackData;
  }
};

export default mockApi;
