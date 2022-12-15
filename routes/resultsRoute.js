const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Result = require("../models/resultsModel");


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
            success:true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            loading: false,
        });
    }
})
// get all results
router.get("/get-all-results",async(req,res)=>{
    try{
        const results = await Result.find();
        res.status(200).send({
            message:"Results Retrieved SuccessFully",
            success:true,
            data:results,
        }) 
    }catch(error){
        res.status(500).send({
            message:error.message,
            success:false,
        })
    }
});
// get result by id
router.get("/get-result/:resultId",async(req,res)=>{
    try{
        console.log(req.params)
        const result=await Result.find({_id:req.params.resultId})
        res.status(200).send({
            message:"Result retrieved successfully",
            success:true,
            data:result,
        });
    }catch(error){
        res.status(500).send({
            message:error.message,
            success:false,
        })
     }
});
// delete result by id
router.delete('/delete-result/:resultId',authMiddleware,async(req, res) => {
    try {
        const result = await Result.findOneAndDelete({
            resultId: req.params.resultId,
        }
            );
        if (!result) {
           return res.send({
                message:"Result Not Found",
                success:false,
            });
        }
        res.status(200).send({
            message: "Result Deleted Successfully",
            success: true,  
            data:result
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }

});

(module.exports= router);