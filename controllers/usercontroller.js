const User = require("../model/UserModel");

exports.doesUserExits = async (req, res, next) => {
    try{
        const user = await User.findOne({ $or: [
            { email: req.body.email },
            { phonenumber: req.body.phonenumber }
        ]})
        if(user){
            return res.status(200).json({exist:true})
        }
        res.status(200).json({exist:false })
    }catch(err){
        console.log(err)
        res.status(400).json({err:err, message: "An error occured"})
    }
}