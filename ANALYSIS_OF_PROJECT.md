# Jitendra Dhawal Electronics – MERN eCommerce Platform

## ABSTRACT

The electronics retail market demands seamless digital experiences that integrate product discovery, secure transactions, and efficient inventory management. Traditional eCommerce platforms often lack real-time inventory updates, intuitive user interfaces, and scalable backend architectures, limiting customer engagement and operational efficiency. This project presents a comprehensive MERN (MongoDB, Express.js, React, Node.js) stack eCommerce platform specifically designed for electronics retail, enabling customers to browse, search, and purchase electrical components, tools, and supplies with ease. The platform features role-based access control (customer/admin), real-time cart management, secure JWT-based authentication, and an intuitive admin dashboard for product and order management. Key capabilities include product categorization, advanced search and filtering, checkout with order tracking, and responsive design optimized for mobile and desktop users. The modular architecture supports future enhancements such as payment gateway integration (Stripe/PayPal), email notifications, advanced analytics, recommendation systems, and multi-language support.

This project aligns with the United Nations Sustainable Development Goals (SDGs), particularly SDG 9 (Industry, Innovation, and Infrastructure) by leveraging modern web technologies for digital commerce, SDG 8 (Decent Work and Economic Growth) by enabling small businesses to scale their retail operations, SDG 10 (Reduced Inequalities) by providing accessible online platforms for underserved markets, and SDG 12 (Responsible Consumption and Production) by enabling efficient inventory management and product information dissemination. By delivering a scalable, user-centric eCommerce solution, the platform promotes innovation in digital business infrastructure and supports economic growth in the electronics retail sector.

---

## 1. Project Overview
This project is a full-stack e-commerce application for "Jitendra Dhawal Electronics", an electronics and hardware store. It includes a backend REST API server using Node.js with Express and MongoDB and a frontend React.js single-page application using React Router and Context API for state management.

---

## 2. Technology Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose ODM), JWT for authentication, REST API architecture.
- **Frontend:** React.js, react-router-dom for routing, React Context API for auth & cart state, Tailwind CSS for styling, react-toastify for notifications, react-icons for UI icons.
- **Authentication:** JWT token-based with role-based access control middleware.
- **Other:** dotenv for environment variables, AOS for scroll animations, and Axios for HTTP client on frontend.

---

## 3. Backend Structure
- `server/server.js`: Main Express server entry point. Configures middlewares, connects to MongoDB, and mounts all API routes.
- `server/config/database.js`: Handles MongoDB connection setup.
- `server/models/`: Contains Mongoose data models:
  - `User.js`: Defines User schema
  - `Product.js`: Defines product information schema with categories and stock
  - `Order.js`: Defines order with references to user and products along with order, payment, and shipping information
  - `Cart.js`: User cart schema storing items and total price
- `server/controllers/`: Implements API controller logic for different domains:
  - `users.js`: User authentication and management
  - `products.js`: Product CRUD and listing
  - `cart.js`: Cart management (Add, remove, update items)
  - `orders.js`: Order processing and status management
- `server/routes/`: Defines Express routes with authentication middleware:
  - `users.js`, `products.js`, `cart.js`, `orders.js`
- `server/middleware/auth.js`: Middleware to protect routes by verifying JWT token and authorizing user roles.
- `server/seeder.js`: Script for populating initial data (assumed).
- `server/scripts/saveImageUrls.js`: Utility or script related to image URLs handling.

---

## 4. Frontend Structure
- `client/src/App.js`: Root React component sets up React Router routes, protected & public routes, wraps app in Authentication and Cart Context providers, configures toast notifications.
- `client/src/context/`:
  - `AuthContext.js`: Manages current user state and authentication methods; interacts with backend auth endpoints.
  - `CartContext.js`: Manages shopping cart state, with CRUD methods communicating with backend cart APIs.
- `client/src/components/`: UI components like `Header.js`, `Footer.js`, `ProductCard.js`.
- `client/src/pages/`: React Router pages for app views:
  - `Home.js`: Home page with featured products, hero section, and company information.
  - `Shop.js`: Shop product listing
  - `ProductDetails.js`: Product detail view
  - `Login.js`, `Signup.js`: Authentication pages
  - `Cart.js`, `Checkout.js`: Cart and purchase flow
  - `Profile.js`, `AdminDashboard.js`: User profile and administrative dashboard
- Styling done primarily with Tailwind CSS configured in `client/tailwind.config.js`.
- Static assets in `client/public/`.
- React animations handled using AOS package.

---

## 5. Application Flow Highlights
- Backend provides REST endpoints protected by JWT middleware.
- Frontend interacts with backend APIs using Axios, handling token automatically via Context API.
- Shopping cart manages its state client-side and synchronizes with backend.
- Orders are placed and tracked with detailed status.
- Admin dashboard presumably manages products/orders/users (not explored in detail here).
- Frontend routes support protected (authenticated) and public access, with redirects.

---

---

## 7. Summary
This is a well-structured modern MERN-style e-commerce web application with:
- Secure authentication and role-based access.
- Clean separation of API controllers and routes.
- React frontend with rich feature pages, global state contexts, and styled with Tailwind.
- Integration for shopping cart, order management, and user profiles.

---

This comprehensive analysis should help in understanding code structure, responsibilities, technologies, and flow within the entire folder.
