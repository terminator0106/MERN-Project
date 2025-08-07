import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import authRouter from './router/auth-router.js';
import contactRoute from "./router/contact-router.js";
import serviceRouter from "./router/service-router.js";
import connectDB from './utils/db.js';
import errorMiddleware from "./middleware/error-middleware.js";
import cors from 'cors';


const app = express();
const port = 3000;

const corsOptions = {
    origin: [
        "https://dancing-taffy-7b654f.netlify.app",
        "https://dancing-taffy-7b654f.netlify.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400 // 24 hours
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRouter);

app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at post ${port}`);
    });
});