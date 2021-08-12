import { VFC } from 'react';
import { Text } from '@chakra-ui/react';

const ParseStatus: VFC<{
  isParseError: boolean;
  isParseLoading: boolean;
  isEmpty: boolean;
  isParseSuccess: boolean;
}> = ({ isParseError, isParseLoading, isEmpty, isParseSuccess }) => {
  if (isParseError) {
    return (
      <>
        Error ! if nothing is showed below, something wrong caused on the
        bacground
      </>
    );
  }

  if (isParseLoading) {
    return <>Parsing...</>;
  }

  if (isEmpty) {
    return <>Empty, write something</>;
  }

  if (isParseSuccess) {
    return <Text color="blue.500">Successfully rendered!</Text>;
  }

  return <></>;
};

export default ParseStatus;
