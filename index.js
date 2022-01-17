const express = require("express");
const cors = require("cors");
const user = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", user);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
