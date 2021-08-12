import axios, { AxiosPromise } from 'axios';
import { TransliterationWord } from '../data/Transliteration';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT ?? 'backend';

interface ParseTransliterationRequest {
  language: string;
  content: string;
}

export interface ParseTransliterationResult {
  transliteration: TransliterationWord[][][];
}

export const parseTransliteration = (
  inputText: string,
): AxiosPromise<ParseTransliterationRequest> => {
  const body: ParseTransliterationRequest = {
    language: 'hittite',
    content: inputText,
  };

  return axios.post(`${API_ENDPOINT}/transliteration/`, body);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const downloadTransliteration = async (inputText: string) => {
  const body: ParseTransliterationRequest = {
    language: 'hittite',
    content: inputText,
  };

  const response = await axios.post<ArrayBuffer>(
    `${API_ENDPOINT}/transliteration/download`,
    body,
    {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        Accept:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    },
  );

  return response;
};

export interface ParseTransliterationError {
  detail: {
    column: number;
    line: number;
    context: string;
  };
}
