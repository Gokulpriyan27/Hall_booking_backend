const User = require("../models/user.model")
const bcrpyt = require("bcrypt");


const register = async(req,res)=>{
    try {
        const {username,email,password}= req.body;

        const isemail = await User.findOne({email:email});

        if(isemail){
            return res.status(200).send({message:"User already registered! try login"})
        }

        const salt = bcrpyt.genSaltSync(10)
        const hashPassword = bcrpyt.hashSync(password,salt);
        await delete password;

        const registerUser = await new User({
            username:username,
            password:hashPassword,
            email:email
        })

        await registerUser.save();

        if(!registerUser){
            return res.status(500).send({message:"Error registering user"})
        }

        return res.status(201).send({message:`User registerion successful and the user id is ${registerUser._id}`})


    } catch (error) {
        return res.status(500).send({message:"Error while registering the user",error:error})
    }
}

module.exports = {register}