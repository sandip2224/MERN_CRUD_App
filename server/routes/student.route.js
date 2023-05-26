const mongoose = require('mongoose')
const express = require('express')

const router = express.Router();

// Student Model
let Student = require('../models/Student');

// CREATE Student
router.route('/create-student')
  .post(async (req, res, next) => {
    const { name, email, roll } = req.body

    try {
      const student = new Student({
        name,
        email,
        roll
      })
      const savedStudent = await student.save()
      res.status(201).json({
        msg: 'Student added successfully!',
        data: savedStudent
      })
    }
    catch (err) {
      return res.status(err.statusCode || 500).json({
        msg: 'Could not create new student!',
        error: err
      });
    }
  });

// READ Students
router.route('/')
  .get(async (req, res) => {
    try {
      const students = await Student.find()
      res.status(200).json({
        msg: 'Students fetched successfully!',
        data: students
      })
    }
    catch (err) {
      return res.status(err.statusCode || 500).json({
        msg: 'Could not fetch students!',
        error: err
      });
    }
  })

// Get Single Student
router.route('/edit-student/:id')
  .get(async (req, res) => {
    const { id } = req.params
    try {
      const student = await Student.findById(id)
      res.status(200).json({
        msg: 'Student details fetched successfully!',
        data: student
      })
    }
    catch (err) {
      return res.status(err.statusCode || 500).json({
        msg: 'Could not fetch student details!',
        error: err
      });
    }
  })

// Update Student
router.route('/update-student/:id')
  .put(async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await Student.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      )


      res.status(200).json({
        msg: 'Student data updated successfully!',
        data: data
      })
    }
    catch (err) {
      return res.status(err.statusCode || 500).json({
        msg: 'Could not update student details!',
        error: err
      });
    }
  })
// Delete Student
router.route('/delete-student/:id')
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await Student.findByIdAndRemove(id)

      res.status(200).json({
        msg: 'Student details deleted successfully!',
        data: data
      })
    }
    catch (err) {
      return res.status(err.statusCode || 500).json({
        msg: 'Unable to delete student data!',
        error: err
      });
    }
  })


module.exports = router;