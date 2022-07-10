import { app } from "electron";
import sdk from "microsoft-cognitiveservices-speech-sdk";

const msspeech = {
  getVoices: async ([key, region]: string[]) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    const data = await synthesizer.getVoicesAsync();
    const voices = data.voices.map((item) => ({
      locale: item.locale,
      gender: item.gender,
      localName: item.localName,
      shortName: item.shortName,
    }))
    return voices;
  },

  synthesizeAudio: async ([
    key,
    region,
    text,
    voice,
    format,
    fileName,
  ]: string[]) => {
    const userData = app.getPath("userData");
    const path = `${userData}/${fileName}.wav`;

    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechSynthesisVoiceName = voice;
    type index = keyof typeof sdk.SpeechSynthesisOutputFormat;
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat[format as index];
    
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(path);
    await speakTextAsync(speechConfig, audioConfig, text);
    return path;
  },
};

export default msspeech;

const speakTextAsync = (
  speechConfig: sdk.SpeechConfig,
  audioConfig: sdk.AudioConfig,
  text: string
) =>
  new Promise((resolve, reject) => {
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
      text,
      (res) => {
        synthesizer.close();
        resolve(res);
      },
      (err) => {
        synthesizer.close();
        reject(err);
      }
    );
  });

const speakSsmlAsync = (
  speechConfig: sdk.SpeechConfig,
  audioConfig: sdk.AudioConfig,
  ssml: string
) =>
  new Promise((resolve, reject) => {
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakSsmlAsync(
      ssml,
      (res) => {
        synthesizer.close();
        resolve(res);
      },
      (err) => {
        synthesizer.close();
        reject(err);
      }
    );
  });
