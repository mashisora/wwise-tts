import fs from "fs";
import path from "path";
import { app, ipcMain } from "electron";

const userData = app.getPath("userData");


ipcMain.handle("file:readJson", async (event, args) => {
  const [fileName] = args;
  const file = path.join(userData, `${fileName}.json`);
  fs.readFile(file, 'utf-8', (err, data) => {
    return data
  });
});

ipcMain.handle("file:writeJson", async (event, args) => {
  const [fileName, data] = args;
  const file = path.join(userData, `${fileName}.json`);      
  fs.writeFile(file, data, (err) => {});

});


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

