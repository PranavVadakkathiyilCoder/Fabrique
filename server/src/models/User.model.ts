import mongoose, { Schema, model, models, Document, Types } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWTA_EXPIRE = process.env.JWTA_EXPIRE;
const JWTR_EXPIRE = process.env.JWTR_EXPIRE;

import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export interface Iuser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    pic: string;
    role: 'user' | 'seller' | 'admin';
    refreshToken: string;
}

const userSchema = new Schema<Iuser>(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required:true },
        pic: {
            type: String,
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        role: {
            type: String,
            enum: ['user', 'seller', 'admin'],
            default: 'user',
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre<Iuser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.AccessToken = function () {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            role: this.role,
        },
        JWT_SECRET,
        { expiresIn: JWTA_EXPIRE } as SignOptions
    );
};

// Generate Refresh Token
userSchema.methods.RefreshToken = function () {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(
        {
            _id: this._id,
        },
        JWT_SECRET,
        { expiresIn: JWTR_EXPIRE } as SignOptions // ✅ Correct: JWTR_EXPIRE
    );
};
userSchema.methods.validateToken = function (token: string): { valid: boolean, decoded?: any, error?: string } {
    
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return { valid: true, decoded }
  } catch (err: any) {
    return { valid: false, error: err.message }
  }

   
}
const User = models?.User || model<Iuser>("User", userSchema);

export default User;
