import mongoose from "mongoose";

export const connectToMongoDB = async (uri: string): Promise<void> => {
  try {
    mongoose.set("toJSON", {
      // Mongoose convertirá los documentos de la bbdd a objetos JSON.
      virtuals: true, // propiedades virtuales en la conversión a JSON
      versionKey: false, // Mongoose no incluye la clave de versión (__v)
    });

    await mongoose.connect(uri!, {
      dbName: "hackathon2024", // crea la bbdd si no existe
    });
    console.log("💾 MongoDB is connected");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
