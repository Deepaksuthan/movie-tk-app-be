const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{
    timestamps:true,
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})

const movieSchema = mongoose.Schema({
    movieName:{type:String,require:true},
    type:{type:String},
    trailer:{type:String},
    language:{type:String},
    releaseDate:{type:String},
    about:{type:String},
    cast:{type:Array},
    crew:{type:Array},
    poster:{type:String},
    categori:{type:String},
    duration:{type:String},
    like:{type:String}
})

const ticketSchema = mongoose.Schema({
    email:{type:String},
    movieName:{type:String},
    pic:{type:String},
    date:{type:String},
    time:{type:String},
    cinema:{type:String},
    place:{type:String},
    seat:{type:Array},
    srow:{type:String},
})

let User = mongoose.model("User",userSchema);
let Movie = mongoose.model("Movie",movieSchema);
let Ticket = mongoose.model("Ticket",ticketSchema)
module.exports={User,Movie,Ticket}

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const saltRounds = 10

// const hashPassword = async(password)=>{
//     let salt = await bcrypt.genSalt(saltRounds)
//     let hashedPassword = await bcrypt.hash(password,salt)
//     return hashedPassword
// }

// const hashCompare = async(password,hashedPassword)=>{
//     return await bcrypt.compare(password,hashedPassword)
// }

// const createToken = async(payload)=>{
//     let token = await jwt.sign(payload,process.env.secretKey,{expiresIn:'2m'})
//     return token
// }

// const validate = async(req,res,next)=>{
    
//     if(req.headers.authorization)
//     {
//         //"Bearer hfdwibfjwehdbfjwdhbeflewhjbclewf"
//         //["Bearer","hfdwibfjwehdbfjwdhbeflewhjbclewf"]
//         let token = req.headers.authorization.split(" ")[1]
//         let data = await jwt.decode(token)
//         if(Math.floor((+new Date())/1000) < data.exp)
//             next()
//         else
//             res.status(401).send({message:"Token Expired"})
//     }
//     else
//     {
//         res.status(400).send({message:"Token Not Found"})
//     }
// }

// const roleAdminGaurd = async(req,res,next)=>{

//     if(req.headers.authorization)
//     {
//         //"Bearer hfdwibfjwehdbfjwdhbeflewhjbclewf"
//         //["Bearer","hfdwibfjwehdbfjwdhbeflewhjbclewf"]
//         let token = req.headers.authorization.split(" ")[1]
//         let data = await jwt.decode(token)
//         if(data.role==='admin')
//             next()
//         else
//             res.status(401).send({message:"Only Admins are allowed"})
//     }
//     else
//     {
//         res.status(400).send({message:"Token Not Found"})
//     }
// }
// module.exports={hashPassword,hashCompare,createToken,validate,roleAdminGaurd}