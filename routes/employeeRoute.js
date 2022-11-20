const express = require("express");

const router = express.Router();

const Employee = require('../models/employeeModel');


//register new employee

router.post("/register", async (req, res) => {
    try {
        const employeeExists = await Employee.findOne({
            employeeId: req.body.employeeId,
        });
        if (employeeExists) {
            return res.status(200).send({
                message: "Employee already exists",
                success: false,
            });
        }

        const newEmployee = new Employee(req.body)
        await newEmployee.save();
        res.status(200).send({
            message: "Registartion Successful,Please wait for admin Approval",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})