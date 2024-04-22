const express = require("express");
const fs = require("fs");
const router = express.Router();

const conn = require("../db.js");

router.get("/", async (req, res) => {
  try {
    let sql = `SELECT * FROM category`;
    let result = await conn.query(sql).catch(() => {
      throw "Could not fetch categories.";
    });

    let postSQL = `SELECT * FROM post`;
    let postResult = await conn.query(postSQL).catch(() => {
      throw "Could not fetch posts.";
    });

    result = result[0];
    result.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      return -1;
    });

    postResult = postResult[0];

    result.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }

      return -1;
    });

    let jsonFile = {};

    for (let i = 0; i < result.length; i++) {
      let tmpObj = {
        name: result[i].name,
        parent: result[i].parent,
        posts: [],
        created: result[i].created,
        edited: result[i].edited,
      };
      jsonFile[result[i].ID] = tmpObj;
    }

    for (let i = 0; i < postResult.length; i++) {
      let tmpObj = {
        title: postResult[i].title,
        created: postResult[i].created,
        edited: postResult[i].edited,
        codeblocks: postResult[i].codeblocks,
      };

      jsonFile[postResult[i].parent].posts.push(tmpObj);
    }

    res.setHeader("Content-disposition", "attachment; filename= myFile.json");
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(jsonFile), function (err) {
      res.end();
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
