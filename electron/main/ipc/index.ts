import { ipcMain } from "electron";
import wwise from "./wwise";
import msspeech from "./msspeech";

ipcMain.handle("wwise:getInfo", async (event, args) => {
  const info = await wwise.getInfo(args);
  return info;
});

ipcMain.handle("wwise:importAudio", async (event, args) => {
  await wwise.importAudio(args);
});

ipcMain.handle("msspeech:synthesizeAudio", async (event, args) => {
  const path = await msspeech.synthesizeAudio(args);
  return path;
});
