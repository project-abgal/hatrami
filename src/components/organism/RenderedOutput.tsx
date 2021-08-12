import { VFC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Box, Text, OrderedList, ListItem, Heading } from '@chakra-ui/react';
import {
  TransliterationWord,
  TransliterationCharacter,
} from '../../data/Transliteration';
import { ParseTransliterationError } from '../../domain/backend';

const renderSubWords = (
  transliteration: TransliterationCharacter[],
  separator: string,
) =>
  transliteration.reduce(
    (acc, { reading, number }: TransliterationCharacter, idx) => (
      <>
        {acc}
        {idx > 0 ? separator : ''}
        {reading}
        {number > 3 ? <Text as="sub">{number}</Text> : <></>}
      </>
    ),
    <></>,
  );

// Render each word, connected by a separater defined per word type
const renderWord = ({ type, transliteration }: TransliterationWord) => {
  // e.g. Ú-UL
  if (type === 'akkadogram') {
    return (
      <Text as="i" color="orange.700">
        {renderSubWords(transliteration, '-')}
      </Text>
    );
  }

  // e.g. ḪI.A
  if (type === 'determination') {
    return (
      <Text as="sup" color="cyan.700">
        {renderSubWords(transliteration, '.')}
      </Text>
    );
  }

  // e.g. LUGAL.GAL
  if (type === 'sumerogram') {
    return (
      <Text as="span" color="green.700">
        {renderSubWords(transliteration, '.')}
      </Text>
    );
  }

  // Hittite, e.g. ḫa-a-ra-aš
  return <Text as="i">{renderSubWords(transliteration, '-')}</Text>;
};

// By connecting the separater '-' (e.g. Ú-UL-wa-ra-an),
// notice that we ignore if determinations preceds or follows (e.g. {d}te-li-pí-nu-un), ḫa-a-ra-aš{MUŠEN})
const renderWords = (words: TransliterationWord[]) =>
  words.reduce(
    (wordElem, word, idx) => (
      <>
        {wordElem}
        {idx === 0 ||
        (idx === 1 && words[idx - 1].type === 'determination') ||
        words[idx].type === 'determination'
          ? ''
          : '-'}
        {renderWord(word)}
      </>
    ),
    <></>,
  );

const generateKey = (sentence: TransliterationWord[][]): string =>
  sentence.reduce(
    (concat, words) =>
      concat +
      words.reduce(
        (cw, word) =>
          cw + word.transliteration.reduce((ct, tr) => ct + tr.reading, ''),
        '',
      ),
    '',
  );

const renderSentence = (sentence: TransliterationWord[][]) => (
  <ListItem key={generateKey(sentence)}>
    <Box pl={4}>
      {(sentence ?? []).reduce(
        (wordsElem, words: TransliterationWord[]) => (
          <>
            {wordsElem} {renderWords(words)}
          </>
        ),
        <></>,
      )}
    </Box>
  </ListItem>
);

const renderParsedTransliteration = (sentences: TransliterationWord[][][]) => (
  <OrderedList>
    {sentences.map((sentence: TransliterationWord[][]) =>
      renderSentence(sentence),
    )}
  </OrderedList>
);

interface TransliterationProps {
  transliteration: TransliterationWord[][][];
  error: ParseTransliterationError | null;
}

const renderError = (error: ParseTransliterationError) => {
  const errorString = `See line ${error.detail.line}, column ${error.detail.column}\n\n${error.detail.context}`;

  return (
    <>
      <Heading as="h3" fontSize="md" fontWeight="bold">
        Error Message
      </Heading>
      <Box m="1rem">Parse error</Box>

      <Heading as="h3" fontSize="md" fontWeight="bold">
        Details
      </Heading>
      <Box m="1rem">
        <SyntaxHighlighter language="plaintext">
          {errorString}
        </SyntaxHighlighter>
      </Box>
    </>
  );
};

const RenderedOutput: VFC<TransliterationProps> = ({
  transliteration,
  error,
}) => (
  <Box
    mt="2rem"
    p="4"
    bg="white"
    shadow="md"
    rounded="md"
    border={error ? '2px' : undefined}
    borderColor={error ? 'red.500' : undefined}
  >
    {error ? renderError(error) : renderParsedTransliteration(transliteration)}
  </Box>
);

export default RenderedOutput;
