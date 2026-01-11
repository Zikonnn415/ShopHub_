# ShopHub - Modern E-Commerce Platform

A professional, full-featured e-commerce web application built with React, Vite, TailwindCSS, and Supabase.

## 🚀 Features

### User Features
- **User Authentication**: Secure login and registration with Supabase Auth
- **Product Browsing**: Browse products from FakeStore API with beautiful card layouts
- **Shopping Cart**: Add products to cart with Redux state management
- **Responsive Design**: Fully responsive UI that works on all devices
- **User Dashboard**: Personalized dashboard for logged-in users
- **Product Management**: Admin can add and manage products in Supabase

### Pages
- **Home**: Hero section, featured products, and call-to-action
- **Products**: Complete product listing with add-to-cart functionality
- **Cart**: Shopping cart with checkout summary
- **About**: Company information and values
- **Contact**: Contact form with business information
- **Dashboard**: User profile and quick actions
- **Login/Register**: Secure authentication pages

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS 4, Lucide Icons
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Backend**: Supabase (Auth + Database)
- **Form Validation**: React Hook Form + Yup
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Ecom-pra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🗄️ Database Setup

### Supabase Tables

**product_list** table:
```sql
CREATE TABLE product_list (
  ID SERIAL PRIMARY KEY,
  Product_Name TEXT NOT NULL,
  Product_description TEXT,
  Price DECIMAL(10,2) NOT NULL,
  Color TEXT
);
```

## 📁 Project Structure

```
Ecom-pra/
├── src/
│   ├── Pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Cart.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Listing.jsx
│   │   └── ui/
│   ├── layout/          # Layout components
│   │   ├── AuthLayout.jsx
│   │   └── AppLayout.jsx
│   ├── redux/           # Redux store and slices
│   │   ├── store.js
│   │   ├── userSlice.js
│   │   └── cartSlice.js
│   ├── router/          # Routing configuration
│   ├── schema/          # Validation schemas
│   └── context/         # React context
├── public/              # Static assets
└── package.json
```

## 🎨 Key Features Implementation

### Authentication Flow
- Users can register with email, password, and role (customer/admin)
- Login with Supabase authentication
- Protected routes for authenticated users
- Logout functionality with session cleanup

### Shopping Cart
- Add products to cart (requires login)
- View cart with product details
- Quantity management
- Order summary with tax calculation
- Clear cart functionality

### Product Management
- Fetch products from FakeStore API for display
- Admin can add custom products to Supabase
- Real-time product list updates
- Product categorization

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- [ ] Payment gateway integration
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filters
- [ ] Email notifications
- [ ] Admin panel for product management
- [ ] Multi-language support

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@shophub.com or open an issue in the repository.
