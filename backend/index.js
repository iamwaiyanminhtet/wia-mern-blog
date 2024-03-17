import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import mongoose from "mongoose";
import { error } from "console";

const app = express();
dotenv.config();

// initiate server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})

// db connection
mongoose.connect(process.env.MONGODB_CONNECTION)
.then(() => console.log('connected to the db'))
.catch(() => console.log(error))

// express config
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

// last error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal Sever Error";

    res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage
    })
})