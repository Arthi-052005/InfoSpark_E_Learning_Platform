const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Enroll in a course
// @route   POST /api/users/enroll/:courseId
// @access  Private
const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    // Check if user is already enrolled
    if (course.studentsEnrolled.includes(req.user._id)) {
      res.status(400);
      throw new Error('User is already enrolled in this course');
    }

    // Add user to course enrolled list
    course.studentsEnrolled.push(req.user._id);
    await course.save();

    res.status(200).json({ message: 'Successfully enrolled in course', courseId: course._id });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user enrolled courses
// @route   GET /api/users/courses
// @access  Private
const getEnrolledCourses = async (req, res, next) => {
  try {
    // Find courses where studentsEnrolled includes req.user._id
    const courses = await Course.find({ studentsEnrolled: req.user._id });
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollInCourse,
  getEnrolledCourses,
};
