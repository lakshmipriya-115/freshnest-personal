-- ==============================================================================
-- Fresh Nest Personal Project - Safe Catalogue Import Script
-- Synchronizes 22 products and 52 variants from exported catalogue
-- SAFE & NON-DESTRUCTIVE: Zero DROP, Zero TRUNCATE, Zero order manipulation
-- ==============================================================================

-- Step 1: Ensure 'image' column exists on variants table
ALTER TABLE variants ADD COLUMN IF NOT EXISTS image TEXT;

-- Step 2: Insert or Update Products (22 items)
INSERT INTO products (id, name, category, description, image, created_at)
VALUES (1, 'Organic Tomatoes', 'Fresh Vegetables', 'Fresh, ripe organic tomatoes', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790927503/Fresh_Tomato_Pile_on_White_ixkt6m.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (2, 'Carrots', 'Fresh Vegetables', 'Fresh, crispy carrots', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790927642/Fresh_Carrots_on_Cream_Background_zclcme.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (5, 'Mushrooms', 'Fresh Vegetables', 'Fresh button mushrooms', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946639/Fresh_White_Mushrooms_on_Cream_mdrpvc.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (6, 'Fresh Apples', 'Fresh Fruits', 'Crisp red apples', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1791020513/Red_and_Yellow_Apple_Pile_xy67cr.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (7, 'Bananas', 'Fresh Fruits', 'Fresh, ripe bananas', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790928785/Minimalist_Banana_Bunch_Still_Life_lef9sy.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (8, 'Oranges', 'Fresh Fruits', 'Juicy fresh oranges', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946256/Pyramid_of_Fresh_Oranges_fneyuq.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (10, 'Milk', 'Dairy & Breakfast', 'Fresh pasteurized milk', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1791023247/Minimalist_Milk_Bottle_and_Glass_xkyupr.png', '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (11, 'Yogurt', 'Dairy & Breakfast', 'Creamy natural yogurt', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946292/Hatsun_Thick_Tasty_Curd_Tub_nvk3ox.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (22, 'Salt', 'Other Essentials', 'Iodized table salt', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790954342/Tata_Salt_Packet_on_Beige_Background_cqxmuo.png', '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (26, 'Coca-Cola', 'Beverages', 'Refreshing carbonated soft drink', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946319/Coca-Cola_Bottle_and_Fizzy_Glass_djtn5w.png', '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (27, 'Pepsi', 'Beverages', 'Refreshing carbonated soft drink', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946585/Pepsi_Bottle_and_Sparkling_Cola_Glass_j72b7q.png', '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (28, 'Bovonto', 'Beverages', 'Refreshing grape-flavoured soft drink', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1791020507/Bovonto_Cola_Bottle_and_Glass_bxfixs.png', '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (33, 'Eggs', 'Other Essentials', 'Fresh farm eggs', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790927666/Thirty_White_Eggs_in_Recycled_Carton_ca7rpu.png', '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (34, 'Fanta', 'Beverages', 'Refreshing orange-flavoured soft drink', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946661/Fanta_Bottle_and_Fizzy_Orange_Glass_knokf9.png', '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (35, 'Sprite', 'Beverages', 'Refreshing lemon-lime soft drink', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946573/Sprite_Bottle_and_Fizzy_Soda_Glass_cbvar1.png', '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (36, 'Dosa Batter', 'Batter & Ready Essentials', 'Fresh ready-to-use dosa batter', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1791020507/Tied_Bag_of_Creamy_Batter_lfge8y.png', '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (37, 'Onion', 'Fresh Vegetables', 'Fresh everyday cooking onions', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790927574/Red_Onion_Still_Life_Pile_f8f2ve.png', '2026-10-01 16:12:53.451+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (38, 'Potato', 'Fresh Vegetables', 'Fresh everyday cooking potatoes', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790927635/Rustic_Potato_Pile_on_Cream_Background_gybhxb.png', '2026-10-01 16:12:53.451+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (39, 'Milkybar', 'Chocolates', 'Creamy white chocolate bar', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790954339/Cadbury_Dairy_Milk_in_Purple_Wrapper_swwzjp.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (40, '5 Star', 'Chocolates', 'Rich caramel and chocolate bar', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790954334/Nestl%C3%A9_5Star_Chocolate_Bar_Package_dwj0gl.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (41, 'Snickers', 'Chocolates', 'Chocolate bar with peanuts, caramel and nougat', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790954339/Classic_Snickers_Bar_on_Cream_Surface_dznedv.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

INSERT INTO products (id, name, category, description, image, created_at)
VALUES (42, 'KitKat', 'Chocolates', 'Crispy wafer covered in chocolate', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790954240/KitKat_Bar_on_a_Minimal_Cream_Surface_uapcni.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

-- Step 3: Insert or Update Variants (52 items)
INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('0d2ed7df-6466-4429-b43d-b04ebeef60c5', 33, '6 Eggs', 45, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('1-1', 1, '500g', 60, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('1-2', 1, '1kg', 110, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('10-aavin-fullcream', 10, '500 ml - Full Cream Milk', 28, 'In Stock', 'Aavin', 'brand', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946984/Aavin_Premium_Milk_Pouch_ferlqm.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('10-aavin-standardized', 10, '500 ml - Standardized Milk', 25, 'In Stock', 'Aavin', 'brand', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946975/Green_Magic_Milk_Pouch_lb3fdd.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('10-aavin-toned', 10, '500 ml - Toned Milk', 24, 'Out of Stock', 'Aavin', 'brand', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946882/Aavin_Delite_Milk_Pouch_Packshot_dy6ezj.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('10-arokya-fullcream', 10, '500 ml - Full Cream Milk', 42, 'In Stock', 'Arokya', 'brand', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946759/ChatGPT_Image_Oct_2_2026_01_05_22_PM_oqk4yo.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('10-arokya-standardized', 10, '500 ml - Standardized Milk', 37, 'In Stock', 'Arokya', 'brand', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946794/Arokya_Milk_Pouch_in_Pastoral_Packaging_uiziy2.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('10-arokya-toned', 10, '500 ml - Toned Milk', 32, 'In Stock', 'Arokya', 'brand', 'https://res.cloudinary.com/dvg5qjtel/image/upload/v1790946897/Arokya_Toned_Milk_Pouch_on_Pastoral_Packaging_mhbpzx.png', '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('11-1', 11, '400g', 60, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('11-2', 11, '800g', 110, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('175b8475-9f6a-424a-9ad1-2586678b4187', 37, '1 kg', 55, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:12:53.451+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('190ed281-5b02-4ea4-883f-a5491258e02f', 27, '250 ml', 25, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('2-1', 2, '500g', 40, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('2-2', 2, '1kg', 75, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('22-1', 22, '500g', 30, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('22-2', 22, '1kg', 50, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('2b680945-892d-437d-80f3-49b6372674e0', 34, '250 ml', 25, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5-1-1', 5, '1 Box', 80, 'In Stock', 'Box', 'box', NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5-1-2', 5, '2 Boxes', 150, 'In Stock', 'Box', 'box', NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5-2-1', 5, '1 kg', 180, 'In Stock', 'Wholesale', 'wholesale', NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5-2-2', 5, '2 kg', 350, 'In Stock', 'Wholesale', 'wholesale', NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5-2-3', 5, '5 kg', 800, 'Out of Stock', 'Wholesale', 'wholesale', NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5a80ff87-8e06-4fd4-a80d-126e0090c9d0', 27, '1 L', 60, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5d55974e-ea8b-4db1-94ce-d72d07292512', 35, '1 L', 60, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('5star-40', 40, '35 g', 20, 'In Stock', NULL, NULL, NULL, '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('6-1', 6, '500g', 80, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('6-2', 6, '1kg', 150, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('6cea8829-4a40-4993-9a87-392d83bad3d9', 26, '500 ml', 40, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('7-1', 7, 'Bunch (6)', 60, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('7-2', 7, 'Dozen', 110, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('8-1', 8, '500g', 70, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('8-2', 8, '1kg', 130, 'In Stock', NULL, NULL, NULL, '2026-09-27 12:48:13.873697+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('8abef003-f5a3-44ff-85e2-f6f534fd53bd', 26, '250 ml', 25, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('a2367b0e-4d19-41df-b967-09ff80fa4453', 38, '500 g', 25, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:12:53.451+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('a999cdb0-5e9c-43b9-8e88-4ac0e7422eb2', 37, '500 g', 30, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:12:53.451+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('b8980263-6ecf-462c-8618-3efe48cc9d4c', 28, '250 ml', 20, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('bad98da1-cbf4-4cb6-9161-08d99d6c883e', 35, '250 ml', 25, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('be97bee3-af1c-4871-bee3-8910cfd9d788', 38, '1 kg', 45, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:12:53.451+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('c13a3149-e2bc-449c-933f-05686731f37c', 35, '500 ml', 40, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('ca2ac897-1b40-483a-87dd-3faf79e7d5a0', 33, '12 Eggs', 90, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('cbb511f7-a06f-49b2-9a2c-c5d7891e13f4', 26, '1 L', 60, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('d94a6feb-a1ea-40e9-8385-2d339b8d6768', 28, '500 ml', 35, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('def2a73a-d055-4c7f-ad03-43bfba2596c5', 34, '1 L', 60, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('f00821c0-6fe4-4235-a8ab-ddffe730bb7f', 27, '500 ml', 40, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('f1cbcc21-7c9c-410c-84b7-5b732783bc83', 28, '1 L', 55, 'In Stock', NULL, NULL, NULL, '2026-10-01 14:24:45.878835+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('f33716be-6ccc-4b6e-8283-9495195a7df4', 36, '1 kg', 70, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('f64772c9-28ba-4451-b0b1-226732446980', 36, '500 g', 40, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('fda3cfc4-0f50-4fc3-89fc-6ff49503d94a', 34, '500 ml', 40, 'In Stock', NULL, NULL, NULL, '2026-10-01 16:09:23.274461+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('kitkat-42', 42, '18.5 g', 20, 'In Stock', NULL, NULL, NULL, '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('milkybar-39', 39, '21 g', 20, 'In Stock', NULL, NULL, NULL, '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

INSERT INTO variants (id, product_id, name, price, availability, group_name, group_type, image, created_at)
VALUES ('snickers-41', 41, '20 g', 20, 'In Stock', NULL, NULL, NULL, '2026-10-02 16:00:02.733707+00')
ON CONFLICT (id) DO UPDATE SET
  product_id = EXCLUDED.product_id,
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  availability = EXCLUDED.availability,
  group_name = EXCLUDED.group_name,
  group_type = EXCLUDED.group_type,
  image = EXCLUDED.image;

-- Step 4: Safely Synchronize Auto-Increment Sequence for Products (Checks if sequence exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'products_id_seq') THEN
    PERFORM setval('products_id_seq', (SELECT COALESCE(MAX(id), 1) FROM products));
  ELSIF pg_get_serial_sequence('products', 'id') IS NOT NULL THEN
    PERFORM setval(pg_get_serial_sequence('products', 'id'), (SELECT COALESCE(MAX(id), 1) FROM products));
  END IF;
END $$;
