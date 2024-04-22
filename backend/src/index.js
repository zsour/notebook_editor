const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const exportRoutes = require("./routes/export");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes:
app.use("/category", categoryRoutes);
app.use("/post", postRoutes);

app.use("/export", exportRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
