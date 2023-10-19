import { createReadStream } from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const parseCSV = (callback) => {
  const data = [];

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  let filepath = path.join(__dirname, "..", "users.csv");
  createReadStream(filepath)
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      callback(data);
});
};