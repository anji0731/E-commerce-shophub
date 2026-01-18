# ShopHub Routes Documentation

## Public Routes (No Authentication Required)

### Storefront
- `/` - Home page with hero, categories, featured products, and deals
- `/products` - Product listing with filtering, sorting, and search
- `/product/[id]` - Individual product detail page with image gallery
- `/search?q=[query]` - Search results page
- `/login` - User login page
- `/signup` - User registration page
- `/track-order` - Order tracking without login
- `/404` - Error page for missing routes

### Static Pages
- `/about` - About ShopHub
- `/contact` - Contact us page
- `/faq` - Frequently asked questions
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Protected Routes (Authentication Required)

### User Pages
- `/profile` - User profile with account information
- `/profile/edit` - Edit profile information
- `/cart` - Shopping cart with items
- `/checkout` - Secure checkout flow
- `/order-success` - Order confirmation page
- `/orders` - Order history and list
- `/orders/[id]` - Individual order details
- `/wishlist` - Saved wishlist items
- `/wishlist/[id]` - Wishlist item detail

## Admin Routes

### Dashboard
- `/admin` - Admin dashboard overview
- `/admin/products` - Product management
- `/admin/products/new` - Add new product
- `/admin/products/[id]/edit` - Edit product
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/analytics` - Sales analytics

## Query Parameters

### Product Listing
- `/products?category=[name]` - Filter by category
- `/products?search=[query]` - Search products
- `/products?price_min=0&price_max=500` - Price filter
- `/products?brand=[name]` - Brand filter
- `/products?rating=4` - Rating filter
- `/products?sort=price-low` - Sort options (price-low, price-high, popularity, newest, rating)

### Orders
- `/orders?status=pending` - Filter by status
- `/orders?month=01&year=2024` - Date filter

## Page Details

### Home Page (`/`)
```
GET /
Description: Landing page with hero section, categories, featured products
Components: Header, Hero, CategoryCards, ProductGrid, TrustBadges, CTA
Data: products, categories
```

### Products Page (`/products`)
```
GET /products?category=Electronics&sort=popularity
Description: Product listing with advanced filtering
Components: Header, Breadcrumb, Sidebar Filters, Product Grid
Query Params: category, search, price_min, price_max, brand, rating, sort
```

### Product Detail (`/product/:id`)
```
GET /product/1
Description: Individual product page with full details
Components: Header, Breadcrumb, ImageGallery, ProductInfo, Specifications, RelatedProducts
Params: id (product ID)
```

### Cart Page (`/cart`)
```
GET /cart
Description: Shopping cart with item management
Components: Header, CartItems, OrderSummary, ContinueShopping
Auth: Required
Actions: Add quantity, Remove item, Apply coupon
```

### Checkout Page (`/checkout`)
```
POST /checkout
Description: Multi-step checkout process
Components: Header, ShippingForm, PaymentForm, OrderReview
Auth: Required
Steps: Address → Payment → Review → Confirmation
```

### Order Success (`/order-success`)
```
GET /order-success
Description: Order confirmation after successful payment
Components: Header, SuccessMessage, OrderDetails, Timeline
Data: orderId, estimatedDelivery
```

### Authentication Pages
```
POST /login
POST /signup
Description: User authentication
Components: Header, AuthForm, SocialLogin (future)
Redirects: /products (on success)
```

### User Profile (`/profile`)
```
GET /profile
POST /profile (updates)
Description: User account management
Components: Header, ProfileInfo, AddressManager, QuickLinks
Auth: Required
```

### Wishlist (`/wishlist`)
```
GET /wishlist
Description: User's saved products
Components: Header, WishlistGrid, ProductCards
Auth: Required
```

### Orders (`/orders`)
```
GET /orders
GET /orders/[id]
Description: Order history and details
Components: Header, OrdersList, OrderDetail, Timeline
Auth: Required
```

### Track Order (`/track-order`)
```
GET /track-order
POST /track-order
Description: Track order without login
Components: Header, SearchForm, TrackingTimeline
Auth: Not required
```

### Admin Dashboard (`/admin`)
```
GET /admin
Description: Admin overview with stats
Components: Header, Stats, RecentOrders, ProductManagement
Auth: Required (Admin only)
```

## API Endpoints (Mock)

### Products
```
GET /api/products - List all products
GET /api/products?category=Electronics - Filter by category
GET /api/products/[id] - Get single product
POST /api/products - Create product (Admin)
PUT /api/products/[id] - Update product (Admin)
DELETE /api/products/[id] - Delete product (Admin)
```

### Orders
```
GET /api/orders - List user orders
GET /api/orders/[id] - Get order details
POST /api/orders - Create new order
PUT /api/orders/[id] - Update order status
```

### Users
```
POST /api/auth/login - Login user
POST /api/auth/signup - Register user
POST /api/auth/logout - Logout user
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update profile
```

### Cart (Client-side)
```
GET /cart - Get cart items
POST /cart/add - Add to cart
DELETE /cart/[id] - Remove from cart
PUT /cart/[id] - Update quantity
```

### Wishlist (Client-side)
```
GET /wishlist - Get wishlist items
POST /wishlist/add - Add to wishlist
DELETE /wishlist/[id] - Remove from wishlist
```

## Redirects

- `/login` → `/` (if already logged in)
- `/checkout` → `/login` (if not authenticated)
- `/profile` → `/login` (if not authenticated)
- `/admin` → `/login` (if not authenticated)
- `/admin` → `/` (if not admin)

## Error Handling

- `404` - Page not found (custom 404.tsx)
- `401` - Unauthorized (redirect to /login)
- `403` - Forbidden (redirect to /)
- `500` - Server error (error page)

## Navigation Flow

```
Home (/)
├── Products (/products)
│   ├── Product Detail (/product/[id])
│   │   └── Add to Cart → Cart (/cart)
│   │       └── Checkout (/checkout)
│   │           └── Order Success (/order-success)
│   └── Add to Wishlist → Wishlist (/wishlist)
├── Login (/login)
│   └── Signup (/signup)
└── User Menu
    ├── Profile (/profile)
    ├── Orders (/orders)
    └── Logout
```

## Development Notes

### Protected Route Pattern
```typescript
export default function Page() {
  const { isLoggedIn } = useApp();
  
  if (!isLoggedIn) {
    return <LoginPrompt />;
  }
  
  return <ProtectedContent />;
}
```

### Dynamic Routes
- Product pages use `/product/[id]` pattern
- Order details use `/orders/[id]` pattern
- Query params for filtering (e.g., `?category=Electronics`)

### Breadcrumb Pattern
All pages include breadcrumb navigation showing the current location in the site hierarchy.

### Loading States
- Suspense boundaries for async operations
- Skeleton loaders for product listings
- Loading indicators for form submissions

---

Last Updated: January 2024
ShopHub E-Commerce Platform v1.0
