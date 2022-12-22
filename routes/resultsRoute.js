const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Result = require("../models/resultsModel");
const Student = require("../models/studentModel");

// add new result
router.post("/add-result", async (req, res) => {
  try {
    const resultExists = await Result.findOne({
      examination: req.body.examination,
    });
    if (resultExists) {
      return res.status(200).send({
        message: "Result already exists",
        success: false,
      });
    }
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(200).send({
      message: "Result Added Succesfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      loading: false,
    });
  }
});
// get all results
router.get("/get-all-results", async (req, res) => {
  try {
    const results = await Result.find();
    console.log(results, "result");
    res.status(200).send({
      message: "Results Retrieved SuccessFully",
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});
// get result by id
router.get("/get-result/:resultId", async (req, res) => {
  try {
    const result = await Result.findOne({ _id: req.params.resultId });
    console.log(result, "result :");
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});
// add student result
router.post("/save-student-result", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.body.studentId });
    console.log(student, "student :");
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    let newResults = student.results;
    const existingResults = student.results;
    const resultExists = existingResults.find(
      (result) => result.resultId === req.body.resultId
    );
    if (resultExists) {
      newResults = existingResults.map((result) => {
        if (result.resultId === req.body.resultId) {
          return {
            ...result,
            obtainedMarks: req.body.obtainedMarks,
            verdict: req.body.verdict,
          };
        }
        return result;
      });
    } else {
      newResults = [...existingResults, req.body];
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.body.studentId,
      {
        results: newResults,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Result Added Successfully",
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});
// add student result by id
router.get("/get-student-result", async (req, res) => {
  try {
    let condition = {};
    if (req.query.studentId) {
      condition = { studentId: req.query.studentId };
    }
    const student = await Student.findOne(condition);
    console.log(student)
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      })
    }
    let newResults = student.results;
    const existingResults = student.results;
    
    const resultExists = student.results.find(
      (result) => result.resultId === req.body.resultId
    );
    if (resultExists) {
      newResults = existingResults.map((result) => {
        if (result.resultId === req.body.resultId) {
          return {
            ...result,
            obtainedMarks: req.body.obtainedMarks,
            verdict: req.body.verdict,
          };
        }
        return result;
      });
    }
    else{
      newResults = [...existingResults, req.body];
    }
    if (!resultExists) {
      return res.status(200).send({
        message: "Result not found",
        success: false,
      })
    }
    res.status(200).send({
      message: "Resullt retrieved successFully",
      success: true,
      data: {
         ...resultExists,
        studentId: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
      },
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});
// delete result by id
router.delete("/delete-result/:resultId", authMiddleware, async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({
      resultId: req.params.resultId,
    });
    if (!result) {
      return res.send({
        message: "Result Not Found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Result Deleted Successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
