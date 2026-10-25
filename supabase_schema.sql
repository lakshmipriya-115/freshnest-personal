-- ==============================================================================
-- Fresh Nest Personal Database Schema & Public Catalogue Seed
-- SAFE & IDEMPOTENT: Uses CREATE TABLE IF NOT EXISTS, DROP POLICY IF EXISTS,
-- and ON CONFLICT DO UPDATE so it can be safely run or re-run without errors.
-- CONTAINS ZERO REAL CUSTOMER RECORDS OR REAL CLIENT ORDERS.
-- ==============================================================================

-- 1. Tables & Relationships
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  availability TEXT NOT NULL,
  group_name TEXT,
  group_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS orders (
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
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  variant_id TEXT REFERENCES variants(id),
  product_name TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
);

-- 2. Public Product Catalogue Seed (23 Products, 0 Private Customer Records)
INSERT INTO products (id, name, category, description, image) VALUES (1, 'Organic Tomatoes', 'Fresh Vegetables', 'Fresh, ripe organic tomatoes', 'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (2, 'Carrots', 'Fresh Vegetables', 'Fresh, crispy carrots', 'https://images.unsplash.com/photo-1587927213944-5ffd06721e0f?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (3, 'Spinach', 'Fresh Vegetables', 'Fresh leafy spinach', 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (4, 'Bell Peppers', 'Fresh Vegetables', 'Colorful bell peppers', 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (5, 'Mushrooms', 'Fresh Vegetables', 'Fresh button mushrooms', 'https://images.unsplash.com/photo-1606834519-e8fd62b80f10?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (6, 'Fresh Apples', 'Fresh Fruits', 'Crisp red apples', 'https://images.unsplash.com/photo-1560806887-1295e434732d?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (7, 'Bananas', 'Fresh Fruits', 'Fresh, ripe bananas', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (8, 'Oranges', 'Fresh Fruits', 'Juicy fresh oranges', 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (9, 'Grapes', 'Fresh Fruits', 'Sweet green grapes', 'https://images.unsplash.com/photo-1585518419759-fef3fa0e49b2?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (10, 'Milk', 'Dairy & Breakfast', 'Fresh pasteurized milk', 'https://images.unsplash.com/photo-1563056169-4338de6cabda?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (11, 'Yogurt', 'Dairy & Breakfast', 'Creamy natural yogurt', 'https://images.unsplash.com/photo-1488477181946-85a2138e3c30?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (12, 'Cheese', 'Dairy & Breakfast', 'Premium cheddar cheese', 'https://images.unsplash.com/photo-1618164436241-4473940571cd?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (13, 'Orange Juice', 'Beverages', 'Fresh orange juice', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (14, 'Coffee', 'Beverages', 'Premium ground coffee', 'https://images.unsplash.com/photo-1559056169-641ef0ac8b9d?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (15, 'Tea', 'Beverages', 'Assorted premium tea', 'https://images.unsplash.com/photo-1597318133221-0b6c39e94b3d?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (16, 'Ice Cream', 'Ice Cream & Treats', 'Vanilla ice cream', 'https://images.unsplash.com/photo-1563805042-7684c019e0d0?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (17, 'Chocolate Bar', 'Ice Cream & Treats', 'Premium dark chocolate', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (18, 'Bread', 'Batter & Ready Essentials', 'Fresh whole wheat bread', 'https://images.unsplash.com/photo-1586985289688-cacf3c9f86f8?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (19, 'Pasta', 'Batter & Ready Essentials', 'Whole wheat pasta', 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (20, 'Rice', 'Batter & Ready Essentials', 'Basmati rice', 'https://images.unsplash.com/photo-1586985289688-cacf3c9f86f8?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (21, 'Olive Oil', 'Other Essentials', 'Extra virgin olive oil', 'https://images.unsplash.com/photo-1460923866917-7f88c01fac6b?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (22, 'Salt', 'Other Essentials', 'Iodized table salt', 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;
INSERT INTO products (id, name, category, description, image) VALUES (23, 'Sugar', 'Other Essentials', 'Refined sugar', 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33a2b?w=500&h=500&fit=crop')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image;

-- 3. Public Product Variants Seed (Weights, Sizes, Prices, Stock Status)
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('1-1', 1, '500g', 60, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('1-2', 1, '1kg', 110, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('2-1', 2, '500g', 40, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('2-2', 2, '1kg', 75, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('3-1', 3, 'Bunch', 50, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('3-2', 3, '500g', 70, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('4-1', 4, 'Single', 45, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('4-2', 4, 'Pack of 3', 120, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type) VALUES ('5-1-1', 5, '1 Box', 80, 'In Stock', 'Box', 'box')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability, group_name = EXCLUDED.group_name, group_type = EXCLUDED.group_type;
INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type) VALUES ('5-1-2', 5, '2 Boxes', 150, 'In Stock', 'Box', 'box')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability, group_name = EXCLUDED.group_name, group_type = EXCLUDED.group_type;
INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type) VALUES ('5-2-1', 5, '1 kg', 180, 'In Stock', 'Wholesale', 'wholesale')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability, group_name = EXCLUDED.group_name, group_type = EXCLUDED.group_type;
INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type) VALUES ('5-2-2', 5, '2 kg', 350, 'In Stock', 'Wholesale', 'wholesale')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability, group_name = EXCLUDED.group_name, group_type = EXCLUDED.group_type;
INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type) VALUES ('5-2-3', 5, '5 kg', 800, 'Out of Stock', 'Wholesale', 'wholesale')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability, group_name = EXCLUDED.group_name, group_type = EXCLUDED.group_type;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('6-1', 6, '500g', 80, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('6-2', 6, '1kg', 150, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('7-1', 7, 'Bunch (6)', 60, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('7-2', 7, 'Dozen', 110, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('8-1', 8, '500g', 70, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('8-2', 8, '1kg', 130, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('9-1', 9, '500g', 120, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('9-2', 9, '1kg', 220, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('10-1', 10, '500ml', 40, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('10-2', 10, '1L', 75, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('11-1', 11, '400g', 60, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('11-2', 11, '800g', 110, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('12-1', 12, '200g', 120, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('12-2', 12, '500g', 280, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('13-1', 13, '500ml', 65, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('13-2', 13, '1L', 120, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('14-1', 14, '200g', 200, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('14-2', 14, '500g', 450, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('15-1', 15, '100 bags', 150, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('16-1', 16, '500ml', 120, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('16-2', 16, '1L', 220, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('17-1', 17, 'Single', 60, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('17-2', 17, 'Pack of 5', 280, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('18-1', 18, '400g', 50, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('18-2', 18, '800g', 90, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('19-1', 19, '500g', 60, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('19-2', 19, '1kg', 110, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('20-1', 20, '1kg', 120, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('20-2', 20, '5kg', 550, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('21-1', 21, '500ml', 200, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('21-2', 21, '1L', 380, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('22-1', 22, '500g', 30, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('22-2', 22, '1kg', 50, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('23-1', 23, '1kg', 60, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;
INSERT INTO variants (id, product_id, name, price, availability) VALUES ('23-2', 23, '5kg', 280, 'In Stock')
  ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, availability = EXCLUDED.availability;

-- 4. Synchronize Auto-Increment Sequences
SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 1) FROM products));
SELECT setval('order_items_id_seq', (SELECT COALESCE(MAX(id), 1) FROM order_items));

-- 5. Row Level Security (RLS) Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public Read Access for Products & Variants
DROP POLICY IF EXISTS "Allow anon select products" ON products;
CREATE POLICY "Allow anon select products" ON products FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow anon select variants" ON variants;
CREATE POLICY "Allow anon select variants" ON variants FOR SELECT TO public USING (true);

-- Public Insert Access for Customer Demo Checkout Orders (Privacy: anon users cannot select or view other orders)
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
CREATE POLICY "Allow public insert orders" ON orders FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert order_items" ON order_items;
CREATE POLICY "Allow public insert order_items" ON order_items FOR INSERT TO public WITH CHECK (true);

-- Admin Access (Authenticated Users Only)
DROP POLICY IF EXISTS "Allow admin update variants" ON variants;
CREATE POLICY "Allow admin update variants" ON variants FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow admin select orders" ON orders;
CREATE POLICY "Allow admin select orders" ON orders FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow admin update orders" ON orders;
CREATE POLICY "Allow admin update orders" ON orders FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow admin select order_items" ON order_items;
CREATE POLICY "Allow admin select order_items" ON order_items FOR SELECT TO authenticated USING (true);
