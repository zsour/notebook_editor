const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/addCategory", (req, res) => {
  let obj = req.body;
  console.log(obj);
  let name = obj.name;
  let parent = obj.parent;

  if (name == "") {
    res.status(400).json({
      message: "Can't create a category with an empty name.",
    });
  } else {
    res.send("workes");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
