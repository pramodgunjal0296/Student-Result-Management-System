const express =require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Student =require('../models/studentModel');


// add new student
router.post("/add-student", async (req, res) => {
    try {
        const StudentExists = await Student.findOne({
             rollNo: req.body.rollNo,
             });
        if (StudentExists) {
            return res.status(200).send({
                message: "Student already exists",
                success: false,
            });
        }
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(200).send({
            message: "Student added Successfully",
            success: true,  
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }
});

// get all students
router.get("/get-all-students",authMiddleware,async(req,res)=>{
    try {
        const students = await Student.find({
        });
        res.status(200).send({
            message: "Student Fetched Successfully",
            success: true,  
            data:students,
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
});

//get student by roll no for edit
router.get('/get-student/:rollNo', authMiddleware,async(req, res) => {
    try {
        const student =await Student.findOne({
            rollNo:req.params.rollNo,
        });
        if (!student) {
            res.send({
                message:"Student not found",
                success:false,
            })  
        }
        res.status(200).send({
            message:"Student Fetched Successfully",
            success:true,
            data:student,
        });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message,
            success:false,
        });
        
    }

});

//update student
router.post("/update-student/:rollNo",authMiddleware,async(req,res)=>{
    try {
        const student = await Student.findOneAndUpdate(
            {rollNo: req.params.rollNo},
            req.body,
            { new:true} 
            );
        if (!student) {
            return res.send({
                message:"Student Not Found",
                success:false
            });
        }
        console.log(res);
        res.status(200).send({
            message: "Student updated Successfully",
            success: true,  
            data:student
        }
       
        );
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }
});

// delete student
router.delete('/delete-student/:rollNo',authMiddleware,async(req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            rollNo: req.params.rollNo,
        }
            );
        if (!student) {
           return res.send({
                message:"Student Not Found",
                success:false,
            });
        }
        res.status(200).send({
            message: "Student Deleted Successfully",
            success: true,  
            data:student
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }

});

module.exports=router;



