const mongoose =require("mongoose");

const bookingSchema = new mongoose.Schema({
    hallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hall',
      required: true
    },
    customername:{
      type:String,
      required:true
    },
    customerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
    ,
    bookingSlots: [{
      bookingDate: {
        type: Date,
        required: true
      },
      bookedHours: {
        type: [Number],
        required: true
      }
    }]
  },
  {timestamps:true});

  module.exports = mongoose.model("Booking",bookingSchema)
  