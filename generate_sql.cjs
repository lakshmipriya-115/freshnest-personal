const fs = require('fs');

const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    category: 'Fresh Vegetables',
    description: 'Fresh, ripe organic tomatoes',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '1-1', name: '500g', price: 60, availability: 'In Stock' },
      { id: '1-2', name: '1kg', price: 110, availability: 'In Stock' }
    ]
  },
  {
    id: 2,
    name: 'Carrots',
    category: 'Fresh Vegetables',
    description: 'Fresh, crispy carrots',
    image: 'https://images.unsplash.com/photo-1587927213944-5ffd06721e0f?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '2-1', name: '500g', price: 40, availability: 'In Stock' },
      { id: '2-2', name: '1kg', price: 75, availability: 'In Stock' }
    ]
  },
  {
    id: 3,
    name: 'Spinach',
    category: 'Fresh Vegetables',
    description: 'Fresh leafy spinach',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '3-1', name: 'Bunch', price: 50, availability: 'In Stock' },
      { id: '3-2', name: '500g', price: 70, availability: 'In Stock' }
    ]
  },
  {
    id: 4,
    name: 'Bell Peppers',
    category: 'Fresh Vegetables',
    description: 'Colorful bell peppers',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '4-1', name: 'Single', price: 45, availability: 'In Stock' },
      { id: '4-2', name: 'Pack of 3', price: 120, availability: 'In Stock' }
    ]
  },
  {
    id: 5,
    name: 'Mushrooms',
    category: 'Fresh Vegetables',
    description: 'Fresh button mushrooms',
    image: 'https://images.unsplash.com/photo-1606834519-e8fd62b80f10?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      {
        id: '5-1',
        name: 'Box',
        type: 'box',
        options: [
          { id: '5-1-1', name: '1 Box', price: 80, availability: 'In Stock' },
          { id: '5-1-2', name: '2 Boxes', price: 150, availability: 'In Stock' }
        ]
      },
      {
        id: '5-2',
        name: 'Wholesale',
        type: 'wholesale',
        options: [
          { id: '5-2-1', name: '1 kg', price: 180, availability: 'In Stock' },
          { id: '5-2-2', name: '2 kg', price: 350, availability: 'In Stock' },
          { id: '5-2-3', name: '5 kg', price: 800, availability: 'Out of Stock' }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Fresh Apples',
    category: 'Fresh Fruits',
    description: 'Crisp red apples',
    image: 'https://images.unsplash.com/photo-1560806887-1295e434732d?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '6-1', name: '500g', price: 80, availability: 'In Stock' },
      { id: '6-2', name: '1kg', price: 150, availability: 'In Stock' }
    ]
  },
  {
    id: 7,
    name: 'Bananas',
    category: 'Fresh Fruits',
    description: 'Fresh, ripe bananas',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '7-1', name: 'Bunch (6)', price: 60, availability: 'In Stock' },
      { id: '7-2', name: 'Dozen', price: 110, availability: 'In Stock' }
    ]
  },
  {
    id: 8,
    name: 'Oranges',
    category: 'Fresh Fruits',
    description: 'Juicy fresh oranges',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '8-1', name: '500g', price: 70, availability: 'In Stock' },
      { id: '8-2', name: '1kg', price: 130, availability: 'In Stock' }
    ]
  },
  {
    id: 9,
    name: 'Grapes',
    category: 'Fresh Fruits',
    description: 'Sweet green grapes',
    image: 'https://images.unsplash.com/photo-1585518419759-fef3fa0e49b2?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '9-1', name: '500g', price: 120, availability: 'In Stock' },
      { id: '9-2', name: '1kg', price: 220, availability: 'In Stock' }
    ]
  },
  {
    id: 10,
    name: 'Milk',
    category: 'Dairy & Breakfast',
    description: 'Fresh pasteurized milk',
    image: 'https://images.unsplash.com/photo-1563056169-4338de6cabda?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '10-1', name: '500ml', price: 40, availability: 'In Stock' },
      { id: '10-2', name: '1L', price: 75, availability: 'In Stock' }
    ]
  },
  {
    id: 11,
    name: 'Yogurt',
    category: 'Dairy & Breakfast',
    description: 'Creamy natural yogurt',
    image: 'https://images.unsplash.com/photo-1488477181946-85a2138e3c30?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '11-1', name: '400g', price: 60, availability: 'In Stock' },
      { id: '11-2', name: '800g', price: 110, availability: 'In Stock' }
    ]
  },
  {
    id: 12,
    name: 'Cheese',
    category: 'Dairy & Breakfast',
    description: 'Premium cheddar cheese',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940571cd?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '12-1', name: '200g', price: 120, availability: 'In Stock' },
      { id: '12-2', name: '500g', price: 280, availability: 'In Stock' }
    ]
  },
  {
    id: 13,
    name: 'Orange Juice',
    category: 'Beverages',
    description: 'Fresh orange juice',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '13-1', name: '500ml', price: 65, availability: 'In Stock' },
      { id: '13-2', name: '1L', price: 120, availability: 'In Stock' }
    ]
  },
  {
    id: 14,
    name: 'Coffee',
    category: 'Beverages',
    description: 'Premium ground coffee',
    image: 'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '14-1', name: '200g', price: 200, availability: 'In Stock' },
      { id: '14-2', name: '500g', price: 450, availability: 'In Stock' }
    ]
  },
  {
    id: 15,
    name: 'Tea',
    category: 'Beverages',
    description: 'Assorted premium tea',
    image: 'https://images.unsplash.com/photo-1597318133221-0b6c39e94b3d?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '15-1', name: '100 bags', price: 150, availability: 'In Stock' }
    ]
  },
  {
    id: 16,
    name: 'Ice Cream',
    category: 'Ice Cream & Treats',
    description: 'Vanilla ice cream',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e0d0?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '16-1', name: '500ml', price: 120, availability: 'In Stock' },
      { id: '16-2', name: '1L', price: 220, availability: 'In Stock' }
    ]
  },
  {
    id: 17,
    name: 'Chocolate Bar',
    category: 'Ice Cream & Treats',
    description: 'Premium dark chocolate',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '17-1', name: 'Single', price: 60, availability: 'In Stock' },
      { id: '17-2', name: 'Pack of 5', price: 280, availability: 'In Stock' }
    ]
  },
  {
    id: 18,
    name: 'Bread',
    category: 'Batter & Ready Essentials',
    description: 'Fresh whole wheat bread',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf3c9f86f8?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '18-1', name: '400g', price: 50, availability: 'In Stock' },
      { id: '18-2', name: '800g', price: 90, availability: 'In Stock' }
    ]
  },
  {
    id: 19,
    name: 'Pasta',
    category: 'Batter & Ready Essentials',
    description: 'Whole wheat pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '19-1', name: '500g', price: 60, availability: 'In Stock' },
      { id: '19-2', name: '1kg', price: 110, availability: 'In Stock' }
    ]
  },
  {
    id: 20,
    name: 'Rice',
    category: 'Batter & Ready Essentials',
    description: 'Basmati rice',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf3c9f86f8?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '20-1', name: '1kg', price: 120, availability: 'In Stock' },
      { id: '20-2', name: '5kg', price: 550, availability: 'In Stock' }
    ]
  },
  {
    id: 21,
    name: 'Olive Oil',
    category: 'Other Essentials',
    description: 'Extra virgin olive oil',
    image: 'https://images.unsplash.com/photo-1460923866917-7f88c01fac6b?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '21-1', name: '500ml', price: 200, availability: 'In Stock' },
      { id: '21-2', name: '1L', price: 380, availability: 'In Stock' }
    ]
  },
  {
    id: 22,
    name: 'Salt',
    category: 'Other Essentials',
    description: 'Iodized table salt',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '22-1', name: '500g', price: 30, availability: 'In Stock' },
      { id: '22-2', name: '1kg', price: 50, availability: 'In Stock' }
    ]
  },
  {
    id: 23,
    name: 'Sugar',
    category: 'Other Essentials',
    description: 'Refined sugar',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop',
    availability: 'In Stock',
    variants: [
      { id: '23-1', name: '1kg', price: 60, availability: 'In Stock' },
      { id: '23-2', name: '5kg', price: 280, availability: 'In Stock' }
    ]
  }
];

