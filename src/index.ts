import express, { Request, Response } from "express";
import { connectToMongoDB } from "./database/connectToMongoDB.js";
// import cors from "cors";

const app = express();
app.use(express.json()); // analiza los cuerpos de las solicitudes entrantes en un formato JSON.

const PORT = process.env.PORT || 3000;
const uri =
  process.env.MONGODB_URI || "mongodb://root:password@localhost:27017/";

app.get("/", (req, res) => {
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
