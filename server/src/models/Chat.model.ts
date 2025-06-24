import { Schema, model, Document, Types, models } from "mongoose";

export interface IChat extends Document {
  users: Types.ObjectId[];
  order: Types.ObjectId;
  latestmessage: Types.ObjectId;
  review: string;
}

const chatSchema = new Schema<IChat>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    latestmessage :{type:Schema.Types.ObjectId,ref:"Message",}
    
  },
  {
    timestamps: true, 
  }
);

const Chat = models?.Chat || model<IChat>("Chat", chatSchema);
export default Chat;
