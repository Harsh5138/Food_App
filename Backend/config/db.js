import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://patilharshal578:projectfood12@cluster0.bkx5tzd.mongodb.net/foodie"
    )
    .then(() => console.log("DB Connected"));
};
