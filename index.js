const express = require("express");
require("dotenv").config();
require("./db_conn"); // to run db

const app = express();

app.use("/events", require("./routes/event"));
app.use("/registrations", require("./routes/registration"));
app.use("/reviews", require("./routes/review"));
app.use("/tickets", require("./routes/ticket"));
app.use("/users", require("./routes/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`-> server running on http://localhost:${PORT}`)
);
