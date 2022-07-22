import fs from 'fs';
import { app, IpcMainInvokeEvent, shell } from 'electron';

const userData = app.getPath('userData');

const file = {
  writeJson: async (_: IpcMainInvokeEvent, fileName: string, data: string) => {
    const file = `${userData}/${fileName}.json`;
    fs.writeFileSync(file, JSON.stringify(data));
  },
  readJson: async (_: IpcMainInvokeEvent, fileName: string) => {
    const file = `${userData}/${fileName}.json`;
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  },
  openUserData: async () => {
    shell.openPath(userData);
  },
};

export default file;
