const express = require("express");
const router = express.Router();

const conn = require("../db.js");

router.post("/", async (req, res) => {
  let obj = req.body;

  let name = conn.escape(obj.name);
  let parent = conn.escape(obj.parent);

  try {
    if (name.length == 0) {
      throw "Can't create a category without a name.";
    }

    let nameFetch = await conn.query(
      `SELECT * FROM category WHERE name=${name}`,
    );
    if (nameFetch[0].length > 0) {
      throw "A category with that name already exist.";
    }

    let date = new Date();
    date = date.toISOString().slice(0, 19).replace("T", " ");
    let sql = `INSERT INTO category (name, parent, created, edited) VALUES (${name}, ${parent}, '${date}', '${date}')`;
    let result = await conn.query(sql).catch(() => {
      throw "Category could not be created.";
    });

    res.json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    if (req.query.id) {
      let result = await conn.query(
        `SELECT * FROM category WHERE ID=${req.query.id}`,
      );
      res.json(result[0]);
    } else {
      let result = await conn.query(`SELECT * FROM category`);
      res.json(result[0]);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
