const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

const userRoutes = require("./Routers/UserRoutes");

app.use("/api/user", userRoutes);

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB not connected");
    console.error(err);
});