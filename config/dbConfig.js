
const mongoose=require("mongoose")

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection

connection.on('connection',()=>{
    console.log('Mongo DB Connection Successfull')
})

connection.on('error',()=>{
    console.log('mongo DB Connection failed')
})

module.exports = mongoose