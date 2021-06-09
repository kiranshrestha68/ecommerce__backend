const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");

dotenv.config({ path: "./src/config.env" });
const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(` database connection succesful`);
  })
  .catch((err) => console.log(`database no connection: `));

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
