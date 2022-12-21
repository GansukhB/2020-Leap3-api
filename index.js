const app = require("./app");
const mongoose = require("mongoose");
const port = 3000;

if (process.env.MONGODB_URL) mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected");
});

app.listen(port, () => {
  console.log(process.env.MONGODB_URL);
  console.log(`Example app listening on port ${port}`);
});
