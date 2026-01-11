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

## Hardware Requirements

- **Processor**: Dual-core processor or higher
- **Memory**: Minimum 4 GB RAM (8 GB recommended for smoother real-time processing)
- **Internet**: Stable high-speed internet connection for continuous data streaming
- **Audio Equipment**: Microphone and speakers/headset for clear communication
- **Optional**: Webcam for future video-based AI communication

## Software Requirements

- **Operating System**: Windows / macOS / Linux
- **Frontend Framework**: Next.js and React.js
- **Backend Environment**: Node.js with LiveKit Agents SDK
- **Real-time Communication Platform**: LiveKit Server or LiveKit Cloud
- **AI Services**:
   - Deepgram Speech-to-Text
   - Google Gemini LLM
   - Deepgram Text-to-Speech
- **Development Tools**: Visual Studio Code, Postman, Git & GitHub

## Functional Requirements

- **Voice Rooms**: Ability for users to create and join voice rooms (channels) with unique IDs and access control.
- **Real-time Audio Capture & Streaming**: Capture audio from user microphone and stream it in real time to the audio routing service (LiveKit) and STT service.
- **Multi-user Recognition**: Support multiple simultaneous speakers with per-speaker identification and handling for concurrent speech.
- **Instant AI Responses**: Generate AI responses via the STT → LLM → TTS pipeline and play synthesized speech back into the room with minimal latency.
- **STT → LLM → TTS Pipeline**: Seamless integration where Deepgram (STT) transcribes audio, Google Gemini handles the semantic/LLM processing, and Deepgram (TTS) or another TTS provider synthesizes the LLM output.
- **Latency and Reliability**: Low-latency streaming path and retry/queueing for transient failures in any pipeline stage.
- **Role & Access Controls**: Room host and participant roles with basic moderation capabilities (mute/remove users).
- **Logging & Monitoring**: Track session metadata, transcripts, and AI-generated responses for debugging and analytics.

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
