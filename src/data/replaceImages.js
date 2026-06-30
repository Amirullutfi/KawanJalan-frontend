const fs = require('fs');
const path = require('path');

const fallbackDataPath = path.join(__dirname, 'fallbackData.js');
const jogjaTourDataPath = path.join(__dirname, 'jogjaTourData.js');

let fallback = fs.readFileSync(fallbackDataPath, 'utf8');
let jogja = fs.readFileSync(jogjaTourDataPath, 'utf8');

// Helper to replace images based on regex
function replaceImages(content, titleRegex, newImageUrl) {
  // Matches title: '...', ... main_image: '...'
  const blockRegex = new RegExp(`(title:\\s*['"][^'"]*${titleRegex}[^'"]*['"][\\s\\S]*?main_image:\\s*['"])([^'"]+)(['"])`, 'gi');
  let count = 0;
  const replaced = content.replace(blockRegex, (match, p1, p2, p3) => {
    count++;
    return p1 + newImageUrl + p3;
  });
  console.log(`Replaced ${count} images for regex: ${titleRegex}`);
  return replaced;
}

// 1. Jogja Packages
fallback = replaceImages(fallback, 'Jogja Reguler', 'https://images.unsplash.com/photo-1584446549021-d7790b8f0d86?w=800'); // Prambanan/Jogja
fallback = replaceImages(fallback, 'Jogja Sunrise', 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=800'); // Borobudur Sunrise

// 2. Merapi Packages & Destinations
fallback = replaceImages(fallback, 'Merapi', 'https://images.unsplash.com/photo-1647864070265-ccdf2d15fb91?w=800'); // Jeep Lava Tour
fallback = replaceImages(fallback, 'Sisa Hartaku', 'https://images.unsplash.com/photo-1596766649666-6dbf859a0e69?w=800'); // Jeep Merapi
fallback = replaceImages(fallback, 'Bunker', 'https://images.unsplash.com/photo-1634629471378-0e70ab5be4b7?w=800'); // Merapi Mountain

// 3. Bromo Packages & Destinations
fallback = replaceImages(fallback, 'Bromo', 'https://images.unsplash.com/photo-1558066597-285625c27636?w=800');
fallback = replaceImages(fallback, 'Teletubbies', 'https://images.unsplash.com/photo-1571216397365-d60fa22e17e4?w=800'); // Savana
fallback = replaceImages(fallback, 'Poten', 'https://images.unsplash.com/photo-1622378964356-654db4c979d3?w=800'); // Temple
fallback = replaceImages(fallback, 'Berbisik', 'https://images.unsplash.com/photo-1588668214407-6797208c9012?w=800'); // Sand sea

// 4. Cars (Mobil)
fallback = replaceImages(fallback, 'Sewa Armada.*(Calya|Avanza|Inova|Haice|Antar|Jemput)', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'); // MPV
fallback = replaceImages(fallback, 'Lepas Kunci', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800');
fallback = replaceImages(fallback, 'All In', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800');

// 5. Motor
fallback = replaceImages(fallback, 'Sewa Motor', 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93ff?w=800');

// Save fallbackData.js
fs.writeFileSync(fallbackDataPath, fallback, 'utf8');

// Now for jogjaTourData.js
function replaceJogjaImages(content, titleRegex, newImageUrl) {
  // For jogjaTourData, properties are packageName or vehicleName and image instead of main_image
  let blockRegex = new RegExp(`(packageName:\\s*['"][^'"]*${titleRegex}[^'"]*['"][\\s\\S]*?image:\\s*['"])([^'"]+)(['"])`, 'gi');
  content = content.replace(blockRegex, (match, p1, p2, p3) => p1 + newImageUrl + p3);
  
  blockRegex = new RegExp(`(vehicleName:\\s*['"][^'"]*${titleRegex}[^'"]*['"][\\s\\S]*?image:\\s*['"])([^'"]+)(['"])`, 'gi');
  content = content.replace(blockRegex, (match, p1, p2, p3) => p1 + newImageUrl + p3);
  
  return content;
}

jogja = replaceJogjaImages(jogja, 'Paket \\d+', 'https://images.unsplash.com/photo-1584446549021-d7790b8f0d86?w=800'); // Reguler
jogja = replaceJogjaImages(jogja, 'SUNRISE', 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=800'); // Sunrise
jogja = replaceJogjaImages(jogja, '(Matic|Manual|Driver|Inova|Avanza|Hiace)', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'); // Mobil
jogja = replaceJogjaImages(jogja, '(NMAX|Vario|Fazzio|Beat|Scoopy)', 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93ff?w=800'); // Motor

fs.writeFileSync(jogjaTourDataPath, jogja, 'utf8');

console.log('Successfully replaced dummy images in fallbackData.js and jogjaTourData.js!');
