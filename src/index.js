import app from "./app.js";
import { connectDB } from "./db.js";

const port = process.env.PORT || 8080;

app.listen(port, console.log("Starting server on port " + port));
connectDB();
