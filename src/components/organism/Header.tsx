import { VFC } from 'react';
import { Flex, Text, Center, Image } from '@chakra-ui/react';
import logo from '../../data/logo.png';

const Header: VFC = () => (
  <Flex
    as="header"
    position="fixed"
    bg="white"
    top={0}
    width="full"
    shadow="sm"
    py={4}
    px={16}
  >
    <Center>
      <Image
        borderRadius="full"
        shadow="md"
        boxSize="48px"
        src={logo}
        alt="ḫatrami logo"
      />
      <Text ml="1.25rem" fontWeight="bold" fontSize="2xl">
        Ḫatrami
      </Text>
      <Text ml="2rem" fontSize="sm">
        Simple ATF subset editor and renderer for Hittite transliteration
      </Text>
    </Center>
  </Flex>
);

export default Header;
