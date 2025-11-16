const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

connectDB();

const products = [
  {
    name: 'Copper Pipe 1/2 inch',
    description: 'High-quality copper pipe for plumbing applications',
    price: 25.99,
    category: 'Pipes',
    image: '/images/copper-pipe.jpg',
    stock: 50,
  },
  {
    name: 'PVC Pipe 2 inch',
    description: 'Durable PVC pipe for various construction needs',
    price: 15.49,
    category: 'Pipes',
    image: '/images/pvc-pipe.jpg',
    stock: 100,
  },
  {
    name: 'Copper Pipe 3/4 inch',
    description: 'High-quality copper pipe for plumbing applications',
    price: 28.99,
    category: 'Pipes',
    image: '/images/copper-pipe-34.jpg',
    stock: 45,
  },
  {
    name: 'PVC Pipe 1 inch',
    description: 'Durable PVC pipe for various construction needs',
    price: 12.49,
    category: 'Pipes',
    image: '/images/pvc-pipe-1.jpg',
    stock: 120,
  },
  {
    name: 'PVC Pipe 3 inch',
    description: 'Durable PVC pipe for various construction needs',
    price: 20.99,
    category: 'Pipes',
    image: '/images/pvc-pipe-3.jpg',
    stock: 80,
  },
  {
    name: 'Galvanized Steel Pipe 1 inch',
    description: 'Strong galvanized steel pipe for industrial use',
    price: 18.99,
    category: 'Pipes',
    image: '/images/steel-pipe-1.jpg',
    stock: 60,
  },
  {
    name: 'Galvanized Steel Pipe 2 inch',
    description: 'Strong galvanized steel pipe for industrial use',
    price: 25.99,
    category: 'Pipes',
    image: '/images/steel-pipe-2.jpg',
    stock: 50,
  },
  {
    name: 'Electrical Wire 14 Gauge',
    description: 'Copper electrical wire for residential wiring',
    price: 45.99,
    category: 'Wires',
    image: '/images/electrical-wire.jpg',
    stock: 75,
  },
  {
    name: 'Electrical Wire 12 Gauge',
    description: 'Thicker copper electrical wire for heavy-duty applications',
    price: 55.99,
    category: 'Wires',
    image: '/images/electrical-wire-12.jpg',
    stock: 60,
  },
  {
    name: 'Electrical Wire 16 Gauge',
    description: 'Copper electrical wire for light residential wiring',
    price: 35.99,
    category: 'Wires',
    image: '/images/electrical-wire-16.jpg',
    stock: 90,
  },
  {
    name: 'Coaxial Cable 50ft',
    description: 'Coaxial cable for TV and internet connections',
    price: 29.99,
    category: 'Wires',
    image: '/images/coaxial-cable.jpg',
    stock: 40,
  },
  {
    name: 'Ethernet Cable Cat6 100ft',
    description: 'High-speed Ethernet cable for networking',
    price: 39.99,
    category: 'Wires',
    image: '/images/ethernet-cable.jpg',
    stock: 35,
  },
  {
    name: 'LED Bulb 9W',
    description: 'Energy-efficient LED bulb with warm white light',
    price: 8.99,
    category: 'Lights',
    image: '/images/led-bulb.jpg',
    stock: 200,
  },
  {
    name: 'LED Bulb 15W',
    description: 'Energy-efficient LED bulb with cool white light',
    price: 12.99,
    category: 'Lights',
    image: '/images/led-bulb-15w.jpg',
    stock: 150,
  },
  {
    name: 'Fluorescent Tube 4ft',
    description: 'Fluorescent tube light for offices and homes',
    price: 9.99,
    category: 'Lights',
    image: '/images/fluorescent-tube.jpg',
    stock: 100,
  },
  {
    name: 'Halogen Bulb 50W',
    description: 'Halogen bulb for bright lighting',
    price: 6.99,
    category: 'Lights',
    image: '/images/halogen-bulb.jpg',
    stock: 120,
  },
  {
    name: 'Ceiling Fan 48 inch',
    description: 'Energy-efficient ceiling fan with remote control',
    price: 89.99,
    category: 'Fans',
    image: '/images/ceiling-fan.jpg',
    stock: 25,
  },
  {
    name: 'Table Fan',
    description: 'Portable table fan for personal cooling',
    price: 24.99,
    category: 'Fans',
    image: '/images/table-fan.jpg',
    stock: 50,
  },
  {
    name: 'Exhaust Fan 12 inch',
    description: 'Exhaust fan for ventilation in bathrooms and kitchens',
    price: 49.99,
    category: 'Fans',
    image: '/images/exhaust-fan.jpg',
    stock: 30,
  },
  {
    name: 'One-Way Switch',
    description: 'Standard one-way electrical switch',
    price: 3.49,
    category: 'Switches',
    image: '/images/one-way-switch.jpg',
    stock: 150,
  },
  {
    name: 'Two-Way Switch',
    description: 'Two-way electrical switch for staircase lighting',
    price: 5.99,
    category: 'Switches',
    image: '/images/two-way-switch.jpg',
    stock: 120,
  },
  {
    name: 'Dimmer Switch',
    description: 'Dimmer switch for adjustable lighting',
    price: 12.99,
    category: 'Switches',
    image: '/images/dimmer-switch.jpg',
    stock: 80,
  },
  {
    name: 'Bell Push Switch',
    description: 'Bell push switch for doorbells',
    price: 4.99,
    category: 'Switches',
    image: '/images/bell-push-switch.jpg',
    stock: 100,
  },
  {
    name: 'Wire Cutter Pliers',
    description: 'Professional wire cutting and stripping tool',
    price: 18.99,
    category: 'Tools',
    image: '/images/wire-cutter.jpg',
    stock: 30,
  },
  {
    name: 'Multimeter Digital',
    description: 'Digital multimeter for electrical measurements',
    price: 35.99,
    category: 'Tools',
    image: '/images/multimeter.jpg',
    stock: 25,
  },
  {
    name: 'Screwdriver Set',
    description: 'Set of insulated screwdrivers for electrical work',
    price: 22.99,
    category: 'Tools',
    image: '/images/screwdriver-set.jpg',
    stock: 40,
  },
  {
    name: 'Cable Tester',
    description: 'Tool for testing electrical cables and connections',
    price: 29.99,
    category: 'Tools',
    image: '/images/cable-tester.jpg',
    stock: 20,
  },
  {
    name: 'Garden Hose Pipe 50ft',
    description: 'Flexible hose pipe for gardening and irrigation',
    price: 19.99,
    category: 'Agri Tools',
    image: '/images/garden-hose.jpg',
    stock: 70,
  },
  {
    name: 'Sprinkler System Kit',
    description: 'Complete sprinkler kit for lawn irrigation',
    price: 79.99,
    category: 'Agri Tools',
    image: '/images/sprinkler-kit.jpg',
    stock: 15,
  },
  {
    name: 'Manual Plough',
    description: 'Traditional manual plough for small-scale farming',
    price: 49.99,
    category: 'Agri Tools',
    image: '/images/manual-plough.jpg',
    stock: 10,
  },
  {
    name: 'Irrigation Pump 1HP',
    description: 'Electric irrigation pump for water supply',
    price: 149.99,
    category: 'Agri Tools',
    image: '/images/irrigation-pump.jpg',
    stock: 8,
  },
  {
    name: 'Extension Cord 10m',
    description: 'Heavy-duty extension cord with multiple sockets',
    price: 22.99,
    category: 'Others',
    image: '/images/extension-cord.jpg',
    stock: 40,
  },
  {
    name: 'Conduit Pipe 1 inch',
    description: 'Electrical conduit pipe for cable protection',
    price: 12.99,
    category: 'Pipes',
    image: '/images/conduit-pipe.jpg',
    stock: 80,
  },
  {
    name: 'Ceiling Fan Regulator',
    description: 'Speed regulator for ceiling fans',
    price: 7.49,
    category: 'Switches',
    image: '/images/fan-regulator.jpg',
    stock: 60,
  },
  {
    name: 'Solar Panel 100W',
    description: '100W solar panel for renewable energy applications',
    price: 149.99,
    category: 'Others',
    image: '/images/solar-panel.jpg',
    stock: 15,
  },
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@jitendradhawal.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // bcrypt hash for 'password'
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // bcrypt hash for 'password'
    role: 'user',
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await Product.insertMany(products);
    await User.insertMany(users);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
