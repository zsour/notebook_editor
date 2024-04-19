const express = require("express");
const router = express.Router();

const conn = require("../db.js");

router.post("/", async (req, res) => {
  let obj = req.body;
  try {
    let date = new Date();
    date = date.toISOString().slice(0, 19).replace("T", " ");

    if (obj.title == "") {
      throw "Can't create a post without a title.";
    }

    let title = conn.escape(obj.title);
    let codeblocks = conn.escape(obj.codeblocks);
    let parent = conn.escape(obj.parent);

    let sql = `INSERT INTO post (codeblocks, created, edited, parent, title) VALUES (${codeblocks}, '${date}', '${date}', ${parent}, ${title})`;
    let result = await conn.query(sql);

    res.send(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    if (req.query.id) {
      let result = await conn.query(
        `SELECT * FROM post WHERE ID=${req.query.id}`,
      );
      res.json(result[0]);
    } else {
      let result = await conn.query(`SELECT * FROM post`);
      res.json(result[0]);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.put("/", async (req, res) => {
  let obj = req.body;
  try {
    if (obj.title == "") {
      throw "Can't edit a post without a title.";
    }
    if (obj.id == "") {
      throw "Can't edit a post without its id.";
    }

    let date = new Date();
    date = date.toISOString().slice(0, 19).replace("T", " ");

    let id = conn.escape(obj.id);
    let title = conn.escape(obj.title);
    let codeblocks = conn.escape(obj.codeblocks);
    let parent = conn.escape(obj.parent);

    let sql = `UPDATE post SET codeblocks=${codeblocks}, edited='${date}', parent=${parent}, title=${title} WHERE ID=${id}`;
    let result = await conn.query(sql).catch(() => {
      throw "Post could not be edited.";
    });

    res.send(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
