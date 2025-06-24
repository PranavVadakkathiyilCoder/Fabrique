import { Schema, model, Document, Types, models } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  offer:number;
  expiryDate: Date;
  usedBy: Types.ObjectId[];

  createdBy: Types.ObjectId;
  maxUsage?: number;
  usageCount: number;
  status:"Active"|"Expired";
  actions:"Active"|"Block";
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true },
    offer:{ type: Number, required: true },
    expiryDate: { type: Date, required: true },
    usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    maxUsage: { type: Number },
    usageCount: { type: Number, default: 0 },
    status:{type:String, enum:["Active","Expired"],default:"Active"},
    actions:{type:String, enum:["Active","Block"],default:"Active"}
  },
  { timestamps: true }
);

const Coupon = models?.Coupon || model<ICoupon>("Coupon", couponSchema);
export default Coupon;
