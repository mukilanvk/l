import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName:{ type: String, unique: true, require:true },
    DOB:{type:Date, require:true},
    gender:{type:String, enum: ['male', 'female'], require:true},
    contact:{type: Number, require:true},
    address:{type:String,
        minlength: 30,
        maxlength:50,
        require:true
    },
    password: String,
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
}
)

export const userModal =mongoose.model.userModal|| mongoose.model("user", userSchema);