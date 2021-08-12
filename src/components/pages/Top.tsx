import { VFC } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from '../organism/Header';
import Content from '../../containers/organism/Content';

const Top: VFC = () => (
  <Flex bg="gray.50" w="100vw" h="100vh">
    <Header />
    <Content />
  </Flex>
);

export default Top;
