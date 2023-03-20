require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts");
const app = express();

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `connected to db & listening on http://localhost:${process.env.PORT}`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });
