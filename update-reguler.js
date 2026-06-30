import fs from 'fs';

function updatePackages(filePath, prefixRegex, imagePrefix) {
  let content = fs.readFileSync(filePath, 'utf8');
  let counter = 1;
  
  const regex = new RegExp(`(title:\\s*['"]${prefixRegex}\\s*-\\s*Paket\\s+\\d+['"][\\s\\S]*?main_image:\\s*['"])[^'"]+(['"])`, 'gi');
  
  content = content.replace(regex, (match, p1, p2) => {
    const replacement = `${p1}/images/${imagePrefix}${counter}.jpg${p2}`;
    counter++;
    return replacement;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${counter - 1} packages in ${filePath}`);
}

updatePackages('e:/PROYEK WEBSITE/Wisata/frontend/src/data/fallbackData.js', 'Paket Jogja Reguler', 'reguler');
updatePackages('e:/PROYEK WEBSITE/Wisata/frontend/src/data/jogjaTourData.js', 'Paket Jogja Reguler', 'reguler');
