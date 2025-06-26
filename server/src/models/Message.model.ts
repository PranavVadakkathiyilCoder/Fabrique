import { Schema, model, Document, Types, models } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId;
  chat: Types.ObjectId;
  
  content: string;
}

const messageSchema = new Schema<IMessage>(
  { 
    
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    chat :{type:Schema.Types.ObjectId,ref:"Chat"},
    content: { type:String,trim:true },
    
    
  },
  {
    timestamps: true, 
  }
);

const Message = models?.Message || model<IMessage>("Message", messageSchema);
export default Message;
