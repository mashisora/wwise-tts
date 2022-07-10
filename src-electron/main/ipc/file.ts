import fs from "fs";
import path from "path";
import { app } from "electron";

const userData = app.getPath("userData");

const file = {
  writeJson: async ([fileName, data]: string[]) => {
    try {
      const file = path.join(userData, `${fileName}.json`);      
      fs.writeFileSync(file, data);
    } catch (e) {
      throw e;
    }
  },
  readJson: async ([fileName]: string[]) => {
    try {
      const file = path.join(userData, `${fileName}.json`);
      const data = fs.readFileSync(file, 'utf-8');
      return data;
    } catch (e) {
      throw e;
    }
  },
}

export default file;