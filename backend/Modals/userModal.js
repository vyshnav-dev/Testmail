import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:false,
       
    },
    
    
  
  
});

const User = mongoose.model('User', userSchema);

export default User;