const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const dbConfig = require("./config/dbConfig");
dbConfig();
app.use((req, res, next) => {
  console.log("url : " + req.url);
  next();
});
app.use(express.json());
const employeeRoute = require("./routes/employeeRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");

app.use("/api/employee/", employeeRoute);
app.use("/api/students/", studentRoute);
app.use("/api/results/", resultsRoute);
const path = require("path");

const port = process.env.PORT || 9898;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client/build/index.html"));
  });
}

app.listen(port, () => console.log(`Node JS app listening on port ${port}!`));
