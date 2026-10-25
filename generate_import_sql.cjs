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

function esc(val) {
  if (val === null || val === undefined || val === '') return 'NULL';
  return `'${val.replace(/'/g, "''")}'`;
}

function normalizeAvailability(val) {
  if (val === 'true' || val === true || val === 'In Stock') return 'In Stock';
  if (val === 'false' || val === false || val === 'Out of Stock') return 'Out of Stock';
  return val || 'In Stock';
}

let sql = `-- ==============================================================================
-- Fresh Nest Personal Project - Safe Catalogue Import Script
-- Synchronizes 22 products and 52 variants from exported catalogue
-- SAFE & NON-DESTRUCTIVE: Zero DROP, Zero TRUNCATE, Zero order manipulation
-- ==============================================================================\n\n`;

sql += `-- Step 1: Ensure 'image' column exists on variants table\n`;
sql += `ALTER TABLE variants ADD COLUMN IF NOT EXISTS image TEXT;\n\n`;

sql += `-- Step 2: Insert or Update Products (22 items)\n`;
products.rows.forEach(p => {
  const id = parseInt(p.id);
  const name = esc(p.name);
  const category = esc(p.category);
  const description = esc(p.description);
  const image = esc(p.image);
  const createdAt = p.created_at ? esc(p.created_at) : "timezone('utc'::text, now())";

  sql += `INSERT INTO products (id, name, category, description, image, created_at)\n`;
  sql += `VALUES (${id}, ${name}, ${category}, ${description}, ${image}, ${createdAt})\n`;
  sql += `ON CONFLICT (id) DO UPDATE SET\n`;
  sql += `  name = EXCLUDED.name,\n`;
  sql += `  category = EXCLUDED.category,\n`;
  sql += `  description = EXCLUDED.description,\n`;
  sql += `  image = EXCLUDED.image;\n\n`;
});

sql += `-- Step 3: Insert or Update Variants (52 items)\n`;
variants.rows.forEach(v => {
  const id = esc(v.id);
  const productId = parseInt(v.product_id);
  const name = esc(v.name);
  const price = parseInt(v.price) || 0;
  const availability = esc(normalizeAvailability(v.availability));
  const groupName = v.group_name ? esc(v.group_name) : 'NULL';
  const groupType = v.group_type ? esc(v.group_type) : 'NULL';
  const image = v.image ? esc(v.image) : 'NULL';
  const createdAt = v.created_at ? esc(v.created_at) : "timezone('utc'::text, now())";

  sql += `INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)\n`;
  sql += `VALUES (${id}, ${productId}, ${name}, ${price}, ${availability}, ${groupName}, ${groupType}, ${image}, ${createdAt})\n`;
  sql += `ON CONFLICT (id) DO UPDATE SET\n`;
  sql += `  product_id = EXCLUDED.product_id,\n`;
  sql += `  name = EXCLUDED.name,\n`;
  sql += `  price = EXCLUDED.price,\n`;
  sql += `  availability = EXCLUDED.availability,\n`;
  sql += `  group_name = EXCLUDED.group_name,\n`;
  sql += `  group_type = EXCLUDED.group_type,\n`;
  sql += `  image = EXCLUDED.image;\n\n`;
});

sql += `-- Step 4: Safely Synchronize Auto-Increment Sequence for Products (Checks if sequence exists)\n`;
sql += `DO $$\n`;
sql += `BEGIN\n`;
sql += `  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'products_id_seq') THEN\n`;
sql += `    PERFORM setval('products_id_seq', (SELECT COALESCE(MAX(id), 1) FROM products));\n`;
sql += `  ELSIF pg_get_serial_sequence('products', 'id') IS NOT NULL THEN\n`;
sql += `    PERFORM setval(pg_get_serial_sequence('products', 'id'), (SELECT COALESCE(MAX(id), 1) FROM products));\n`;
sql += `  END IF;\n`;
sql += `END $$;\n`;

fs.writeFileSync('catalogue-import/import_catalogue.sql', sql);
console.log('import_catalogue.sql generated successfully. Total products:', products.rows.length, 'Total variants:', variants.rows.length);
