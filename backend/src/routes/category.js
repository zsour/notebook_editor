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
        `SELECT * FROM category WHERE ID=${conn.escape(req.query.id)}`,
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

router.put("/", async (req, res) => {
  try {
    let obj = req.body;

    if (obj.id == "") {
      throw "Can't edit a category without its id.";
    }

    if (obj.name == "") {
      throw "Can't edit a category without a name.";
    }

    let id = conn.escape(obj.id);
    let name = conn.escape(obj.name);
    let parent = conn.escape(obj.parent);

    if (parent == id) {
      throw "A category can't be its own parent.";
    }

    let nameFetch = await conn.query(
      `SELECT * FROM category WHERE name=${name}`,
    );

    if (nameFetch[0].length > 0) {
      for (let i = 0; i < nameFetch[0].length; i++) {
        let tmp = `'${nameFetch[0][i].ID}'`;
        if (tmp != id) {
          throw "A category with that name already exist.";
        }
      }
    }

    let date = new Date();
    date = date.toISOString().slice(0, 19).replace("T", " ");

    let sql = `UPDATE category SET name = ${name}, parent = ${parent}, edited = '${date}' WHERE ID = ${id}`;
    let result = await conn.query(sql).catch((err) => {
      console.log(err);
      throw "Category could not be edited.";
    });

    res.json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (!req.query.id) {
      throw "Can't remove category without an id";
    }

    let id = conn.escape(req.query.id);

    let sql = `DELETE FROM category WHERE ID=${id}`;
    let result = await conn.query(sql).catch(() => {
      throw "Could not delete category.";
    });

    let postSql = `DELETE FROM post WHERE parent=${id}`;
    await conn.query(postSql).catch(() => {
      throw "Could not delete associated posts.";
    });

    res.json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
