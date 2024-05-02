import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import storyRoutes from "./routes/stories.routes.js";
import slideRoutes from "./routes/slide.routes.js";
import userRoutes from "./routes/userActivity.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();


// app.use(cors());

const corsOptions = {
    origin: "*",
  };
  app.use(cors(corsOptions));

const PORT = process.env.PORT || 5005;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads(from req.body)

app.use("/api/auth", authRoutes); 
app.use("/api/story", storyRoutes);
app.use("/api/slide", slideRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello There!!, Server is running here");
});


app.use(errorHandler);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client", "build", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on ${PORT}`);
});
