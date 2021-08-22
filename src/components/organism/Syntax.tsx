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
                    How to write
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
                    <Th>Notice</Th>
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
                    <Td />
                  </Tr>
                  <Tr>
                    <Td>Determination</Td>
                    <Td>
                      {'{'}d{'}'}te-li-pi2-nu-un
                    </Td>
                    <Td>
                      <Text as="sup">d</Text>te-li-pí-nu-un
                    </Td>
                    <Td />
                  </Tr>
                  <Tr>
                    <Td>Broken</Td>
                    <Td>
                      +[UM-MA+ {'{'}d{'}'}_UTU]_-+SZI+
                    </Td>
                    <Td>
                      <Text as="i">
                        <Text as="span" style={{ fontStyle: 'normal' }}>
                          [
                        </Text>
                        UM-MA
                      </Text>{' '}
                      <Text as="sup">d</Text>UTU
                      <Text as="span" style={{ fontStyle: 'normal' }}>
                        ]
                      </Text>
                      -<Text as="i">ŠI</Text>
                    </Td>
                    <Td>
                      Write beginning <Text as="samp">[</Text> AFTER{' '}
                      <Text as="samp">_</Text> or <Text as="samp">+</Text>, and
                      end <Text as="samp">]</Text> BEFORE{' '}
                      <Text as="samp">_</Text> or <Text as="samp">+</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Partial Broken</Td>
                    <Td>[[ma-ah-ha-an]]</Td>
                    <Td>
                      <Text as="i">
                        <Text as="span" style={{ fontStyle: 'normal' }}>
                          ⸢
                        </Text>
                        ma-aḫ-ḫa-an
                        <Text as="span" style={{ fontStyle: 'normal' }}>
                          ⸣
                        </Text>
                      </Text>
                    </Td>
                    <Td>
                      Same as <Text as="samp">Broken</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Missing</Td>
                    <Td>
                      a-ra-{'<'}aḫ{'>'}-zé-na-aš
                    </Td>
                    <Td>
                      a-ra-{'<'}aḫ{'>'}-zé-na-aš
                    </Td>
                    <Td>
                      Same as <Text as="samp">Broken</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Extra</Td>
                    <Td>
                      še-{'<<'}še{'>>'}-er
                    </Td>
                    <Td>
                      še-{'<<'}še{'>>'}-er
                    </Td>
                    <Td>
                      Same as <Text as="samp">Broken</Text>
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
