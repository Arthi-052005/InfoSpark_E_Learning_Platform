const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a course description'],
    },
    instructor: {
      type: String,
      required: [true, 'Please add an instructor name'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a course price'],
      default: 0,
    },
    duration: {
      type: String,
      required: [true, 'Please add a course duration'],
      default: 'Self-paced',
    },
    category: {
      type: String,
      required: [true, 'Please add a course category'],
      trim: true,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
