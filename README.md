# Jitendra Dhawal Electronics - MERN eCommerce Website

A complete eCommerce website for an electronics shop selling pipes, wires, switches, bulbs, tools, and electrical components.

## Features

- **Frontend**: React.js with Tailwind CSS, responsive design, AOS animations
- **Backend**: Node.js + Express.js with MongoDB
- **Authentication**: JWT-based login/signup with role-based access
- **Admin Panel**: Product management and order handling
- **Shopping Cart**: Add to cart, checkout, order history
- **Product Management**: Categories, search, filtering
- **Contact Form**: EmailJS integration
- **Dark/Light Mode**: Theme toggle
- **SEO**: Meta tags and titles

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Axios, AOS, React Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   ```

### Environment Variables

Copy the `.env.example` file to `.env` in the server directory and update the values:

```bash
cp server/.env.example server/.env
```

Update the following variables in `.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/jitendra_electronics  # For local MongoDB
# OR for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/jitendra_electronics
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_USER_ID=your_emailjs_user_id
```

### Running the Application

1. **Start Backend**:
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Seed Database** (optional, adds sample data):
   ```bash
   cd server
   npm run data:import
   ```

3. **Start Frontend**:
   ```bash
   cd client
   npm start
   ```
   Frontend will run on http://localhost:3000

### Running Both Simultaneously

For development, you can run both frontend and backend together using concurrently:

```bash
npm run dev
```

This will start both the backend server (http://localhost:5000) and frontend (http://localhost:3000) simultaneously.

## Production Deployment (Full Stack)

This repository includes both frontend and backend and can be deployed as two services.

### Option A: Render Blueprint (recommended)

This repo includes `render.yaml` at the root to provision:

- `elec-api` (Node backend from `server/`)
- `elec-client` (Static React frontend from `client/`)

Steps:

1. Push this repository to GitHub.
2. In Render, choose **New +** -> **Blueprint** and connect this repository.
3. Render reads `render.yaml` and creates both services.
4. Set required env vars in Render:
   - Backend (`elec-api`): `MONGO_URI`, `JWT_SECRET`
   - Frontend (`elec-client`): `REACT_APP_API_URL` (example: `https://elec-api.onrender.com`)
5. Trigger deploy for both services after env vars are set.

### Option B: Manual split deploy (Netlify + Render)

1. Deploy backend (`server/`) on a Render Web Service.
2. Deploy frontend (`client/`) on Netlify.
3. In Netlify env vars set `REACT_APP_API_URL=https://<your-render-backend-url>`.
4. Redeploy frontend.

### Frontend env reference

Use `client/.env.example` as reference.

### Alternative Commands

- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend
- `npm run install-all` - Install dependencies for both server and client
- `npm run build` - Build the frontend for production

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `DELETE /api/cart/:id` - Remove item from cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/deliver` - Mark order as delivered (Admin)

## Project Structure

```
/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── seeder.js
│   ├── server.js
│   └── .env
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── tailwind.config.js
├── README.md
└── TODO.md
```

## Sample Data

The seeder adds sample products and users:
- Admin user: admin@example.com / password
- Regular user: user@example.com / password
- 15+ sample electronics products

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
