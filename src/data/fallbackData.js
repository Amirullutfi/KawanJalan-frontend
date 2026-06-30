// Baseline fallback data for KawanJalan Tour & Travel when backend is offline and local cache is empty.

const getMerapiDescription = (packageName, destinations, duration) => {
  const destList = destinations.map(dest => `<li style="margin-bottom: 6px !important;">${dest}</li>`).join('');
  return `
<div style="font-family: 'Outfit', sans-serif;">
    <p style="font-size: 1.05rem; line-height: 1.6; color: #475569; margin-bottom: 20px;">
        Jelajahi keindahan lereng Gunung Merapi dengan paket petualangan <strong>${packageName}</strong>. Nikmati sensasi offroad menggunakan Jeep 4x4 klasik menyusuri rute bersejarah pasca-erupsi yang menakjubkan.
    </p>
    
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 5px solid #22c55e; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
        <h4 style="font-weight: bold; color: #166534; margin: 0 0 8px 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
            📋 Spesifikasi & Durasi Trip
        </h4>
        <ul style="list-style-type: none !important; margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #14532d;">
            <li style="margin-bottom: 6px !important; display: flex; align-items: center; gap: 8px;">⏱️ <strong>Durasi Perjalanan:</strong> ${duration}</li>
            <li style="margin-bottom: 0 !important; display: flex; align-items: center; gap: 8px;">👥 <strong>Kapasitas Penumpang:</strong> Maksimal 4 Orang per Jeep</li>
        </ul>
    </div>

    <div style="margin-bottom: 24px;">
        <h4 style="font-weight: bold; color: #1e293b; margin: 0 0 12px 0; font-size: 1.15rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">
            📍 Destinasi yang Dikunjungi:
        </h4>
        <ul style="list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; font-size: 1rem; color: #334155; line-height: 1.6;">
            ${destList}
        </ul>
    </div>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
        <h4 style="font-weight: bold; color: #0f172a; margin: 0 0 12px 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
            ✨ Fasilitas yang Didapat (Include):
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Driver as Guide & Dokumentasi Foto
            </div>
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Tiket Masuk Destinasi & BBM Jeep
            </div>
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Helm Keselamatan & Asuransi Jiwa
            </div>
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Jasa Freelance Fotografer
            </div>
        </div>
    </div>
</div>`;
};

const getRegularDescription = (packageName, destinations) => {
  const destList = destinations.map(dest => `<li style="margin-bottom: 6px !important;">${dest}</li>`).join('');
  return `
<div style="font-family: 'Outfit', sans-serif;">
    <p style="font-size: 1.05rem; line-height: 1.6; color: #475569; margin-bottom: 20px;">
        Nikmati keseruan liburan di Yogyakarta dengan paket private trip eksklusif <strong>${packageName}</strong>. Layanan sewa mobil + driver + bensin siap mengantar Anda berkeliling destinasi terbaik Jogja dengan nyaman.
    </p>
    
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 5px solid #22c55e; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
        <h4 style="font-weight: bold; color: #166534; margin: 0 0 8px 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
            📋 Spesifikasi & Ketentuan Trip
        </h4>
        <ul style="list-style-type: none !important; margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #14532d;">
            <li style="margin-bottom: 6px !important; display: flex; align-items: center; gap: 8px;">⏱️ <strong>Durasi Sewa:</strong> 12 Jam per Hari</li>
            <li style="margin-bottom: 0 !important; display: flex; align-items: center; gap: 8px;">👥 <strong>Kapasitas:</strong> Maksimal 5-6 Orang per Mobil</li>
        </ul>
    </div>

    <div style="margin-bottom: 24px;">
        <h4 style="font-weight: bold; color: #1e293b; margin: 0 0 12px 0; font-size: 1.15rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">
            📍 Destinasi yang Dikunjungi:
        </h4>
        <ul style="list-style-type: disc !important; padding-left: 20px !important; margin: 0 !important; font-size: 1rem; color: #334155; line-height: 1.6;">
            ${destList}
        </ul>
    </div>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
        <h4 style="font-weight: bold; color: #0f172a; margin: 0 0 12px 0; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
            ✨ Fasilitas yang Didapat (Include):
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Transportasi Mobil AC Bersih
            </div>
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Supir / Driver Ramah & Berpengalaman
            </div>
            <div style="font-size: 0.95rem; color: #475569;">
                ✅ Bahan Bakar Minyak (BBM)
            </div>
        </div>
    </div>
</div>`;
};

export const fallbackCategories = [
  {
    id: 1,
    name: 'Wisata Alam',
    slug: 'wisata-alam',
    description: 'Destinasi wisata keindahan alam pegunungan, hutan, dan kawah.'
  },
  {
    id: 2,
    name: 'Wisata Bahari',
    slug: 'wisata-bahari',
    description: 'Keindahan pantai pasir putih, terumbu karang, dan bawah laut.'
  },
  {
    id: 3,
    name: 'Wisata Budaya & Sejarah',
    slug: 'wisata-budaya-sejarah',
    description: 'Warisan budaya leluhur, candi bersejarah, dan adat istiadat.'
  },
  {
    id: 4,
    name: 'Wisata Kuliner',
    slug: 'wisata-kuliner',
    description: 'Petualangan rasa dengan mencicipi masakan khas nusantara.'
  }
];

