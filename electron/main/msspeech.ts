import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { app } from "electron";

const msspeech = {
  synthesizeAudio: (
    key: string,
    region: string,
    text: string,
    voice: string,
    format: string,
    fileName: string
  ) => {
    const userData = app.getPath("userData");
    const path = `${userData}/${fileName}`;
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
    let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
      text,
      (res) => {
        synthesizer.close();
        if (res.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          throw "Speech synthesis canceled";
        }
      },
      (err) => {
        synthesizer.close();
        throw err;
      }
    );
    return synthesizer;
  },
};

// export function generateAudioFile(
//   text: string,
//   voice: string,
//   format: string,
//   fileName: string
// ): [sdk.SpeechSynthesizer, string] {
//   // Set Microsoft Speech config.
//   const key = "fd4714df903a4b37bca5950c67336caa";
//   const region = "japaneast";
//   const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//   speechConfig.speechSynthesisVoiceName = voice;
//   speechConfig.speechSynthesisOutputFormat =
//     sdk.SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm;

//   // Create the speech synthesizer.
//   const audioFilePath: string = "./audio/" + fileName;
//   const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFilePath);
//   let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

//   // Start generate audio file.
//   synthesizer.speakTextAsync(
//     text,
//     function (result) {
//       if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
//         console.log("synthesis finished.");
//       } else {
//         console.error(
//           "Speech synthesis canceled, " +
//             result.errorDetails +
//             "\n" +
//             "Did you set the speech resource key and region values?"
//         );
//       }
//       synthesizer.close();
//     },
//     function (err) {
//       console.trace("err - " + err);
//       synthesizer.close();
//     }
//   );

//   console.log("Now synthesizing to: " + audioFilePath);
//   return [synthesizer, audioFilePath];
// }

export default msspeech;
