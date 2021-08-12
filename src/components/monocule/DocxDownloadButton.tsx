import { DownloadIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { VFC } from 'react';
import { BeatLoader } from 'react-spinners';

const DocxDownloadButton: VFC<{
  onDownload: () => void;
  isDownloadLoading: boolean;
  isParseError: boolean;
  isEmpty: boolean;
}> = ({ onDownload, isDownloadLoading, isParseError, isEmpty }) => (
  <Button
    mt="10px"
    leftIcon={<DownloadIcon />}
    colorScheme="teal"
    variant="solid"
    onClick={(_) => {
      onDownload();
    }}
    width="200px"
    disabled={isDownloadLoading || isParseError || isEmpty}
    isLoading={isDownloadLoading}
    spinner={<BeatLoader size={8} color="white" />}
  >
    Download (docx)
  </Button>
);

export default DocxDownloadButton;
