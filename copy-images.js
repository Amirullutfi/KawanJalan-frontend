import fs from 'fs';
import path from 'path';

// Source AI-generated image
const sourceFile = 'C:/Users/senju/.gemini/antigravity-ide/brain/37c9f891-b3c6-47d6-a7d2-eff8c43fbac9/bandara_drop_1782802978065.png';

// Destination files in the project
const dropDest = 'e:/PROYEK WEBSITE/Wisata/frontend/public/images/bandara-drop.png';
const pickupDest = 'e:/PROYEK WEBSITE/Wisata/frontend/public/images/bandara-pickup.png';

try {
  // Copy the AI image to the public folder
  fs.copyFileSync(sourceFile, dropDest);
  fs.copyFileSync(sourceFile, pickupDest);
  console.log('✅ Gambar berhasil ditambahkan ke folder images!');
  
  // Now update fallbackData.js to use these new images
  const dataFile = 'e:/PROYEK WEBSITE/Wisata/frontend/src/data/fallbackData.js';
  let content = fs.readFileSync(dataFile, 'utf8');
  
  // Update DROP package
  content = content.replace(
    /(title:\s*['"]Airport Transfer - PAKET ANTAR BANDARA \(DROP\)['"][\s\S]*?main_image:\s*['"])[^'"]+(['"])/i,
    `$1/images/bandara-drop.png$2`
  );
  
  // Update PICKUP package
  content = content.replace(
    /(title:\s*['"]Airport Transfer - PAKET JEMPUT BANDARA \(PICKUP\)['"][\s\S]*?main_image:\s*['"])[^'"]+(['"])/i,
    `$1/images/bandara-pickup.png$2`
  );
  
  fs.writeFileSync(dataFile, content, 'utf8');
  console.log('✅ Kode fallbackData.js berhasil diperbarui!');
} catch (error) {
  console.error('❌ Terjadi kesalahan:', error.message);
}
