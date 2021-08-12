import { VFC, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import ContentComponent from '../../components/organism/Content';
import {
  parseTransliteration,
  ParseTransliterationResult,
  ParseTransliterationError,
} from '../../domain/backend';
import { TransliterationWord } from '../../data/Transliteration';

const Content: VFC = () => {
  const [inputText, setInputText] = useState('');
  const [renderedTransliteration, setRenderedTransliteration] = useState(
    [] as TransliterationWord[][][],
  );

  const setParseResult = (
    result: AxiosResponse<ParseTransliterationResult>,
  ) => {
    if (result.data.transliteration && result.data.transliteration.length > 0) {
      setRenderedTransliteration(result.data.transliteration);
    }
  };

  const onParseError = (_: AxiosError<ParseTransliterationError>) => {
    setRenderedTransliteration([]);
  };

  const { isLoading, isSuccess, isError, error } = useQuery(
    inputText,
    () => parseTransliteration(inputText),
    {
      onSuccess: setParseResult,
      onError: onParseError,
    },
  );

  return (
    <ContentComponent
      setInputText={setInputText}
      parseRequestResult={{
        error: error?.response?.data || null,
        results: inputText.length > 0 ? renderedTransliteration : [],
      }}
      isParseSuccess={isSuccess}
      isParseError={isError}
      isParseLoading={isLoading}
      inputText={inputText}
    />
  );
};

export default Content;
