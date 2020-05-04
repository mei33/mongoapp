const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_PASSWORD
}@${process.env.DB_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => {
    console.error("Ошибка соединения с БД", error.message);
  });

const db = mongoose.connection;

module.exports = db;
