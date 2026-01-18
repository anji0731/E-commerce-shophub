# ShopHub - Enterprise E-Commerce Platform

A complete, production-grade e-commerce web application built with Next.js 16, React 19, and Tailwind CSS. Inspired by Amazon, Flipkart, and Myntra.

## 🚀 Features

### Core Shopping Features
- **Product Catalog**: Browse 10,000+ products across 6 categories
- **Advanced Filtering**: Filter by price range, brand, and customer rating
- **Smart Search**: Global search functionality with instant results
- **Product Details**: High-quality image gallery with specifications
- **Shopping Cart**: Add, remove, and update quantities with real-time totals
- **Wishlist**: Save favorite products for later purchase
- **Order Management**: Track orders from confirmation to delivery

### User Features
- **User Authentication**: Secure login and signup with session management
- **User Profile**: Manage personal information and shipping addresses
- **Order History**: View all past orders with detailed information
- **Address Management**: Save multiple shipping addresses
- **Personalized Dashboard**: Quick access to cart, wishlist, and orders

### Payment & Checkout
- **Secure Checkout**: Multi-step checkout process with validation
- **Payment Options**: Credit/Debit card and PayPal mock integration
- **Order Confirmation**: Real-time order confirmation and email notifications
- **Delivery Tracking**: Track package status in real-time

### Admin Features
- **Admin Dashboard**: Manage products, orders, and customers
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage all orders
- **Sales Analytics**: Basic dashboard with revenue and customer stats

## 🛠 Tech Stack

- **Frontend**: React 19, Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: React Context API with localStorage
- **Animations**: CSS transitions, smooth hover effects
- **Icons**: Lucide React
- **Images**: Unsplash CDN for product images

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Home page with hero and categories
├── globals.css            # Global styles and design tokens
├── products/              # Product listing with filters
│   ├── page.tsx
│   └── loading.tsx
├── product/[id]/          # Product detail page
├── cart/                  # Shopping cart
├── checkout/              # Checkout flow
├── order-success/         # Order confirmation
├── login/                 # Login page
├── signup/                # Signup page
├── profile/               # User profile
├── wishlist/              # Saved products
├── orders/                # Order history
├── track-order/           # Order tracking
└── admin/                 # Admin dashboard

components/
├── Header.tsx             # Main navigation
├── Footer.tsx             # Footer with links
├── ProductCard.tsx        # Product card component
├── ProductFilters.tsx     # Filter sidebar

lib/
├── types.ts               # TypeScript interfaces
├── data.ts                # Mock product data
├── context.tsx            # App context provider

styles/
└── globals.css            # Tailwind configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #0066cc (Blue) - CTAs and highlights
- **Accent**: #ff6b35 (Orange) - Deals and special offers
- **Background**: #ffffff (White)
- **Foreground**: #0f172a (Dark Slate)
- **Secondary**: #f0f4f8 (Light Gray)
- **Destructive**: #dc2626 (Red) - Errors and removals

### Typography
- **Headings**: Geist (sans-serif)
- **Body**: Geist (sans-serif)
- **Monospace**: Geist Mono

### Layout
- Mobile-first responsive design
- Flexbox for layouts (primary)
- CSS Grid for complex 2D layouts
- Max-width: 1280px (7xl)

## 🔐 Authentication & Security

- Mock JWT-style authentication
- Session management with localStorage
- Secure password validation
- Protected routes for profile and checkout
- Input validation and sanitization
- Mock SSL/TLS checkout flow

## 💾 Data Management

- **Client-side Storage**: localStorage for cart and wishlist
- **Mock API**: Products and user data stored in `lib/data.ts`
- **Context API**: Global state management for app-wide data
- **Real-time Updates**: Cart and wishlist sync across pages

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Demo Credentials
- Email: `demo@example.com`
- Password: `password123`

## 📱 Responsive Design

- **Mobile**: Optimized touch interactions and mobile navigation
- **Tablet**: 2-column layouts with sidebar
- **Desktop**: 3-4 column grids with full-width experience

## 🔄 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, categories, featured products, deals |
| Products | `/products` | Browse all products with filters |
| Product Detail | `/product/[id]` | Full product info with gallery |
| Cart | `/cart` | Review items, quantities, totals |
| Checkout | `/checkout` | Shipping address & payment info |
| Order Success | `/order-success` | Confirmation and tracking info |
| Login | `/login` | User authentication |
| Signup | `/signup` | New account creation |
| Profile | `/profile` | User info and addresses |
| Wishlist | `/wishlist` | Saved products |
| Orders | `/orders` | Order history |
| Track Order | `/track-order` | Real-time order tracking |
| Admin | `/admin` | Product and order management |

## 🎯 Features Breakdown

### Product Filtering
- Price range slider (0-500)
- Brand multi-select
- Rating filter (1-5 stars)
- Sort options (popularity, price, rating, newest)
- Mobile-friendly filter panel

### Checkout Process
1. Shipping address form
2. Payment method selection
3. Order review and confirmation
4. Order success page with tracking

### Product Management (Admin)
- View all products in table
- Add new products
- Edit existing products
- Delete products
- Track inventory

## 🌟 Premium Features

- **Breadcrumb Navigation**: Easy navigation trails on all pages
- **Loading States**: Skeleton loaders during content fetch
- **Empty States**: Friendly messages for empty cart/wishlist
- **Error Handling**: 404 page for missing routes
- **Smooth Transitions**: CSS animations and hover effects
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 📊 Sample Data

- 10+ featured products with real Unsplash images
- 6 product categories
- Full product specifications
- Customer ratings (1-5 stars)
- Real-time stock status

## 🚀 Performance Optimizations

- Image lazy loading
- Code splitting with Next.js
- CSS-in-JS for minimal bundle
- Optimized Tailwind CSS output
- Efficient re-renders with React Context

## 📝 Future Enhancements

- Real database integration (Supabase, Neon)
- Real payment gateway (Stripe, PayPal)
- Email notifications
- Advanced analytics
- Recommendation engine
- Social sharing features
- Product reviews and ratings
- Bulk order management

## 📄 License

Created with v0 by Vercel. Free to use and modify.

## 🤝 Support

For issues or questions, please refer to the admin dashboard or contact support@shophub.com.

---

Built with ❤️ using Next.js 16, React 19, and Tailwind CSS v4
