/** These Azure regions have full support for prebuilt and custom neural voices. */
export const AzureRegions = [
  {
    name: 'Southeast Asia',
    id: 'southeastasia',
  },
  {
    name: 'Australia East',
    id: 'australiaeast',
  },
  {
    name: 'Central India',
    id: 'centralindia',
  },
  {
    name: 'Japan East',
    id: 'japaneast',
  },
  {
    name: 'Korea Central',
    id: 'koreacentral',
  },
  {
    name: 'North Europe',
    id: 'northeurope',
  },
  {
    name: 'West Europe',
    id: 'westeurope',
  },
  {
    name: 'UK South',
    id: 'uksouth',
  },
  {
    name: 'East US',
    id: 'eastus',
  },
  {
    name: 'East US 2',
    id: 'eastus2',
  },
  {
    name: 'South Central US',
    id: 'southcentralus',
  },
  {
    name: 'West US',
    id: 'westus',
  },
  {
    name: 'West US 2',
    id: 'westus2',
  },
] as const;

type AzureRegionId = typeof AzureRegions[number]['id'];

export const getVoiceList = async (regionId: AzureRegionId, key: string) => {
  interface IVoiceInfo {
    Name: string;
    DisplayName: string;
    LocalName: string;
    ShortName: string;
    Gender: 'Female' | 'Male';
    Locale: string;
    LocaleName: string;
    SampleRateHertz: string;
    VoiceType: 'Neural';
    Status: 'GA' | 'Deprecated';
    WordsPerMinute: string;
    StyleList?: string[];
    SecondaryLocaleList?: string[];
    RolePlayList?: string[];
  }

  const resp = await fetch(`https://${regionId}.tts.speech.microsoft.com/cognitiveservices/voices/list`, {
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'User-Agent': 'WwiseToolkit/0.1.0',
    },
  });

  const list = <IVoiceInfo[]>await resp.json();
  return list.filter((voice) => voice.Status !== 'Deprecated');
};

export const generateSound = async (regionId: AzureRegionId, key: string) => {
  const testText = `
      <speak version='1.0' xml:lang='en-US'>
          <voice xml:lang='en-US' xml:gender='Male' name='en-US-ChristopherNeural'>
              Microsoft Speech Service Text-to-Speech API
          </voice>
      </speak>`;
  const resp = await fetch(`https://${regionId}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'User-Agent': 'WwiseToolkit/0.1.0',
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'riff-48khz-16bit-mono-pcm',
    },
    body: 'Microsoft Speech Service Text-to-Speech API',
  });
};
