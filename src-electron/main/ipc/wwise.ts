import { app, IpcMainInvokeEvent } from 'electron';
import { ak } from 'waapi';
import waapi from 'waapi-client';

const wwise = {
  getInfo: async (_: IpcMainInvokeEvent, url: string) => {
    let client = await waapi.connect(url);
    const wwiseInfo = await client.call(ak.wwise.core.getInfo, {});
    await client.disconnect();
    return wwiseInfo;
  },

  importAudio: async (_: IpcMainInvokeEvent, url: string, fileName: string) => {
    const userData = app.getPath('userData');
    const path = `${userData}/${fileName}.wav`;

    let client = await waapi.connect(url);
    const selectedObjectsInfo = await client.call(ak.wwise.ui.getSelectedObjects, {}, { return: ['path'] });
    const selectedObjectPath = selectedObjectsInfo.objects[0].path;

    await client.call(ak.wwise.core.audio.import_, {
      imports: [
        {
          objectPath: `${selectedObjectPath}\\<Sound>${fileName}`,
          audioFile: path,
        },
      ],
    });
    await client.disconnect();
  },
};

export default wwise;
