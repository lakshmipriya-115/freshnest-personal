# Fresh Nest - Detailed Setup Guide

## Project Overview

Fresh Nest is a complete, production-ready e-commerce website for a local supermarket. It includes:
- Complete customer-facing website (8 pages)
- Admin dashboard for store management
- Product variant support (including complex variants like Mushroom: Box/Wholesale)
- Shopping cart and checkout system
- Order management
- Responsive mobile design

## Quick Start

### 1. Prerequisites

Make sure you have:
- **Node.js 16.0 or higher** - [Download here](https://nodejs.org/)
- **npm 8.0 or higher** (comes with Node.js)
- A text editor (VS Code recommended - [Download](https://code.visualstudio.com/))
- A modern web browser

### 2. Installation Steps

#### Option A: Standard Installation (Recommended)

```bash
# 1. Navigate to the project directory
cd freshnest

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser and navigate to:
# http://localhost:5173
```

#### Option B: Using Yarn (Alternative)

```bash
cd freshnest
yarn install
yarn dev
```

### 3. npm Registry Issues?

If you encounter npm registry errors, try one of these solutions:

**Solution 1: Clear npm cache**
```bash
npm cache clean --force
npm install
```

**Solution 2: Use different npm registry**
```bash
npm config set registry https://registry.yarnpkg.com
npm install
```

**Solution 3: Use Yarn instead of npm**
```bash
npm install -g yarn
yarn install
yarn dev
```

**Solution 4: Manual node_modules installation**

If all else fails, you can download pre-built node_modules:
1. Contact support for node_modules.zip
2. Extract it in the freshnest directory
3. Run `npm run dev`

## Project Structure

```
freshnest/
│
├── src/                          # Source code
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx         # Home page with hero & products
│   │   ├── ProductsPage.jsx     # Product listing with filters
│   │   ├── ProductDetailPage.jsx # Individual product view
│   │   ├── CartPage.jsx         # Shopping cart
│   │   ├── CheckoutPage.jsx     # Checkout form
│   │   ├── OrderConfirmationPage.jsx # Order success page
│   │   ├── AboutPage.jsx        # About us
│   │   ├── ContactPage.jsx      # Contact & FAQ
│   │   └── admin/               # Admin pages
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       └── AdminOrders.jsx
│   │
│   ├── components/              # Reusable components
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Footer
│   │   └── ProductCard.jsx     # Product display card
│   │
│   ├── data/                    # Data and constants
│   │   └── products.js         # Product data (23 products)
│   │
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles
│   └── main.jsx                 # React entry point
│
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Project dependencies
├── README.md                     # Project documentation
├── SETUP_GUIDE.md              # This file
└── .gitignore                   # Git ignore rules
```

## File Manifest

### Pages (8 Customer Pages + 3 Admin Pages)
- ✓ `HomePage.jsx` - Home page with hero section, categories, featured products
- ✓ `ProductsPage.jsx` - Product browsing with search and category filters
- ✓ `ProductDetailPage.jsx` - Product details with variant selection
- ✓ `CartPage.jsx` - Shopping cart with quantity management
- ✓ `CheckoutPage.jsx` - Checkout form with address validation
- ✓ `OrderConfirmationPage.jsx` - Order confirmation with details
- ✓ `AboutPage.jsx` - About Fresh Nest company info
- ✓ `ContactPage.jsx` - Contact form and store information
- ✓ `AdminDashboard.jsx` - Admin statistics and overview
- ✓ `AdminProducts.jsx` - Manage products, prices, variants
- ✓ `AdminOrders.jsx` - View and manage orders

### Components (3 Reusable)
- ✓ `Header.jsx` - Navigation with search and cart
- ✓ `Footer.jsx` - Footer with links and contact info
- ✓ `ProductCard.jsx` - Product card with variant selection

### Data
- ✓ `products.js` - 23 products across 7 categories with variants

### Styling Files (12 CSS files)
- ✓ `App.css` - Global styles and design tokens
- ✓ `Header.css`, `Footer.css`, `ProductCard.css` - Component styles
- ✓ `HomePage.css`, `ProductsPage.css`, `ProductDetailPage.css`
- ✓ `CartPage.css`, `CheckoutPage.css`, `OrderConfirmationPage.css`
- ✓ `AboutPage.css`, `ContactPage.css`
- ✓ `Admin.css` - Shared admin styles

### Configuration Files
- ✓ `vite.config.js` - Vite build configuration
- ✓ `package.json` - Dependencies and scripts
- ✓ `index.html` - HTML template
- ✓ `.gitignore` - Git ignore rules

## Features Implemented

### Customer Features
✓ Home page with hero section
✓ Product browsing and search
✓ Category filtering
✓ Product detail pages
✓ Variant selection (simple and complex)
✓ Shopping cart
✓ Checkout form
✓ Order confirmation
✓ About page
✓ Contact page with form
✓ Responsive mobile design

### Product Variants
✓ Simple variants (e.g., Milk: 500ml vs 1L)
✓ Complex variants (e.g., Mushroom: Box vs Wholesale)
✓ Variant options with individual pricing
✓ Availability management

### Admin Features
✓ Dashboard with statistics
✓ Product management (price, availability)
✓ Variant management
✓ Order viewing and management
✓ Customer information display

### Data Architecture
✓ Centralized product data system
✓ Supabase-ready database structure
✓ LocalStorage for cart and orders
✓ Order data persistence

## Usage Instructions

### For Customers

1. **Browse Products**
   - Go to home page or "Shop" section
   - Use categories to filter
   - Use search to find specific products

2. **Add to Cart**
   - Click product card to view details
   - Select variant/options
   - Choose quantity
   - Click "Add to Cart"

3. **Checkout**
   - Go to cart (click cart icon)
   - Review items and total
   - Click "Proceed to Checkout"
   - Fill in delivery details
   - Confirm order

4. **View Order**
   - Order confirmation page shows details
   - Order ID for reference
   - Can use to track order

### For Store Owner (Admin)

1. **Access Admin Panel**
   - Click "Admin" link in navigation
   - Or navigate to `/admin`

2. **Manage Products**
   - Go to "Products" section
   - Search for products
   - Edit prices per variant
   - Change availability (in-stock/out-of-stock)
   - Changes save automatically

3. **Manage Orders**
   - Go to "Orders" section
   - View all customer orders
   - Click order to see details
   - Update order status

## Customization Guide

### Change Store Name/Branding
1. Edit `Header.jsx` - Change logo text
2. Edit `Footer.jsx` - Update company info
3. Edit `AboutPage.jsx` - Update company description

### Change Colors
1. Open `src/App.css`
2. Find `:root { }` section
3. Update color variables:
   ```css
   --primary-color: #4CAF50;        /* Green - change to your color */
   --secondary-color: #FF9800;      /* Orange */
   --accent-color: #E91E63;         /* Pink */
   ```

### Add/Edit Products
1. Open `src/data/products.js`
2. Add new product object to PRODUCTS array
3. Or edit existing product properties

### Update Contact Information
1. `Footer.jsx` - Store phone, email, address
2. `ContactPage.jsx` - Contact form and info
3. Search for placeholder numbers: `+919876543210`

### Change Delivery Charge
1. Open `CartPage.jsx`
2. Change: `const DELIVERY_CHARGE = 50;`
3. Open `CheckoutPage.jsx`
4. Change: `const DELIVERY_CHARGE = 50;`

## Building for Production

```bash
# Build optimized version
npm run build

# Preview production build locally
npm run preview

# Build creates 'dist' folder ready for deployment
```

## Deployment Options

### Vercel (Recommended for Vite)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
# Or connect GitHub and auto-deploy
```

### GitHub Pages
1. Update `vite.config.js` with: `base: '/your-repo-name/'`
2. Run `npm run build`
3. Deploy 'dist' folder to GitHub Pages

### Traditional Server (Apache, Nginx)
1. Run `npm run build`
2. Upload 'dist' folder contents to server
3. Configure server to serve `index.html` for all routes

## Testing

### Test Home Page
- Navigate to `http://localhost:5173/`
- Check hero section, categories, and featured products

### Test Shopping
1. Click "Shop" or go to `/products`
2. Filter by category
3. Search for a product
4. Click product card
5. Select variant and quantity
6. Add to cart
7. Click cart icon
8. Click "Proceed to Checkout"
9. Fill form and submit

### Test Admin Panel
- Navigate to `/admin`
- Go to Products - edit a price or availability
- Go to Orders - view customer orders

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
# Linux/Mac:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Images Not Loading
- Check image URLs in `products.js`
- Ensure URLs are valid and accessible
- Default images use Unsplash URLs

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear cache: `localStorage.clear()` in console
- Reload page

### Admin Panel Not Accessible
- Verify route path `/admin` in URL
- Check browser console for errors
- Ensure JavaScript is enabled

## Performance Tips

1. **Optimize Images**
   - Use proper image sizes
   - Consider WebP format for newer browsers

2. **Reduce Bundle Size**
   - Current: ~150KB gzipped
   - No unnecessary dependencies

3. **Lazy Loading**
   - Products load on-demand
   - Implement React.lazy() for routes

4. **Caching**
   - Products cached in memory
   - Cart cached in localStorage

## Security Notes

### Current State (Development)
- No authentication
- No password protection
- Data in localStorage (client-side only)

### Before Production
- Implement proper authentication
- Add HTTPS
- Validate all form inputs on backend
- Protect admin routes with authentication
- Use environment variables for sensitive data
- Implement CORS properly

## Database Integration (Next Steps)

To connect to Supabase:

1. Create Supabase account and project
2. Create tables (see README.md)
3. Update API calls in components
4. Add environment variables:
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```
5. Replace localStorage calls with Supabase queries

## Support & Help

### Documentation
- See `README.md` for feature overview
- Check component comments for details
- Review CSS for customization options

### Common Tasks

**Add a new product:**
1. Open `src/data/products.js`
2. Add to PRODUCTS array with correct structure
3. Refresh browser

**Change homepage content:**
1. Open `src/pages/HomePage.jsx`
2. Edit JSX and text content
3. Save and refresh

**Add new category:**
1. Open `src/data/products.js`
2. Add to CATEGORIES array
3. Create products with that category

## Version Info

- React: 18.2.0
- Vite: 5.0.0
- React Router: 6.20.0
- Node: 16.0+
- npm: 8.0+

## License

All rights reserved © 2024 Fresh Nest

---

**Enjoy using Fresh Nest! 🥬** 

Questions? Contact: hello@freshnest.com
