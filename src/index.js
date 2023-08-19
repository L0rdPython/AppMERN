import app from "./app.js";
import { connectDB } from "./db.js";

const port = 8080;

app.listen(port, console.log("Starting server on port " + port));
connectDB();
