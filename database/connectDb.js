const mongoose = require("mongoose");

const dbConnect = async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Connected to database")
    } catch (error) {
        console.log("Error connecting to database")
    }
}

module.exports = dbConnect;