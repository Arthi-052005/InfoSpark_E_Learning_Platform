const path = require('path');
module.paths.push(path.join(__dirname, '../backend/node_modules'));

const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const Course = require('../backend/models/Course');
const User = require('../backend/models/User');

const seedCourses = [
  {
    title: 'Complete Web Development Bootcamp 2026',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. Build real-world full-stack web applications from scratch.',
    instructor: 'Dr. Angela Smith',
    price: 89.99,
    duration: '42 Hours',
    category: 'Development',
    studentsEnrolled: []
  },
  {
    title: 'UI/UX Design Masterclass: From Theory to Figma',
    description: 'Master Figma and modern design principles. Learn to build design systems, conduct user research, and build premium interactive prototypes.',
    instructor: 'Marcus Holloway',
    price: 64.50,
    duration: '28 Hours',
    category: 'Design',
    studentsEnrolled: []
  },
  {
    title: 'Business Strategy & Leadership Principles',
    description: 'Understand market scaling, financial modeling, team management, and strategic execution. Taught by industry-leading executives.',
    instructor: 'Robert Sterling, MBA',
    price: 49.99,
    duration: '15 Hours',
    category: 'Business',
    studentsEnrolled: []
  },
  {
    title: 'Intro to Machine Learning with Python',
    description: 'Get started with supervised and unsupervised machine learning. Build models using NumPy, Pandas, Scikit-Learn, and TensorFlow.',
    instructor: 'Sarah Chen',
    price: 94.99,
    duration: '12.5 Hours',
    category: 'Development',
    studentsEnrolled: []
  },
  {
    title: 'Mastering Digital Marketing Analytics',
    description: 'Grow your traffic and sales using search engine optimization (SEO), social media marketing, email campaigns, and Google Analytics.',
    instructor: 'Elena Rodriguez',
    price: 49.99,
    duration: '8.2 Hours',
    category: 'Marketing',
    studentsEnrolled: []
  },
  {
    title: 'Advanced Python: From Zero to Hero',
    description: 'Dive deep into Python. Learn decorators, generators, object-oriented programming, threading, and asynchronous programming in depth.',
    instructor: 'Jameson Lock',
    price: 64.99,
    duration: '15 Hours',
    category: 'Development',
    studentsEnrolled: []
  }
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/elearning';
    console.log('Connecting to database for seeding...');
    await mongoose.connect(connStr);
    console.log('MongoDB connected.');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses.');

    // Insert new courses
    await Course.insertMany(seedCourses);
    console.log('Seeded database with initial courses successfully!');

    // Close database connection
    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDB();
