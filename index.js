const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser=require("cookie-parser")

dotenv.config(); // Load environment variables from .env file

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

app.use(express.json())
app.use(cookieParser())

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MDB_CONNECT);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

app.use("/auth",require("./routers/userRouter"));
app.use("/customer",require("./routers/customerRouter"))