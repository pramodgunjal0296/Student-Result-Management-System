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
app.use("/api/employee/",employeeRoute);
const studentRoute = require("./routes/studentRoute");
app.use("/api/employee/student",studentRoute);


const port = process.env.PORT || 9898

app.listen(port, () => console.log(`Node JS app listening on port ${port}!`))

