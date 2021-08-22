import { VFC } from 'react';
import {
  Flex,
  Text,
  Center,
  Image,
  Spacer,
  HStack,
  Link,
} from '@chakra-ui/react';
import { AiOutlineGithub } from 'react-icons/ai';
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
    <Spacer />

    <Center>
      <Text fontSize="x-small" mr="0.5rem">
        Developed by
      </Text>

      <Link href="https://github.com/yustoris" isExternal>
        <HStack spacing="2.5px">
          <AiOutlineGithub />
          <Text fontSize="x-small">yustoris</Text>
        </HStack>
      </Link>
    </Center>
  </Flex>
);

export default Header;
