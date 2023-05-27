const Booking = require("../models/booking.model");
const Hall=require("../models/hallmodel")

const bookHall = async (req, res) => {
    try {
      const { hallId, bookingSlots } = req.body;
  
      // Checking availability
      const existingBooking = await Booking.findOne({
        hallId,
        $or: bookingSlots.map(slot => ({ 'bookingSlots.bookingDate': slot.bookingDate }))
      });
  
      if (existingBooking) {
        for (let i = 0; i < bookingSlots.length; i++) {
          const { bookingDate, bookedHours } = bookingSlots[i];
          const existingSlots = existingBooking.bookingSlots.find(
            slot => slot.bookingDate.getTime() === new Date(bookingDate).getTime()
          );
          if (existingSlots) {
            const existingHours = bookedHours.filter(hour => existingSlots.bookedHours.includes(hour));
            if (existingHours.length > 0) {
              return res.status(401).send({ message: "Requested slots already booked!" });
            }
          }
        }
      }
  
      const newBooking = new Booking(req.body);
      await newBooking.save();
      return res.status(200).send({ message: "Room booked successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error: error });
    }
  };

const listAllHalls = async (req, res) => {
    try {
      const getHalls = await Booking.find();
  
      const requestedData = [];
      let status = "booked";
      let customerName;
      let bookedDate;
      let bookedTimings;
      let roomname;
  
      for (const element of getHalls) {
        try {
          const getHallName = await Hall.findById(element.hallId);
          roomname = getHallName.hallName;
        } catch (error) {
          console.log("Error getting the hall", error);
        }
  
        status = "booked";
        customerName = element.customername;
        bookedDate = element.createdAt;
        bookedTimings = element.bookingSlots[0].bookedHours;
  
        requestedData.push({
          "Room Name": roomname,
          "Booked Status": status,
          "Customer Name": customerName,
          "Date": bookedDate.toDateString(),
          "Booked Hours": bookedTimings,
        });
      }
  
      console.log(requestedData);
      return res.status(200).send({ message: "List of rooms", data: requestedData });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error while getting the booked halls" });
    }
};

const listAllCustomers = async(req,res)=>{
  try {
    const getAllCus = await Booking.find();

    const customerDetails = [];
    let customername,roomname,Date,time;

    for(let element of getAllCus){
      try {
        const getRoomName = await Hall.findById(element.hallId);
        roomname=getRoomName.hallName
      } catch (error) {
        console.log(error)
      }
      customername=element.customername;
      Date=element.createdAt.toDateString();
      time=element.bookingSlots[0].bookedHours;

      customerDetails.push({
        "Customer Name":customername,
        "Room Name":roomname,
        "Date":Date,
        "Booked Hours":time
      })

    }
    return res.status(200).send({message:"Customer Details",data:customerDetails})
  } catch (error) {
    return res.status(500).send({message:"Error getting details",error:error})
  }
}

const countCustomerBooking = async(req,res)=>{
  try {
    const {roomId,customerId}=req.body;

    //finding roomId

    const isCustomer = await Booking.find({customerId:customerId})

    console.log(isCustomer)

    if(!isCustomer){
      return res.status(200).send({message:"No rooms booked yet for the customer Id"})
    }



    const isroomId = await Booking.find({hallId:roomId});

    if(!isroomId){
      return res.status(200).send({message:"No records on booking this room for the customer"})
    }

    let variable;

    if(isroomId.length>1){
      variable="times"
    }else{
      variable="time"
    }

    return res.status(200).send({message:`Customer booked this room - ${isroomId.length} ${variable}`})

  } catch (error) {
    return res.status(500).send({message:"Error while getting count"})
  }
}
  
  

module.exports = {bookHall,listAllHalls,listAllCustomers,countCustomerBooking}

