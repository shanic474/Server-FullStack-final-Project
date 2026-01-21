import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: {
      type: String,required: true,unique: true,trim: true},
    password: { type: String },
    phone_number: { type: String , default: "" },
    user_role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
    age: { type: Number, default: null },
    height_cm: { type: Number, default: null },
    weight_kg: { type: Number, default: null },
    google_id: { type: String, unique: true, spares: true, default: null },
  },

);

userSchema.pre("save", async function () {
  if (!this.isModified("password"))
    return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export default mongoose.model("Users", userSchema);
