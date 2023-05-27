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
    const htmlResponse = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hall Booking API</title>
      </head>
      <body>
        <h1>Hall Booking API</h1>
        <p>Welcome! Read the docs in the below link to explore hall booking API</p>
        <a href="https://github.com/Gokulpriyan27/Hall_booking_backend/blob/main/Api%20Documentation.txt">https://github.com/Gokulpriyan27/Hall_booking_backend/blob/main/Api%20Documentation.txt</a>
      </body>
    </html>
  `;
    res.send(htmlResponse)
})

app.use("/api/auth",authRoutes)
app.use("/api/hall",hallRoutes);
app.use("/api/book",bookingRoutes);


const port = process.env.port || 4000

app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})