import { VFC } from 'react';
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { MinusIcon, AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons';

const Syntax: VFC = () => (
  <Accordion mb="2rem" allowMultiple>
    <Box bg="white" rounded="md" borderWidth="1px">
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Center>
                    <QuestionOutlineIcon fontSize="16px" mr="8px" />
                    Syntax
                  </Center>
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table variant="simple" rounded="md" borderWidth="1px">
                <Thead bg="blue.50">
                  <Tr>
                    <Th>Category</Th>
                    <Th>Input</Th>
                    <Th>Rendered Output</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Sumerogram</Td>
                    <Td>_gu4_</Td>
                    <Td>
                      GU<Text as="sub">4</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Akkadogram</Td>
                    <Td>+u2-ul+</Td>
                    <Td>
                      <Text as="i">Ú-UL</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Determination</Td>
                    <Td>
                      {'{'}d{'}'}te-li-pi2-nu-un
                    </Td>
                    <Td>
                      <Text as="sup">d</Text>te-li-pí-nu-un
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Box>
  </Accordion>
);

export default Syntax;
