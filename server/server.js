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
    // origin: "http://localhost:5173",
    origin: "https://dancing-taffy-7b654f.netlify.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
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