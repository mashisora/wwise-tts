import { app, IpcMainInvokeEvent } from 'electron';
import sdk from 'microsoft-cognitiveservices-speech-sdk';

const msspeech = {
  getVoices: async (_: IpcMainInvokeEvent, key: string, region: string) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    const data = await synthesizer.getVoicesAsync();
    const voices = data.voices.map((item) => ({
      locale: item.locale,
      localName: item.localName,
      shortName: item.shortName,
      styleList: item.styleList,
    }));
    return voices;
  },

  synthesizeAudio: async (
    _: IpcMainInvokeEvent,
    key: string,
    region: string,
    text: string,
    voice: string,
    role: string | null,
    style: string | null,
    format: string,
    fileName: string,
    pitch: string | null,
    rate: string | null,
    volume: string | null,
  ) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    type index = keyof typeof sdk.SpeechSynthesisOutputFormat;
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat[format as index];
    speechConfig.speechSynthesisVoiceName = voice;

    const userData = app.getPath('userData');
    const path = `${userData}/${fileName}.wav`;
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(path);

    // voice format "zh-CN-XiaomoNeural"
    const locale = voice.substring(0, 5);
    const ssml = generateSsml(text, locale, voice, role, style, pitch, rate, volume);
    const data = await speakSsmlAsync(speechConfig, audioConfig, ssml);
    return data;
  },

  synthesizeAudioSsml: async (
    _: IpcMainInvokeEvent,
    key: string,
    region: string,
    ssml: string,
    format: string,
    fileName: string,
  ) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    type index = keyof typeof sdk.SpeechSynthesisOutputFormat;
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat[format as index];

    const userData = app.getPath('userData');
    const path = `${userData}/${fileName}.wav`;
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(path);

    const data = await speakSsmlAsync(speechConfig, audioConfig, ssml);
    return data;
  },
};

export default msspeech;

// const speakTextAsync = (speechConfig: sdk.SpeechConfig, audioConfig: sdk.AudioConfig, text: string) =>
//   new Promise((resolve, reject) => {
//     const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
//     synthesizer.speakTextAsync(
//       text,
//       (res) => {
//         synthesizer.close();
//         resolve(res.audioData);
//       },
//       (err) => {
//         synthesizer.close();
//         reject(err);
//       },
//     );
//   });

const speakSsmlAsync = (speechConfig: sdk.SpeechConfig, audioConfig: sdk.AudioConfig, ssml: string) =>
  new Promise((resolve, reject) => {
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakSsmlAsync(
      ssml,
      (res) => {
        synthesizer.close();
        resolve(res.audioData);
      },
      (err) => {
        synthesizer.close();
        reject(err);
      },
    );
  });

function generateSsml(
  text: string,
  locale: string,
  voice: string,
  role: string | null,
  style: string | null,
  pitch: string | null,
  rate: string | null,
  volume: string | null,
) {
  let el: string = '';
  el += `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${locale}">`;
  el += `<voice name="${voice}">`;
  el += `<mstts:express-as role="${role}" style="${style}">`;
  el += `<prosody pitch="${pitch}" rate="${rate}" volume="${volume}">`;
  el += text;
  el += `</prosody>`;
  el += `</mstts:express-as>`;
  el += `</voice>`;
  el += `</speak>`;

  return el;
}
