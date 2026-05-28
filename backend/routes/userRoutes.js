const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  getEnrolledCourses,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/enroll/:courseId', protect, enrollInCourse);
router.get('/courses', protect, getEnrolledCourses);

module.exports = router;
