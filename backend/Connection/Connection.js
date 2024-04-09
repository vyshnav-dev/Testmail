import mongoose,{ mongo } from "mongoose";

const Connection = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(`MongoDB Connected`);
    }catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};


export default Connection; 