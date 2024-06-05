import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import authorRoutes from "./routes/Author";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("connected");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    res.on("finish", () => {
      console.log(
        `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.status}]`
      );
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });
  /**Author routes */
  router.use("/authors", authorRoutes);
  /**Test */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () => console.log("Server is running"));
};
