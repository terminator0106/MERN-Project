import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const home = async (req,res) => {
    try{
        res.status(200).send("Welcome to the home page");
    }
    catch(error){
        console.log(error);
    }
};

const register = async (req,res,next) => {
    try {

        const {username, email, contact, password } = req.body;

        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(400).json({message:"Email already exist"});
        }

        const createUser = await User.create({username, email, contact, password });

        res.json({msg: createUser, token: await createUser.generateToken(), userId: createUser._id.toString()});
        
    } catch (error) {
        next(error);
    }
};

const login = async (req,res) => {
    try {
        const { email, password } = req.body; 

        const userExist = await User.findOne({email : email});

        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const user = await bcrypt.compare(password, userExist.password);

        if(user){
            res.json({msg: "Login Successfully", token: await userExist.generateToken(), userId: userExist._id.toString()});
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch (error) {
        //res.send(500).json("internal server error");
        next(error);
    }
}

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({  userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};


export default {home,register,login,user};