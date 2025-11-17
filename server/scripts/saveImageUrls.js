const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('../config/database');
const Product = require('../models/Product');

dotenv.config();

connectDB();

const saveImageUrls = async () => {
  try {
    const products = await Product.find({}, 'image');
    const imageUrls = products.map(product => product.image);

    const filePath = path.join(__dirname, 'imageUrls.txt');
    fs.writeFileSync(filePath, imageUrls.join('\n'), 'utf8');

    console.log('Image URLs saved to imageUrls.txt');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

saveImageUrls();
