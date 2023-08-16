import app from "./app.js";
import { connectDB } from "./db.js";

app.listen(3000, console.log("Starting server on port 8080"));
connectDB();
