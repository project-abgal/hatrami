import { VFC, Dispatch } from 'react';
import { Box, Flex, Heading, Spacer, Textarea } from '@chakra-ui/react';
import Syntax from './Syntax';
import { TransliterationWord } from '../../data/Transliteration';
import DocxDownloadButton from '../../containers/monocule/DocxDownloadButton';
import RenderedOutput from './RenderedOutput';
import ParseStatus from '../monocule/ParseStatus';
import { ParseTransliterationError } from '../../domain/backend';

interface ParseRequestResult {
  error: ParseTransliterationError | null;
  results: TransliterationWord[][][];
}

const Content: VFC<{
  setInputText: Dispatch<string>;
  inputText: string;
  isParseLoading: boolean;
  isParseSuccess: boolean;
  isParseError: boolean;
  parseRequestResult: ParseRequestResult;
}> = ({
  setInputText,
  parseRequestResult,
  inputText,
  isParseLoading,
  isParseSuccess,
  isParseError,
}) => {
  const { error, results } = parseRequestResult;

  return (
    <Box w="75rem" mt="6rem" mx="auto">
      <Box mt={8} mb="4rem">
        <Heading fontSize="large" mb="1rem">
          Input transliteration
        </Heading>
        <Textarea
          bg="white"
          placeholder="Write transliteration"
          mb={2}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Syntax />
      </Box>

      <Box>
        <Heading fontSize="large">Rendered output</Heading>
        <Box h="1rem" py="10px">
          <ParseStatus
            isParseError={isParseError}
            isParseSuccess={isParseSuccess}
            isParseLoading={isParseLoading}
            isEmpty={inputText.trim().length === 0}
          />
        </Box>
        <RenderedOutput transliteration={results} error={error} />
        <Flex>
          <Spacer />
          <DocxDownloadButton
            isParseError={isParseError}
            inputText={inputText}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Content;
