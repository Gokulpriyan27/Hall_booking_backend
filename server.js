const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const database = require("./database/connectDb")

app.use(express.json());

//db import
database();

//routes import
const hallRoutes = require("./routes/createhall.routes")
const bookingRoutes = require("./routes/booking.routes")
const authRoutes = require("./routes/auth.routes")

app.get("/",(req,res)=>{
    res.send("welcome to hall booking API")
})

app.use("/api/auth",authRoutes)
app.use("/api/hall",hallRoutes);
app.use("/api/book",bookingRoutes);


const port = process.env.port || 4000

app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})