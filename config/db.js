import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGOURL 

export const connectDB =()=>{
    try{
        mongoose.connect(url);
        console.log("database connected");
    }
    catch(error){
        console.log(error.message);

    }
}


// mongoose.connect("mongodb://127.0.0.1:27017/week-8-expressjs", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });