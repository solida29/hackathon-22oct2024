import express, { Request, Response } from "express";
import { connectToMongoDB } from "./database/connectToMongoDB.js";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./routes/userActivityRoutes.js";

const app = express();

app.use(cors());
app.use(express.json()); // analiza los cuerpos de las solicitudes entrantes en un formato JSON.
app.use(bodyParser.urlencoded({ extended: true })); // para poder pasar el form a body del front, analiza las solicitudes entrantes (body) en formato URL-encoded.

// Routes
app.use("/", router); // path-routes de register-login

//---------- SERVER - MONGO DB ---------------------

const PORT = process.env.PORT || 3000;
const uri =
  process.env.MONGODB_URI || "mongodb://root:password@localhost:27017/";

app.get("/appActivities", (req, res) => {
  res.send("Hello, World!");
});

connectToMongoDB(uri!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}, close with ^C 🚀`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB or starting the server", error);
    process.exit(1); // el proceso termina debido a un error.
  });
