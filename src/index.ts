import express from "express";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import cookieParser from "cookie-parser"
import { router } from "./routes/route";


const app = express();

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Database setup : Connect drizzle orm to database
export const db = drizzle(process.env.DATABASE_URL!);

// routes
app.use("/api", router);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
})