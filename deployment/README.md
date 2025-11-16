# Deployment Guide for Jitendra Dhawal Electronics

## Backend Deployment (Node.js + Express + MongoDB)

### Option 1: Render (Recommended)
1. **Create a Render account** at https://render.com
2. **Connect your GitHub repository** to Render
3. **Create a new Web Service**:
   - Select your repository
   - Set build command: `npm install`
   - Set start command: `npm start`
4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRE=30d
   ```
5. **Deploy** - Render will automatically deploy your backend

### Option 2: Railway
1. **Create a Railway account** at https://railway.app
2. **Connect your GitHub repository**
3. **Add environment variables** in the Railway dashboard
4. **Deploy** - Railway will handle the rest

## Frontend Deployment (React)

### Option 1: Vercel (Recommended)
1. **Create a Vercel account** at https://vercel.com
2. **Connect your GitHub repository**
3. **Deploy the client folder**:
   - Set root directory to `client`
   - Build command: `npm run build`
   - Output directory: `build`
4. **Set Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
5. **Deploy** - Vercel will build and deploy your React app

### Option 2: Netlify
1. **Create a Netlify account** at https://netlify.com
2. **Drag and drop the `client/build` folder** or connect GitHub
3. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Add environment variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

## Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas account** at https://cloud.mongodb.com
2. **Create a new cluster** (free tier available)
3. **Create database user** and whitelist your IP
4. **Get connection string** and update your backend environment variables

## Environment Configuration

### Backend (.env file):
```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jitendra_electronics
JWT_SECRET=your_super_secure_random_string_here
JWT_EXPIRE=30d
```

### Frontend Environment Variable:
In your React app, create/update `client/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

## Post-Deployment Steps

1. **Update API calls** in your React app to use the production backend URL
2. **Test all functionality**:
   - User registration/login
   - Product browsing and search
   - Add to cart and checkout
   - Admin panel functionality
   - Order management
3. **Seed the database** if needed:
   ```bash
   # Run this on your local machine with production DB connection
   cd server
   npm run data:import
   ```
4. **Set up custom domain** (optional) on your hosting platform

## Sample Deployment URLs
- Backend: `https://jitendra-electronics-api.onrender.com`
- Frontend: `https://jitendra-electronics.vercel.app`

## Troubleshooting
- Ensure all environment variables are set correctly
- Check that MongoDB Atlas IP whitelist includes `0.0.0.0/0` for production
- Verify CORS settings in your backend for the frontend domain
- Test API endpoints using tools like Postman with production URLs
