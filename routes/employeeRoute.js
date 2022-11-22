const express = require("express");

const router = express.Router();

const Employee = require('../models/employeeModel');

const bcrypt = require("bcryptjs");


//register new employee

router.post("/register", async (req, res) => {
    try {
        const employeeExists = await Employee.findOne({ employeeId: req.body.employeeId });
        if (employeeExists) {
            return res.status(200).send({
                message: "Employee already exists",
                success: false,
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await  bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword;
    

        const newEmployee = new Employee(req.body)
        await newEmployee.save();
        res.status(200).send({
            message: "Registration Successful,Please wait for admin Approval",
            success: true,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }
})

module.exports = router