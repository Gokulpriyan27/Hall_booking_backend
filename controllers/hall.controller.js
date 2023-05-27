const Hall = require("../models/hallmodel")

const createHall = async(req,res)=>{
    try {
        const {hallName}=req.body;
        const isHallAvailable = await Hall.findOne({hallName:hallName})

        if(isHallAvailable){
            return res.status(400).send("The hall already exists")
        }
        const hallCreation = await new Hall(req.body);
        await hallCreation.save();
        return res.status(201).send({message:`Hall creation successful and the id is ${hallCreation._id} `})
    } catch (error) {
        return res.status(500).send({message:"Error while creating hall",error:error})
    }
}


module.exports = {createHall}