const fs = require('fs');

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const values = [];
    let cur = '';
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        values.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    values.push(cur.trim());
    const obj = {};
    headers.forEach((h, idx) => {
      let val = values[idx] || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      obj[h] = val;
    });
    rows.push(obj);
  }
  return { headers, rows };
}

const products = parseCSV('catalogue-import/products_rows.csv');
const variants = parseCSV('catalogue-import/variants_rows.csv');

console.log('--- PRODUCTS ANALYSIS ---');
console.log('Columns:', products.headers);
console.log('Total Products:', products.rows.length);
const productIds = new Set(products.rows.map(p => parseInt(p.id)));
console.log('Product IDs:', [...productIds].sort((a,b) => a-b));
const categories = new Set(products.rows.map(p => p.category));
console.log('Categories:', [...categories]);

console.log('\n--- VARIANTS ANALYSIS ---');
console.log('Columns:', variants.headers);
console.log('Total Variants:', variants.rows.length);
const variantProductIds = new Set(variants.rows.map(v => parseInt(v.product_id)));
console.log('Variant Product IDs:', [...variantProductIds].sort((a,b) => a-b));

const missingProductIds = [...variantProductIds].filter(id => !productIds.has(id));
console.log('Foreign key check (Missing Product IDs):', missingProductIds.length === 0 ? 'ALL VALID (0 missing)' : missingProductIds);

const availabilities = new Set(variants.rows.map(v => v.availability));
console.log('Unique availability values:', [...availabilities]);

const variantsWithImage = variants.rows.filter(v => Boolean(v.image));
console.log('Variants with image URL:', variantsWithImage.length);
variantsWithImage.forEach(v => console.log(`  - Variant ${v.id} (${v.name}): ${v.image}`));

const groupedVariants = variants.rows.filter(v => Boolean(v.group_name));
console.log('Grouped variants:', groupedVariants.length);
const groups = new Set(groupedVariants.map(v => `${v.group_name} (${v.group_type})`));
console.log('Groups:', [...groups]);
