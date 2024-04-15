const fs = require("fs");

class NotebookData {
  static async readData() {
    return new Promise((resolve, reject) => {
      fs.readFile("../../data.json", "utf-8", (err, data) => {
        resolve(data);
      });
    });
  }
}

module.exports = NotebookData;
