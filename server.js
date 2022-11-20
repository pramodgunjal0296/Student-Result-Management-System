const express = require('express')
const app = express()

const dotenv=require('dotenv')
dotenv.config()

const dbConfig=require('./config/dbConfig')
dbConfig();
app.use(express.json());
const employeeRoute = require("./routes/employeeRoute")
app.use("/api/employee/",employeeRoute);


const port = process.env.PORT || 9898

app.listen(port, () => console.log(`Node JS app listening on port ${port}!`))

