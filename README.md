# Fresh Nest - Local Supermarket E-Commerce Website

A complete, modern e-commerce website for a local supermarket built with React, Vite, and responsive design.

## Features

### Customer Features
- ✓ Home page with hero section and product showcases
- ✓ Complete product browsing and filtering
- ✓ Product categories (Vegetables, Fruits, Dairy, Beverages, etc.)
- ✓ Detailed product pages with variant selection
- ✓ Special variant support (e.g., Mushroom: Box vs Wholesale)
- ✓ Shopping cart with quantity management
- ✓ Checkout with customer information
- ✓ Order confirmation page
- ✓ About Us page
- ✓ Contact page with inquiry form
- ✓ Responsive mobile design
- ✓ Search and filter functionality

### Admin Features
- ✓ Admin dashboard with statistics
- ✓ Product management (add, edit, delete)
- ✓ Price management per variant
- ✓ Availability management (in-stock/out-of-stock)
- ✓ Variant management for complex products
- ✓ Order management and tracking
- ✓ Customer information viewing

### Technical Features
- ✓ Reusable React components
- ✓ Clean routing with React Router
- ✓ Centralized product data system
- ✓ LocalStorage for cart and order persistence
- ✓ Supabase-ready data architecture
- ✓ Professional CSS with design tokens
- ✓ Mobile-first responsive design
- ✓ No external dependencies (minimal setup)

## Project Structure

```
freshnest/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       └── AdminOrders.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Navigate to project directory**
   ```bash
   cd freshnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage Guide

### Shopping
1. Browse products on the home page or shop page
2. Use category filters and search to find products
3. Click on a product for detailed view
4. Select variant and quantity
5. Add to cart
6. Proceed to checkout
7. Enter delivery details
8. Confirm order

### Admin Panel
1. Navigate to `/admin`
2. View dashboard statistics
3. Go to "Products" to manage:
   - Product prices
   - Availability (in-stock/out-of-stock)
   - Variants and options
4. Go to "Orders" to view and manage customer orders

## Product Data Structure

### Simple Product
```javascript
{
  id: 1,
  name: 'Organic Tomatoes',
  category: 'Fresh Vegetables',
  description: 'Fresh, ripe organic tomatoes',
  image: 'url',
  variants: [
    { id: '1-1', name: '500g', price: 60, availability: 'In Stock' },
    { id: '1-2', name: '1kg', price: 110, availability: 'In Stock' }
  ]
}
```

### Complex Product (with options)
```javascript
{
  id: 5,
  name: 'Mushrooms',
  category: 'Fresh Vegetables',
  variants: [
    {
      id: '5-1',
      name: 'Box',
      options: [
        { id: '5-1-1', name: '1 Box', price: 80, availability: 'In Stock' },
        { id: '5-1-2', name: '2 Boxes', price: 150, availability: 'In Stock' }
      ]
    },
    {
      id: '5-2',
      name: 'Wholesale',
      options: [
        { id: '5-2-1', name: '1 kg', price: 180, availability: 'In Stock' },
        { id: '5-2-2', name: '2 kg', price: 350, availability: 'In Stock' }
      ]
    }
  ]
}
```

## Customization Guide

### Colors & Branding
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary-color: #4CAF50;
  --secondary-color: #FF9800;
  /* ... more colors ... */
}
```

### Products
Edit `src/data/products.js` to:
- Add/remove products
- Change prices
- Update categories
- Modify variants
- Add product images

### Content
- Edit store information in `Footer.jsx`
- Update contact details in `ContactPage.jsx`
- Customize about page in `AboutPage.jsx`

## Database Integration (Supabase Ready)

The project is structured to easily connect to Supabase. Expected tables:

```sql
-- Products table
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(255),
  description TEXT,
  image VARCHAR(255),
  availability VARCHAR(50)
);

-- Variants table
CREATE TABLE product_variants (
  id VARCHAR(50) PRIMARY KEY,
  product_id INTEGER,
  variant_name VARCHAR(255),
  price INTEGER,
  availability VARCHAR(50)
);

-- Orders table
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(255),
  phone VARCHAR(20),
  delivery_address TEXT,
  landmark VARCHAR(255),
  subtotal INTEGER,
  delivery_charge INTEGER,
  total INTEGER,
  created_at TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id VARCHAR(50),
  product_id INTEGER,
  variant_id VARCHAR(50),
  quantity INTEGER,
  price INTEGER
);
```

## Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### Other platforms
Built with Vite - deploy the `dist` folder after running `npm run build`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Features

- Optimized images with responsive sizing
- CSS variables for faster rendering
- Minimal dependencies
- Efficient React component structure
- Local storage for client-side state

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Supabase database integration
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Order tracking with real-time updates
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Promotional codes and discounts
- [ ] Multi-language support
- [ ] Admin analytics dashboard

## Known Limitations

- Data persists in browser localStorage only
- No real payment processing (Pay on Delivery only)
- Admin features are basic (no real authentication)
- Images are from external sources (Unsplash)

## Support

For issues or questions, contact Fresh Nest:
- Phone: +91 98765 43210
- Email: hello@freshnest.com
- WhatsApp: https://wa.me/919876543210

## License

All rights reserved © 2024 Fresh Nest

## Credits

Built with:
- React 18
- Vite 5
- React Router 6
- CSS3

Images courtesy of Unsplash

---

**Happy Grocery Shopping! 🥬🍎🥕**
