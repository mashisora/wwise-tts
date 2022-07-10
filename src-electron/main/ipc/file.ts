import fs from "fs";
import { join } from "path";
import { app } from "electron";

const userData = app.getPath("userData");

const file = {
  writeJson: async ([fileName, data]: string[]) => {  
    const file = join(userData, `${fileName}.json`);     
    fs.writeFileSync(file, JSON.stringify(data));
  },
  readJson: async ([fileName]: string[]) => {
    const file = join(userData, `${fileName}.json`);
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  },
}

export default file;