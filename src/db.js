import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://EmersonMdn:Loque.321@cluster0.0llifr1.mongodb.net/AppMern?retryWrites=true&w=majority"
    );
    console.log(">>> Db connection established");
  } catch (err) {
    console.log(err);
  }
};
