import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db";

import movieRoutes from "./routes/movieRoutes";
import authRoutes from  "./routes/authRoutes"

config();
connectDB();

const app = express();

//Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//API Routes
app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)


app.get("/hello", (req,res) => {
  res.json({message: "Hello World"})
})

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1)
  } )
})

//Handle uncaught expressions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1)
  })
})

//Graceful Shutdown
process.on("SIGTERM", (err) => {
  console.error("SIGTERM recieved, shutting down gracefully")
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  })
})
