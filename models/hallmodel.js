const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
    hallName: {
      type: String,
      required: true,
      unique: true
    },
    capacity: {
      type: Number,
      required: true
    },
    amenities:{
      type:[String],
      required:true
    },
    price:{
      type:Number,
      required:true
    }
  },
  {timestamps:true});
  
module.exports = mongoose.model("Hall",hallSchema)
