const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send(" Gereetings  From server dashboard");
// });
app.use("/test", (req, res) => {
  res.send(" Test From server");
});
app.use("/hello", (req, res) => {
  res.send(" Hello From server");
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
