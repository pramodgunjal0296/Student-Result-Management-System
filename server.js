const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const dotenv=require('dotenv')
dotenv.config();
const dbConfig=require('./config/dbConfig')
dbConfig()
app.use( (req, res, next) => {
    console.log("url : "+req.url)
    next();
});
app.use(express.json());
const employeeRoute = require("./routes/employeeRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");

app.use("/api/employee/",employeeRoute);
app.use("/api/students/",studentRoute);
app.use("/api/results/",resultsRoute);


const port = process.env.PORT || 9898

app.listen(port, () => console.log(`Node JS app listening on port ${port}!`))

