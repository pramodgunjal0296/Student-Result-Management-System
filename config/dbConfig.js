
// const mongoose=require("mongoose")

// mongoose.connect(process.env.mongo_url)

// const connection = mongoose.connection

// connection.on('connection',()=>{
//     console.log('Mongo DB Connection Successfull')
// })

// connection.on('error',()=>{
//     console.log('mongo DB Connection failed')
// })

// module.exports = mongoose

const mongoose = require("mongoose");
module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(" MongoDB connection created");
    } catch (error) {
        console.log(error.message);
    }
};