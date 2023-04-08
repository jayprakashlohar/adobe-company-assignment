const express = require("express");
const { connection } = require("../config/database");
const { userRouter } = require("../Routes/user.route");

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Welcome Adobe Social Media App..." });
});

app.use("/users", userRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected To Database Successfully!!");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server Listing On PORT ${PORT}`);
});