let sql = `-- ==============================================================================
-- Fresh Nest Personal Database Schema & Public Catalogue Seed
-- SAFE & IDEMPOTENT: Uses CREATE TABLE IF NOT EXISTS, DROP POLICY IF EXISTS,
-- and ON CONFLICT DO UPDATE so it can be safely run or re-run without errors.
-- CONTAINS ZERO REAL CUSTOMER RECORDS OR REAL CLIENT ORDERS.
-- ==============================================================================\n\n`;

sql += `-- 1. Tables & Relationships\n`;
sql += `CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);\n\n`;

sql += `CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  availability TEXT NOT NULL,
  group_name TEXT,
  group_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);\n\n`;

sql += `CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  landmark TEXT,
  subtotal INTEGER NOT NULL,
  delivery_charge INTEGER NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);\n\n`;

sql += `CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  variant_id TEXT REFERENCES variants(id),
  product_name TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
);\n\n`;

sql += `-- 2. Public Product Catalogue Seed (23 Products, 0 Private Customer Records)\n`;
PRODUCTS.forEach(p => {
  const name = p.name.replace(/'/g, "''");
  const desc = p.description.replace(/'/g, "''");
  sql += `INSERT INTO products (id, name, category, description, image) VALUES (${p.id}, '${name}', '${p.category}', '${desc}', '${p.image}')\n  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;\n`;
});

sql += `\n-- 3. Public Product Variants Seed (Weights, Sizes, Prices, Stock Status)\n`;
PRODUCTS.forEach(p => {
  p.variants.forEach(v => {
    if (v.options) {
      v.options.forEach(o => {
        const vName = o.name.replace(/'/g, "''");
        sql += `INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type) VALUES ('${o.id}', ${p.id}, '${vName}', ${o.price}, '${o.availability}', '${v.name}', '${v.type}')\n  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability, group_name = EXCLUDED.group_name, group_type = EXCLUDED.group_type;\n`;
      });
    } else {
      const vName = v.name.replace(/'/g, "''");
      sql += `INSERT INTO variants (id, product_id, name, price, availability) VALUES ('${v.id}', ${p.id}, '${vName}', ${v.price}, '${v.availability}')\n  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;\n`;
    }
  });
});

sql += `\n-- 4. Synchronize Auto-Increment Sequences\n`;
sql += `SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 1) FROM products));\n`;
sql += `SELECT setval('order_items_id_seq', (SELECT COALESCE(MAX(id), 1) FROM order_items));\n`;

sql += `\n-- 5. Row Level Security (RLS) Policies\n`;
sql += `ALTER TABLE products ENABLE ROW LEVEL SECURITY;\n`;
sql += `ALTER TABLE variants ENABLE ROW LEVEL SECURITY;\n`;
sql += `ALTER TABLE orders ENABLE ROW LEVEL SECURITY;\n`;
sql += `ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;\n\n`;

sql += `-- Public Read Access for Products & Variants\n`;
sql += `DROP POLICY IF EXISTS "Allow anon select products" ON products;\n`;
sql += `CREATE POLICY "Allow anon select products" ON products FOR SELECT TO public USING (true);\n\n`;
sql += `DROP POLICY IF EXISTS "Allow anon select variants" ON variants;\n`;
sql += `CREATE POLICY "Allow anon select variants" ON variants FOR SELECT TO public USING (true);\n\n`;

sql += `-- Public Insert Access for Customer Demo Checkout Orders (Privacy: anon users cannot select or view other orders)\n`;
sql += `DROP POLICY IF EXISTS "Allow public insert orders" ON orders;\n`;
sql += `CREATE POLICY "Allow public insert orders" ON orders FOR INSERT TO public WITH CHECK (true);\n\n`;
sql += `DROP POLICY IF EXISTS "Allow public insert order_items" ON order_items;\n`;
sql += `CREATE POLICY "Allow public insert order_items" ON order_items FOR INSERT TO public WITH CHECK (true);\n\n`;

sql += `-- Admin Access (Authenticated Users Only)\n`;
sql += `DROP POLICY IF EXISTS "Allow admin update variants" ON variants;\n`;
sql += `CREATE POLICY "Allow admin update variants" ON variants FOR UPDATE TO authenticated USING (true);\n\n`;
sql += `DROP POLICY IF EXISTS "Allow admin select orders" ON orders;\n`;
sql += `CREATE POLICY "Allow admin select orders" ON orders FOR SELECT TO authenticated USING (true);\n\n`;
sql += `DROP POLICY IF EXISTS "Allow admin update orders" ON orders;\n`;
sql += `CREATE POLICY "Allow admin update orders" ON orders FOR UPDATE TO authenticated USING (true);\n\n`;
sql += `DROP POLICY IF EXISTS "Allow admin select order_items" ON order_items;\n`;
sql += `CREATE POLICY "Allow admin select order_items" ON order_items FOR SELECT TO authenticated USING (true);\n`;

fs.writeFileSync('supabase_schema.sql', sql);
console.log('SQL generated successfully.');
