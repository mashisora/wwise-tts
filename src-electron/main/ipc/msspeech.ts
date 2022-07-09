import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { app } from "electron";

const speakTextAsync = (
  speechConfig: sdk.SpeechConfig,
  audioConfig: sdk.AudioConfig,
  text: string
) =>
  new Promise((resolve, reject) => {
    let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
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
    let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
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


const msspeech = {
  getVoices: async ([key, region, locale]: string[]) => {
    try {
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
    } catch (e) {
      throw e;
    }
  },

  synthesizeAudio: async ([
    key,
    region,
    text,
    voice,
    format,
    fileName,
  ]: string[]) => {
    try {
      const userData = app.getPath("userData");
      const path = `${userData}/${fileName}.wav`;
      console.log(key);
      console.log(region);
      console.log(text);
      console.log(voice);
      console.log(format);
      console.log(fileName);

      const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
      speechConfig.speechSynthesisVoiceName = voice;
      speechConfig.speechSynthesisOutputFormat =
        sdk.SpeechSynthesisOutputFormat[format];

      const audioConfig = sdk.AudioConfig.fromAudioFileOutput(path);

      await speakTextAsync(speechConfig, audioConfig, text);
      return path;
    } catch (e) {
      throw e;
    }
  },
};

export default msspeech;
