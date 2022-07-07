import waapi from "waapi-client";
import path from "path";
import { ak } from "waapi";

const wwise = {
  getInfo: async () => {
    try {
      let client = await waapi.connect("ws://127.0.0.1:8080/waapi");
      const wwiseInfo = await client.call(ak.wwise.core.getInfo, {});
      await client.disconnect();
      return wwiseInfo;
    } catch (err) {}
  },

  importAudio: async (audioFilePath: string, objectName: string) => {
    try {
      // Connect to WA via WAAPI.
      let client = await waapi.connect("ws://127.0.0.1:8080/waapi");
      const wwiseInfo = await client.call(ak.wwise.core.getInfo, {});
      console.log(`${wwiseInfo.displayName} ${wwiseInfo.version.displayName}!`);

      // Get selected object path.
      const selectedObjectsInfo = await client.call(
        ak.wwise.ui.getSelectedObjects,
        {},
        { return: ["path"] }
      );
      const selectedObjectPath = selectedObjectsInfo.objects[0].path;

      // Import audio file as child object of selected object.
      await client.call(ak.wwise.core.audio.import_, {
        imports: [
          {
            objectPath: selectedObjectPath + "\\<Sound>" + objectName,
            audioFile: path.resolve(audioFilePath),
          },
        ],
      });

      await client.disconnect();
    } catch (e) {
      console.log(e);
    }
  },
};

export default wwise;
