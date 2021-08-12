import { AxiosResponse } from 'axios';
import { VFC } from 'react';
import { useMutation } from 'react-query';
import { saveAs } from 'file-saver';
import { downloadTransliteration } from '../../domain/backend';
import DocxDownloadButtonComponent from '../../components/monocule/DocxDownloadButton';

const DocxDownloadButton: VFC<{
  inputText: string;
  isParseError: boolean;
}> = ({ inputText, isParseError }) => {
  const executeDownload = (result: AxiosResponse<ArrayBuffer>) => {
    const blob = new Blob([result.data]);
    saveAs(blob, 'hatrami_transliteration.docx');
  };

  const { mutate, isLoading } = useMutation(
    `${inputText}-download`,
    downloadTransliteration,
    {
      onSuccess: executeDownload,
    },
  );

  const onDownload = (): void => {
    mutate(inputText);
  };

  return (
    <DocxDownloadButtonComponent
      isDownloadLoading={isLoading}
      isParseError={isParseError}
      isEmpty={inputText.length === 0}
      onDownload={onDownload}
    />
  );
};

export default DocxDownloadButton;