export const fallbackPackages = [
  {
    id: 1,
    title: 'Paket Wisata Jeep Merapi - PAKET 1',
    description: getMerapiDescription('PAKET 1', [
      'Batu Alien',
      'Museum Mini Sisa Hartaku',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '1.5 Jam'),
    price: 450000,
    price_unit: 'unit',
    duration: '1.5 Jam',
    main_image: '/images/jeep1.jpg'
  },
  {
    id: 2,
    title: 'Paket Wisata Jeep Merapi - PAKET SHORT PLUS A',
    description: getMerapiDescription('PAKET SHORT PLUS A', [
      'Bunker Kaliadem',
      'Museum Mini Sisa Hartaku',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '1.5 Jam'),
    price: 500000,
    price_unit: 'unit',
    duration: '1.5 Jam',
    main_image: '/images/jeep2.jpg'
  },
  {
    id: 3,
    title: 'Paket Wisata Jeep Merapi - PAKET SHORT PLUS C',
    description: getMerapiDescription('PAKET SHORT PLUS C', [
      'Bunker Kaliadem',
      'Batu Alien',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '1.5 Jam'),
    price: 500000,
    price_unit: 'unit',
    duration: '1.5 Jam',
    main_image: '/images/jeep3.jpg'
  },
  {
    id: 4,
    title: 'Paket Wisata Jeep Merapi - PAKET 2 A',
    description: getMerapiDescription('PAKET 2 A', [
      'Batu Alien',
      'Museum Mini Sisa Hartaku',
      'Bunker Kaliadem',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '2 Jam'),
    price: 550000,
    price_unit: 'unit',
    duration: '2 Jam',
    main_image: '/images/jeep4.jpg'
  },
  {
    id: 5,
    title: 'Paket Wisata Jeep Merapi - PAKET 2 B',
    description: getMerapiDescription('PAKET 2 B', [
      'Museum Mini Sisa Hartaku',
      'Bunker Kaliadem',
      'Petilasan Rumah Mbah Maridjan',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '2 Jam'),
    price: 550000,
    price_unit: 'unit',
    duration: '2 Jam',
    main_image: '/images/jeep5.jpg'
  },
  {
    id: 6,
    title: 'Paket Wisata Jeep Merapi - PAKET 2 E',
    description: getMerapiDescription('PAKET 2 E', [
      'Bunker Kaliadem',
      'Tebing Gendol',
      'Batu Alien',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '2 Jam'),
    price: 550000,
    price_unit: 'unit',
    duration: '2 Jam',
    main_image: '/images/jeep6.png'
  },
  {
    id: 7,
    title: 'Paket Wisata Jeep Merapi - PAKET 3',
    description: getMerapiDescription('PAKET 3', [
      'Batu Alien',
      'Museum Mini Sisa Hartaku',
      'Bunker Kaliadem',
      'Petilasan Rumah Mbah Maridjan',
      'Track Grogol Forest Hill',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '3 Jam'),
    price: 650000,
    price_unit: 'unit',
    duration: '3 Jam',
    main_image: '/images/jeep7.jpg'
  },
  {
    id: 8,
    title: 'Paket Wisata Jeep Merapi - PAKET SUNRISE',
    description: getMerapiDescription('PAKET SUNRISE', [
      'Batu Alien',
      'Museum Mini Sisa Hartaku',
      'Bunker Kaliadem (Spot Sunrise)',
      'Gapura The Lost World (Spot Foto)',
      'Kaliopak View Merapi (Spot Foto)',
      'Manuver Air Kalikuning'
    ], '3 Jam'),
    price: 650000,
    price_unit: 'unit',
    duration: '3 Jam',
    main_image: '/images/jeep8.jpg'
  },
  {
    id: 9,
    title: 'Paket Jeep Bromo - Bromo Explore SUNRISE',
    description: `<p>Rasakan petualangan legendaris mengeksplorasi keindahan alam kawah Gunung Bromo yang magis pada saat matahari terbit. Menggunakan transportasi Jeep 4x4 (Toyota Land Cruiser FJ40) tangguh, paket ini akan mengantar Anda menyusuri lautan pasir hingga puncak Penanjakan.</p>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
  <div style="background-color: #f1f5f9; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
    <h5 style="font-weight: bold; color: #1e293b; margin-bottom: 4px; font-size: 0.9rem;">Informasi Perjalanan:</h5>
    <ul style="list-style-type: none; padding-left: 0; font-size: 0.85rem; line-height: 1.5; color: #475569;">
      <li><strong>Kapasitas:</strong> Maks. 5-6 orang / Jeep</li>
      <li><strong>Waktu Operasional:</strong> 01.00 - 11.00 WIB</li>
      <li><strong>Titik Kumpul:</strong> Tumpang, Malang</li>
    </ul>
  </div>
  <div style="background-color: #f1f5f9; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
    <h5 style="font-weight: bold; color: #1e293b; margin-bottom: 4px; font-size: 0.9rem;">Fasilitas (Include):</h5>
    <ul style="list-style-type: none; padding-left: 0; font-size: 0.85rem; line-height: 1.5; color: #475569;">
      <li>✓ Sewa & Transportasi Jeep 4x4</li>
      <li>✓ Driver Jeep Profesional</li>
      <li>✓ Bahan Bakar Minyak (BBM)</li>
    </ul>
  </div>
</div>
<h4 style="font-weight: bold; color: var(--dark); margin-top: 16px; margin-bottom: 8px;">Rute & Destinasi Wisata:</h4>
<ol style="padding-left: 20px; margin-bottom: 16px; line-height: 1.5;">
  <li><strong>View Sunrise Point</strong> (Menikmati matahari terbit terindah)</li>
  <li><strong>Lembah Widodaren</strong> (Dinding batuan eksotis)</li>
  <li><strong>Kawah Bromo</strong> (Mendaki ke bibir kawah aktif)</li>
  <li><strong>Pura Luhur Poten</strong> (Pura suci suku Tengger di kaki Bromo)</li>
  <li><strong>Pasir Berbisik</strong> (Lautan pasir luas berbunyi desis)</li>
  <li><strong>Padang Savana & Bukit Teletubbies</strong> (Hamparan bukit hijau subur)</li>
</ol>`,
    price: 900000,
    price_unit: 'unit',
    duration: '01.00 - 11.00 WIB',
    main_image: 'https://images.unsplash.com/photo-1602148740250-0a4750e232e9?w=800'
  },
  {
    id: 10,
    title: 'Paket Jogja Reguler - Paket 1',
    description: getRegularDescription('Paket 1', ['Candi Borobudur', 'Lava Tour Merapi', 'Candi Prambanan', 'Candi Ratu Boko', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/Borobudur.jpg'
  },
  {
    id: 11,
    title: 'Paket Jogja Reguler - Paket 2',
    description: getRegularDescription('Paket 2', ['Candi Borobudur', 'Vw Borobudur', 'Lava Tour Merapi', 'Bhumi Merapi', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/jeep1.jpg'
  },
  {
    id: 12,
    title: 'Paket Jogja Reguler - Paket 3',
    description: getRegularDescription('Paket 3', ['Lava Tour Merapi', 'Museum Ulen Sentalu', 'The Nice Playland', 'Suraloka Zoo', 'Pusat Oleh-oleh']),
    price: 650000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/jeep2.jpg'
  },
  {
    id: 13,
    title: 'Paket Jogja Reguler - Paket 4',
    description: getRegularDescription('Paket 4', ['Keraton Yogyakarta', 'Taman Sari', 'Museum Sasonobudoyo', 'Ibardo Park', 'Pusat Oleh-oleh']),
    price: 650000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/tamansari.jpg'
  },
  {
    id: 14,
    title: 'Paket Jogja Reguler - Paket 5',
    description: getRegularDescription('Paket 5', ['Candi Prambanan', 'Candi Ratu Boko', 'Tebing Breksi', 'Heha Sky View', 'Pictniq Land', 'Pusat Oleh-oleh']),
    price: 650000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/heha-sky.jpg'
  },
  {
    id: 15,
    title: 'Paket Jogja Reguler - Paket 6',
    description: getRegularDescription('Paket 6', ['Candi Prambanan', 'Obelix Hills', 'Hutan Pinus Pengger', 'Hutan Pinus Becici', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/obelix-hills.jpg'
  },
  {
    id: 16,
    title: 'Paket Jogja Reguler - Paket 7',
    description: getRegularDescription('Paket 7', ['Tumpeng Menoreh', 'Omah Cantrik', 'Studi Alam Gamplong', 'Benteng Vredeburg', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/benteng.jpg'
  },
  {
    id: 17,
    title: 'Paket Jogja Reguler - Paket 8',
    description: getRegularDescription('Paket 8', ['Pantai Ngobaran', 'Pantai Ngrenegan', 'Obelix Sea View', 'Gumuk Pasir', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/Pantai-Ngobaran.jpg'
  },
  {
    id: 18,
    title: 'Paket Jogja Reguler - Paket 9',
    description: getRegularDescription('Paket 9', ['Goa Pindul', 'Goa Jimblang', 'Pantai Timang', 'Drini Park', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/goa-pindul.jpg'  
  },
  {
    id: 19,
    title: 'Paket Jogja Reguler - Paket 10',
    description: getRegularDescription('Paket 10', ['Goa Pindul', 'Pantai Mesra', 'Pantai Drini', 'On The Rock', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/goa-pindul.jpg'
  },
  {
    id: 20,
    title: 'Paket Jogja Reguler - Paket 11',
    description: getRegularDescription('Paket 11', ['Puncak Segoro', 'Heha Ocean View', 'Gesing Wonderland', 'Obelix Sea View', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/heha-sky.jpg'
  },
  {
    id: 21,
    title: 'Paket Jogja Reguler - Paket 12',
    description: getRegularDescription('Paket 12', ['Nepal Van Java', 'Negri Sayur Sukamakmur', 'Vw Safari Borobudur', 'Candi Borobudur', 'Pusat Oleh-oleh']),
    price: 850000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/Borobudur.jpg'
  },
  {
    id: 22,
    title: 'Paket Jogja Reguler - Paket 13',
    description: getRegularDescription('Paket 13', ['Kawah Sikidang Dieng', 'Candi Arjuna', 'Batu Ratapan Angin', 'Taman Langit', 'Pusat Oleh-oleh']),
    price: 1100000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/dieng.jpg'
  },
  {
    id: 23,
    title: 'Paket Jogja Reguler - Paket 14',
    description: getRegularDescription('Paket 14', ['Lava Tour Merapi', 'Kopi Klothok', 'Chandari Heaven', 'Candi Prambanan', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/jeep3.jpg'
  },
  {
    id: 24,
    title: 'Paket Jogja Reguler - Paket 15',
    description: getRegularDescription('Paket 15', ['Keraton Yogyakarta', 'Taman Sari', 'Pantai Parangtritis', 'Obelix Sea', 'Pusat Oleh-oleh']),
    price: 650000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/tamansari.jpg'
  },
  {
    id: 25,
    title: 'Paket Jogja Reguler - Paket 16',
    description: getRegularDescription('Paket 16', ['Puncak Becici', 'Sri Gethuk', 'Pantai Mesra', 'Pantai Mbuluk', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/pantai-sadranan.jpg'
  },
  {
    id: 26,
    title: 'Paket Jogja Reguler - Paket 17',
    description: getRegularDescription('Paket 17', ['Candi Borobudur', 'Jeep Merapi', 'Ibarbo', 'Pusat Oleh-oleh']),
    price: 700000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/Borobudur.jpg'
  },
  {
    id: 27,
    title: 'Paket Jogja Reguler - Paket 18',
    description: getRegularDescription('Paket 18', ['STD Gamplong', 'Geblek Pari', 'Tumpeng Menoreh', 'Pule Payung', 'Pusat Oleh-oleh']),
    price: 750000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/pulepayung.jpg'
  },
  {
    id: 28,
    title: 'Paket Jogja Reguler - Paket 19',
    description: getRegularDescription('Paket 19', ['Mangunan', 'On The Rock', 'Puncak Segoro', 'Obelix Sea', 'Pusat Oleh-oleh']),
    price: 750000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/mangunan.jpg'
  },
  {
    id: 29,
    title: 'Paket Jogja Reguler - Paket 20',
    description: getRegularDescription('Paket 20', ['Pantai Timang', 'Pantai Jungwok', 'Heha Sky', 'Pusat Oleh-oleh']),
    price: 750000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/pantaijungwok.png'
  },
  {
    id: 30,
    title: 'Paket Jogja Reguler - Paket 21',
    description: getRegularDescription('Paket 21', ['Pantai Timang', 'Pantai Jungwok', 'Heha Sky', 'Pusat Oleh-oleh']),
    price: 750000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/heha-sky.jpg'
  },
  {
    id: 31,
    title: 'Paket Jogja Sunrise - Paket SUNRISE 1',
    description: getRegularDescription('Paket SUNRISE 1', ['Jeep Merapi', 'Candi Prambanan', 'Pictniq', 'Pusat Oleh-oleh']),
    price: 750000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/jeep1.jpg'
  },
  {
    id: 32,
    title: 'Paket Jogja Sunrise - Paket SUNRISE 2',
    description: getRegularDescription('Paket SUNRISE 2', ['Silancur', 'Nepal Van Java', 'Borobudur', 'Pusat Oleh-oleh']),
    price: 950000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/jeep2.jpg'
  },
  {
    id: 33,
    title: 'Paket Jogja Sunrise - Paket SUNRISE 3',
    description: getRegularDescription('Paket SUNRISE 3', ['Sunrise Taman Langit', 'Batu Ratapan Angin', 'Kawab Sikidang', 'Kebun Teh Panama', 'Telaga Menjer', 'Pusat Oleh-oleh']),
    price: 1400000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: '/images/jeep3.jpg'
  },
  {
    id: 34,
    title: 'Sewa Armada - Calya LCGC',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil Calya LCGC untuk perjalanan bisnis, liburan keluarga, atau keperluan pribadi di area Yogyakarta. Armada bersih, terawat, dan siap pakai.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 650000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 35,
    title: 'Sewa Armada - Avanza',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil Avanza untuk perjalanan bisnis, liburan keluarga, atau keperluan pribadi di area Yogyakarta. Armada bersih, terawat, dan siap pakai.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 750000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 36,
    title: 'Sewa Armada - Inova Reborn',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil Inova Reborn untuk perjalanan bisnis, liburan keluarga, atau keperluan pribadi di area Yogyakarta. Armada bersih, terawat, dan siap pakai.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 1350000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 37,
    title: 'Sewa Armada - Haice',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil Haice untuk perjalanan bisnis, liburan keluarga, atau keperluan pribadi di area Yogyakarta. Armada bersih, terawat, dan siap pakai.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 1450000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 38,
    title: 'Sewa Armada - Haice Pemio',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil Haice Pemio untuk perjalanan bisnis, liburan keluarga, atau keperluan pribadi di area Yogyakarta. Armada bersih, terawat, dan siap pakai.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 1600000,
    price_unit: 'unit',
    duration: '12 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 39,
    title: 'Airport Transfer - PAKET ANTAR BANDARA (DROP)',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Layanan transfer bandara dari/ke Bandara Internasional Yogyakarta (YIA) ke semua wilayah Yogyakarta. Nyaman dan bebas repot.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 300000,
    price_unit: 'unit',
    duration: 'Sekali Jalan',
    main_image: '/images/bandara-drop.png'
  },
  {
    id: 40,
    title: 'Airport Transfer - PAKET JEMPUT BANDARA (PICKUP)',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Layanan transfer bandara dari/ke Bandara Internasional Yogyakarta (YIA) ke semua wilayah Yogyakarta. Nyaman dan bebas repot.</p><p><strong>Termasuk:</strong> Mobil + Supir + BBM.</p></div>',
    price: 350000,
    price_unit: 'unit',
    duration: 'Sekali Jalan',
    main_image: '/images/bandara-pickup.png'
  },
  {
    id: 41,
    title: 'Bali Lepas Kunci - Inova Reborn Matic',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil lepas kunci di Bali dengan armada Inova Reborn Matic. Nikmati kebebasan mengeksplorasi Pulau Dewata.</p><p><strong>Ketentuan:</strong> KTP/Paspor asli & SIM A.</p><p><strong>Overtime:</strong> Rp 50.000 / jam</p></div>',
    price: 600000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 42,
    title: 'Bali Lepas Kunci - Avanza Matic',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil lepas kunci di Bali dengan armada Avanza Matic. Nikmati kebebasan mengeksplorasi Pulau Dewata.</p><p><strong>Ketentuan:</strong> KTP/Paspor asli & SIM A.</p><p><strong>Overtime:</strong> Rp 50.000 / jam</p></div>',
    price: 450000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 43,
    title: 'Bali Lepas Kunci - Avanza Manual',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil lepas kunci di Bali dengan armada Avanza Manual. Nikmati kebebasan mengeksplorasi Pulau Dewata.</p><p><strong>Ketentuan:</strong> KTP/Paspor asli & SIM A.</p><p><strong>Overtime:</strong> Rp 50.000 / jam</p></div>',
    price: 400000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 44,
    title: 'Bali Lepas Kunci - Agya Matic',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil lepas kunci di Bali dengan armada Agya Matic. Nikmati kebebasan mengeksplorasi Pulau Dewata.</p><p><strong>Ketentuan:</strong> KTP/Paspor asli & SIM A.</p><p><strong>Overtime:</strong> Rp 50.000 / jam</p></div>',
    price: 400000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 45,
    title: 'Bali Lepas Kunci - Brio Matic',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil lepas kunci di Bali dengan armada Brio Matic. Nikmati kebebasan mengeksplorasi Pulau Dewata.</p><p><strong>Ketentuan:</strong> KTP/Paspor asli & SIM A.</p><p><strong>Overtime:</strong> Rp 50.000 / jam</p></div>',
    price: 450000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 46,
    title: 'Bali All In - Inova Reborn (Driver + BBM)',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil dengan Driver + BBM di Bali dengan armada Inova Reborn. Santai dan nikmati perjalanan tanpa harus menyetir sendiri.</p><p><strong>Overtime:</strong> 10% per jam dari tarif sewa</p></div>',
    price: 1100000,
    price_unit: 'unit',
    duration: '10 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 47,
    title: 'Bali All In - Avanza (Driver + BBM)',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil dengan Driver + BBM di Bali dengan armada Avanza. Santai dan nikmati perjalanan tanpa harus menyetir sendiri.</p><p><strong>Overtime:</strong> 10% per jam dari tarif sewa</p></div>',
    price: 900000,
    price_unit: 'unit',
    duration: '10 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 48,
    title: 'Bali All In - Toyota Hiace (Driver + BBM)',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa mobil dengan Driver + BBM di Bali dengan armada Toyota Hiace. Santai dan nikmati perjalanan tanpa harus menyetir sendiri.</p><p><strong>Overtime:</strong> 10% per jam dari tarif sewa</p></div>',
    price: 1600000,
    price_unit: 'unit',
    duration: '10 Jam',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
  },
  {
    id: 49,
    title: 'Bali Motor - Sewa Motor NMAX',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa motor NMAX di Bali untuk menghindari kemacetan dan kepraktisan berkendara di area Kuta, Seminyak, Canggu, atau Ubud.</p><p><strong>Termasuk:</strong> 2 Helm SNI + 2 Jas Hujan.</p></div>',
    price: 175000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
  },
  {
    id: 50,
    title: 'Bali Motor - Sewa Motor Vario 125',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa motor Vario 125 di Bali untuk menghindari kemacetan dan kepraktisan berkendara di area Kuta, Seminyak, Canggu, atau Ubud.</p><p><strong>Termasuk:</strong> 2 Helm SNI + 2 Jas Hujan.</p></div>',
    price: 125000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
  },
  {
    id: 51,
    title: 'Bali Motor - Sewa Motor Fazzio',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa motor Fazzio di Bali untuk menghindari kemacetan dan kepraktisan berkendara di area Kuta, Seminyak, Canggu, atau Ubud.</p><p><strong>Termasuk:</strong> 2 Helm SNI + 2 Jas Hujan.</p></div>',
    price: 125000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
  },
  {
    id: 52,
    title: 'Bali Motor - Sewa Motor Beat',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa motor Beat di Bali untuk menghindari kemacetan dan kepraktisan berkendara di area Kuta, Seminyak, Canggu, atau Ubud.</p><p><strong>Termasuk:</strong> 2 Helm SNI + 2 Jas Hujan.</p></div>',
    price: 125000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
  },
  {
    id: 53,
    title: 'Bali Motor - Sewa Motor Scoopy',
    description: '<div style="font-family: \'Outfit\', sans-serif;"><p>Sewa motor Scoopy di Bali untuk menghindari kemacetan dan kepraktisan berkendara di area Kuta, Seminyak, Canggu, atau Ubud.</p><p><strong>Termasuk:</strong> 2 Helm SNI + 2 Jas Hujan.</p></div>',
    price: 125000,
    price_unit: 'unit',
    duration: '24 Jam',
    main_image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
  }
]

export const fallbackDestinations = [
  {
    id: 1,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Bunker Kaliadem Merapi',
    slug: 'bunker-kaliadem-merapi',
    excerpt: 'Bunker bersejarah di lereng Merapi yang menawarkan pemandangan gagah puncak gunung.',
    description: 'Bunker Kaliadem adalah ruang bawah tanah yang dibangun khusus sebagai tempat perlindungan darurat dari awan panas letusan Gunung Merapi. Terletak di Sleman, tempat ini kini menjadi destinasi wisata favorit yang memadukan sejarah saksi bisu erupsi dahsyat dengan pemandangan langsung puncak Merapi yang berjarak sangat dekat.',
    location: 'Sleman, Yogyakarta',
    featured: true,
    main_image: '/images/bunker-kaliadem.jpg'
  },
  {
    id: 2,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Sunrise Point Penanjakan Bromo',
    slug: 'sunrise-point-penanjakan-bromo',
    excerpt: 'Titik pandang terbaik untuk menyaksikan matahari terbit magis berlatar kaldera Gunung Bromo.',
    description: 'Penanjakan 1 adalah bukit tertinggi di kawasan Bromo Tengger Semeru yang menjadi lokasi paling legendaris untuk menyaksikan matahari terbit (sunrise). Dari sini, wisatawan dapat melihat panorama kawah Bromo berselimut kabut pagi bagaikan negeri di atas awan.',
    location: 'Pasuruan, Jawa Timur',
    featured: true,
    main_image: '/images/sunrise-bromo.jpg'
  },
  {
    id: 3,
    category_id: 3,
    category: { id: 3, name: 'Wisata Budaya & Sejarah' },
    title: 'Museum Mini Sisa Hartaku',
    slug: 'museum-mini-sisa-hartaku',
    excerpt: 'Museum peringatan berisi barang-barang rumah tangga yang meleleh akibat awan panas Merapi.',
    description: 'Museum Sisa Hartaku adalah sebuah museum kecil milik warga lokal yang didirikan untuk memperingati erupsi Gunung Merapi tahun 2010. Di dalam museum ini dipajang berbagai sisa harta benda warga yang hancur dan meleleh akibat awan panas, mulai dari sepeda motor, peralatan dapur, hingga jam dinding yang berhenti tepat saat awan panas menerjang.',
    location: 'Sleman, Yogyakarta',
    featured: true,
    main_image: '/images/museum-merapi.jpg'
  },
  {
    id: 4,
    category_id: 3,
    category: { id: 3, name: 'Wisata Budaya & Sejarah' },
    title: 'Pura Luhur Poten Bromo',
    slug: 'pura-luhur-poten-bromo',
    excerpt: 'Pura Hindu suci milik suku Tengger yang berdiri kokoh di tengah hamparan Lautan Pasir Bromo.',
    description: 'Pura Luhur Poten adalah tempat ibadah suci bagi umat Hindu suku Tengger yang bertempat tinggal di sekitar Gunung Bromo. Pura ini memiliki arsitektur khas Jawa-Bali dan berdiri sangat unik di tengah hamparan pasir vulkanik (Lautan Pasir) Gunung Bromo.',
    location: 'Probolinggo, Jawa Timur',
    featured: true,
    main_image: '/images/pura-poten.jpg'
  },
  {
    id: 5,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Lautan Pasir Berbisik Bromo',
    slug: 'lautan-pasir-berbisik-bromo',
    excerpt: 'Hamparan pasir vulkanik hitam luas yang menghasilkan suara desisan unik saat tertiup angin.',
    description: 'Pasir Berbisik adalah sebutan untuk kawasan lautan pasir luas berwarna kehitaman yang membentang di sekitar kaldera Gunung Bromo. Dinamakan Pasir Berbisik karena ketika angin berembus kencang, gesekan butiran pasir mengeluarkan suara desisan lembut menyerupai bisikan.',
    location: 'Probolinggo, Jawa Timur',
    featured: false,
    main_image: '/images/pasir-berbisik.jpg'
  },
  {
    id: 6,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Savana & Bukit Teletubbies Bromo',
    slug: 'savana-bukit-teletubbies-bromo',
    excerpt: 'Padang rumput hijau subur dan perbukitan meliuk yang kontras dengan lautan pasir Bromo.',
    description: 'Padang Savana Bromo adalah sebuah lembah hijau subur berpagar dinding kaldera raksasa di sisi selatan Gunung Bromo. Di tengah savana ini terdapat deretan perbukitan meliuk hijau yang mirip dengan lokasi film anak-anak Teletubbies.',
    location: 'Malang, Jawa Timur',
    featured: false,
    main_image: '/images/savana-bromo.jpg'
  },
  {
    id: 7,
    category_id: 4,
    category: { id: 4, name: 'Wisata Kuliner' },
    title: 'Jadah Tempe Mbah Carik Kaliurang',
    slug: 'jadah-tempe-mbah-carik',
    excerpt: 'Kuliner legendaris khas lereng Merapi berupa perpaduan ketan gurih dan tempe bacem manis.',
    description: 'Jadah Tempe Mbah Carik adalah kuliner tradisional legendaris asal Kaliurang, Sleman yang sudah ada sejak tahun 1950-an. Kuliner ini merupakan perpaduan unik antara Jadah (ketan gurih) dan Tempe Bacem manis gurih yang dimakan secara bersamaan.',
    location: 'Sleman, Yogyakarta',
    featured: false,
    main_image: '/images/jadah-tempe.jpg'
  },
  {
    id: 8,
    category_id: 4,
    category: { id: 4, name: 'Wisata Kuliner' },
    title: 'Bakso & Bakwan Malang Klasik',
    slug: 'bakso-bakwan-malang-klasik',
    excerpt: 'Kehangatan semangkuk bakso kuah kaldu sapi pekat lengkap dengan pangsit goreng dan siomay basah.',
    description: 'Bakso Malang adalah kuliner ikonik khas Malang yang terkenal dengan kelengkapannya berupa bakso halus, siomay basah, tahu bakso, serta pangsit goreng renyah, disiram kuah kaldu sapi gurih yang cocok dinikmati di tengah hawa dingin Bromo.',
    location: 'Malang, Jawa Timur',
    featured: false,
    main_image: '/images/bakso-malang.jpg'
  },
  {
    id: 9,
    category_id: 2,
    category: { id: 2, name: 'Wisata Bahari' },
    title: 'Pantai Sadranan Gunungkidul',
    slug: 'pantai-sadranan-gunungkidul',
    excerpt: 'Pantai pasir putih berombak tenang yang populer sebagai lokasi snorkeling terbaik di Jogja.',
    description: 'Pantai Sadranan adalah salah satu destinasi wisata bahari unggulan di Yogyakarta yang terkenal dengan pasir putih bersih dan air laut yang sangat jernih. Pantai ini dilindungi karang alami sehingga aman untuk aktivitas snorkeling.',
    location: 'Gunungkidul, Yogyakarta',
    featured: false,
    main_image: '/images/pantai-sadranan.jpg'
  },
  {
    id: 10,
    category_id: 2,
    category: { id: 2, name: 'Wisata Bahari' },
    title: 'Pantai Balekambang Malang',
    slug: 'pantai-balekambang-malang',
    excerpt: 'Keindahan pantai pasir putih dengan pura megah di atas pulau karang mirip Tanah Lot.',
    description: 'Pantai Balekambang adalah pantai eksotis di pesisir selatan Kabupaten Malang. Daya tarik utama pantai ini adalah keberadaan Pura Amarta Jati yang berdiri megah di atas Pulau Ismoyo karang di tengah pantai.',
    location: 'Malang, Jawa Timur',
    featured: false,
    main_image: '/images/pantai-balekambang.jpg'
  },
  {
    id: 11,
    category_id: 3,
    category: { id: 3, name: 'Wisata Budaya & Sejarah' },
    title: 'Candi Borobudur',
    slug: 'candi-borobudur',
    excerpt: 'Candi Buddha terbesar di dunia peninggalan abad ke-9 dengan arsitektur megah.',
    description: 'Candi Borobudur adalah monumen Buddha terbesar di dunia yang dibangun pada masa Dinasti Syailendra. Dikenal dengan relief dinding yang rumit dan stupa-stupa berlubang yang berisi arca Buddha, Borobudur merupakan keajaiban arsitektur kuno dan destinasi wajib saat berkunjung ke wilayah Jogja dan sekitarnya.',
    location: 'Magelang, Jawa Tengah',
    featured: true,
    main_image: '/images/Borobudur.jpg'
  },
  {
    id: 12,
    category_id: 3,
    category: { id: 3, name: 'Wisata Budaya & Sejarah' },
    title: 'Candi Prambanan',
    slug: 'candi-prambanan',
    excerpt: 'Kompleks candi Hindu terbesar di Indonesia yang menjulang anggun.',
    description: 'Candi Prambanan adalah mahakarya kebudayaan Hindu dari abad ke-10 yang didedikasikan untuk Trimurti (Dewa Brahma, Wisnu, dan Siwa). Candi utamanya yang ramping dan menjulang setinggi 47 meter menjadi daya tarik visual yang luar biasa, terutama saat senja tiba.',
    location: 'Sleman, Yogyakarta',
    featured: true,
    main_image: '/images/prambanan.jpg'
  },
  {
    id: 13,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Goa Pindul Gunungkidul',
    slug: 'goa-pindul-gunungkidul',
    excerpt: 'Sensasi cave tubing menyusuri sungai bawah tanah di dalam gua karst eksotis.',
    description: 'Goa Pindul menawarkan pengalaman unik berupa "Cave Tubing", di mana wisatawan akan menyusuri aliran sungai bawah tanah di dalam gua menggunakan ban pelampung. Sambil mengapung santai, Anda dapat menikmati keindahan ornamen stalaktit dan stalagmit yang terbentuk secara alami ribuan tahun.',
    location: 'Gunungkidul, Yogyakarta',
    featured: false,
    main_image: '/images/goa-pindul.jpg'
  },
  {
    id: 14,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Heha Sky View',
    slug: 'heha-sky-view',
    excerpt: 'Spot panorama terbaik melihat lanskap kota Yogyakarta dari ketinggian.',
    description: 'Heha Sky View adalah destinasi wisata modern kekinian di perbukitan Gunungkidul. Tempat ini sangat populer berkat spot-spot foto instagenik berlatar belakang hamparan kota Yogyakarta dari ketinggian. Waktu terbaik berkunjung adalah sore hari untuk menikmati pemandangan matahari terbenam dan gemerlap lampu kota di malam hari.',
    location: 'Gunungkidul, Yogyakarta',
    featured: true,
    main_image: '/images/heha-sky.jpg'
  },
  {
    id: 15,
    category_id: 2,
    category: { id: 2, name: 'Wisata Bahari' },
    title: 'Pantai Timang',
    slug: 'pantai-timang',
    excerpt: 'Uji adrenalin dengan menaiki gondola kayu tradisional melintasi ombak besar Samudra Hindia.',
    description: 'Pantai Timang bukan sekadar pantai biasa. Daya tarik utamanya adalah sebuah pulau karang (Pulau Timang) yang dihubungkan ke tebing daratan oleh kereta gantung kayu tradisional (gondola) dan jembatan gantung yang mendebarkan. Pantai ini sangat cocok untuk Anda yang menyukai tantangan dan adrenalin.',
    location: 'Gunungkidul, Yogyakarta',
    featured: false,
    main_image: '/images/pantai-timang.jpg'
  },
  {
    id: 16,
    category_id: 4,
    category: { id: 4, name: 'Wisata Kuliner' },
    title: 'Jalan Malioboro',
    slug: 'jalan-malioboro',
    excerpt: 'Jantung kota Jogja, surga belanja suvenir dan kuliner angkringan malam.',
    description: 'Jalan Malioboro adalah ikon tak terpisahkan dari Yogyakarta. Kawasan pedestrian ini selalu ramai oleh wisatawan yang berburu batik, kerajinan tangan, dan suvenir khas Jogja. Di malam hari, Malioboro bertransformasi menjadi pusat kuliner angkringan dan musisi jalanan yang menghidupkan suasana magis kota pelajar ini.',
    location: 'Kota Yogyakarta',
    featured: true,
    main_image: '/images/malioboro.jpg'
  },
  {
    id: 17,
    category_id: 1,
    category: { id: 1, name: 'Wisata Alam' },
    title: 'Obelix Hills',
    slug: 'obelix-hills',
    excerpt: 'Wisata bukit batu purba kekinian dengan pemandangan sunset memukau.',
    description: 'Berada di atas bebatuan purba yang luas, Obelix Hills menawarkan tempat bersantai yang luar biasa estetik dengan pemandangan lembah hijau dan matahari terbenam yang sempurna. Tempat ini dilengkapi puluhan spot foto keren, bean bag untuk bersantai, dan live music yang menghangatkan suasana.',
    location: 'Sleman, Yogyakarta',
    featured: false,
    main_image: '/images/obelix-hills.jpg'
  },
];

export const fallbackTestimonials = [
  {
    id: 1,
    name: 'Ferry Setiawan',
    profession: 'Karyawan Swasta',
    quote: 'Pelayanan KawanJalan Tour & Travel sangat luar biasa! Proses booking paket Bali sangat cepat, sistem DP 30% via website sangat membantu cashflow liburan keluarga kami. E-Tiket langsung kami terima setelah status di-update admin.',
    rating: 5,
    image: 'testimonial_ferry.jpg'
  },
  {
    id: 2,
    name: 'Dian Sastrowardoyo',
    profession: 'Content Creator & Photographer',
    quote: 'Sangat suka dengan detail informasi destinasi wisata yang ada di KawanJalan Tour & Travel. Selain itu, pendaftaran event kebudayaannya sangat mudah dilakukan lewat handphone. Desain websitenya clean dan modern!',
    rating: 5,
    image: 'testimonial_dian.jpg'
  }
];

export const fallbackEvents = [
  {
    id: 1,
    title: 'Bali Arts Festival (Pesta Kesenian Bali) 2026',
    slug: 'bali-arts-festival-2026',
    main_image: '/images/pantai-balekambang.jpg',
    date: '2026-07-05T00:00:00.000Z',
    location: 'Taman Budaya Art Center, Denpasar'
  },
  {
    id: 2,
    title: 'Borobudur Marathon & Festival Kebudayaan 2026',
    slug: 'borobudur-marathon-2026',
    main_image: '/images/Borobudur.jpg',
    date: '2026-06-10T00:00:00.000Z',
    location: 'Kawasan Candi Borobudur, Magelang'
  }
];

export const fallbackArticles = [
  {
    id: 1,
    title: 'Panduan Lengkap Berburu Sunrise Magis di Gunung Bromo',
    slug: 'panduan-berburu-sunrise-magis-gunung-bromo',
    excerpt: 'Rekomendasi spot sunrise terbaik di Bromo, tips berpakaian hangat, hingga panduan sewa Jeep 4x4.',
    description: 'Gunung Bromo selalu menyajikan pemandangan sunrise yang luar biasa megah dan menarik ribuan wisatawan setiap tahunnya. Petualangan berburu sunrise biasanya dimulai sejak dini hari pukul 02.00 WIB. Pilihan transportasi utama adalah Jeep 4x4 yang tangguh menerjang lautan pasir berliku. Ada beberapa spot pandang terbaik yang bisa Anda pilih, seperti Penanjakan 1, Bukit Cinta, Bukit Kedaluh (King Kong Hill), atau Bukit Mentigen. Untuk menikmati petualangan ini dengan maksimal, pastikan Anda mempersiapkan pakaian hangat yang tebal seperti jaket gunung, kupluk penutup kepala, sarung tangan, dan masker pelindung debu pasir.',
    main_image: '/images/sunrise-bromo.jpg',
    images: [
      { id: 1, image_name: '/images/Bromo.jpg' },
      { id: 2, image_name: '/images/savana-bromo.jpg' }
    ]
  },
  {
    id: 2,
    title: 'Menyusuri Jejak Sejarah & Memacu Adrenalin Lavatour Merapi',
    slug: 'menyusuri-jejak-sejarah-adrenalin-lavatour-merapi',
    excerpt: 'Kisah saksi bisu erupsi besar Merapi yang kini menjelma menjadi rute petualangan jeep offroad menantang.',
    description: 'Lavatour Merapi menawarkan kombinasi unik antara wisata sejarah mitigasi bencana dan petualangan memacu adrenalin. Mengendarai Jeep Willys klasik tanpa atap, Anda akan diajak menyusuri kawasan lereng selatan yang terdampak langsung erupsi dahsyat tahun 2010. Perjalanan mencakup kunjungan ke Bunker Kaliadem, Museum Sisa Hartaku yang mengoleksi barang rumah tangga meleleh, serta Batu Alien. Petualangan ditutup dengan manuver air yang menegangkan di Kali Kuning. Siapkan kacamata hitam dan masker agar terhindar dari debu trek pasir vulkanik.',
    main_image: '/images/Merapi.jpg',
    images: [
      { id: 3, image_name: '/images/bunker-kaliadem.jpg' },
      { id: 4, image_name: '/images/museum-merapi.jpg' }
    ]
  }
];
