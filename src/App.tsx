import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { theme } from "./theme/theme";
import helicoptero from "./assets/helicoptero.jpg";
import monalisa from "./assets/monalisa.jpg";
import mansion from "./assets/mansion.jpg";
import macbook from "./assets/macbook.jpg";
import ferrari from "./assets/ferrari.jpg";
import dolares from "./assets/dolares.jpg";
import avionprivado from "./assets/avionprivado.jpg";
import ps5 from "./assets/ps5.jpg";
import yate from "./assets/yate.jpg";
import marroc from "./assets/marroc.jpg";
import rollroyce from "./assets/rollroyce.jpg";
import rolex from "./assets/rolex.jpg";
import whisky from "./assets/whisky.png";
interface Thing {
  type: string;
  price: number;
  imgUrl?: string;
  quantity?: number | undefined;
}

const thing: Thing[] = [
  {
    type: "Rolex",
    price: 12000,
    imgUrl: rolex,
  },
  {
    type: "Monalisa",
    price: 869000000,
    imgUrl: monalisa,
  },
  {
    type: "Rolls Royce",
    price: 14000000,
    imgUrl: rollroyce,
  },
  {
    type: "Yate",
    price: 450000000,
    imgUrl: yate,
  },
  { type: "vino AurumRed", price: 387923 },
  { type: "mansion", price: 52000000, imgUrl: mansion },
  { type: "macbook", price: 3300, imgUrl: macbook },
  { type: "helicoptero", price: 750000, imgUrl: helicoptero },
  { type: "ferrari", price: 300000, imgUrl: ferrari },
  {
    type: "regalar 200.000 dolares a 100 personas",
    price: 20000000,
    imgUrl: dolares,
  },
  { type: "avion privado", price: 17000000, imgUrl: avionprivado },
  { type: "ps5", price: 500, imgUrl: ps5 },
  { type: "caja marroc x 100", price: 6000, imgUrl: marroc },
  {
    type: "Whisky Macallan Michael Dillon 1926",
    price: 1530000,
    imgUrl: whisky,
  },
];

function App() {
  const [troley, setTroley] = useState<Thing[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddToTroley = (thing: Thing) => {
    const sum = troley.reduce(
      (acc, curr) => acc + curr.price * (curr.quantity || 0) + thing.price,
      0
    );
    if (troley.length > 0 && 217000000000 <= sum) {
      onOpen();
    } else {
      if (troley.length === 0) {
        setTroley([{ ...thing, quantity: 1 }]);
      } else if (troley.length > 0) {
        let troleyItem = troley.find((item) => item.type === thing.type);
        if (troleyItem) {
          troleyItem.quantity && troleyItem.quantity++;
          setTroley([...troley]);
        } else {
          setTroley([...troley, { ...thing, quantity: 1 }]);
        }
      }
    }
  };
  const handleDeleteFromTroley = (thing: Thing) => {
    let filtredProductInTroley = troley.filter(
      (item) => item.type === thing.type
    );
    if (filtredProductInTroley[0].quantity === 1) {
      setTroley([...troley.filter((item) => item.type !== thing.type)]);
    } else {
      filtredProductInTroley[0].quantity &&
        filtredProductInTroley[0].quantity--;
      setTroley([
        ...troley.filter((item) => item.type !== thing.type),
        { ...filtredProductInTroley[0] },
      ]);
    }
  };

  return (
    <Container
      minHeight="100vh"
      maxWidth="100vw"
      backgroundColor={theme.backgroundColor}
      padding={0}
    >
      <Flex
        height="200px"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Text fontSize="4xl" fontWeight="bold" textAlign="center">
            Gasta la plata de Elon Musk
          </Text>
          <p>
            Total de plata de Elon hasta el momento si vendiera todo y lo
            llevaria un banco $217.000.000.000
          </p>
        </Box>
      </Flex>
      <Flex
        position="sticky"
        as="header"
        minWidth="100%"
        height="100px"
        top="0"
        backgroundColor={theme.backgroundHeader}
        justifyContent="space-evenly"
        alignItems="center"
        zIndex="200"
      >
        <Text fontSize="4xl" color={theme.headerTextcolor}>
          {troley.length === 0
            ? (2170000000000).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
              })
            : troley
                .reduce(
                  (acc, item) => acc + item.price * (item.quantity || 0),
                  0
                )
                .toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                })}
        </Text>
        <Text fontSize="4xl" color={theme.headerTextcolor} textAlign="center">
          {troley
            .reduce(
              (acc, item) =>
                acc + (item.price * (item.quantity || 0) * 100) / 217000000000,
              0
            )
            .toFixed(6)}{" "}
          %
        </Text>
      </Flex>
      <Container position="relative" mt="100px" width="100%">
        <Grid
          templateColumns="repeat(4, auto)"
          gap={10}
          justifyContent="center"
        >
          {thing.map((item) => (
            <Box
              width="300px"
              height="400px"
              backgroundColor="whiteAlpha.600"
              borderRadius="lg"
              boxShadow="md"
              position="relative"
              _hover={{
                boxShadow: "xl",
                transform: "scale(1.03)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <Image
                src={item.imgUrl}
                alt={item.type}
                height="270px"
                width="100%"
                objectFit="cover"
              />
              <p>
                {item.type}{" "}
                {item.price.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                })}
              </p>
              <Flex
                width="100%"
                justifyContent="center"
                marginTop={6}
                position="absolute"
                bottom={3}
              >
                <ButtonGroup>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteFromTroley(item)}
                    colorScheme="teal"
                    fontSize="xl"
                  >
                    -
                  </Button>
                  <Text fontSize="xl">
                    {
                      troley.find((troleyitem) => item.type === troleyitem.type)
                        ?.quantity
                    }
                  </Text>
                  <Button
                    variant="solid"
                    onClick={() => handleAddToTroley(item)}
                    colorScheme="teal"
                    fontSize="xl"
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Flex>
            </Box>
          ))}
        </Grid>

        {troley.length > 0 && (
          <Container mt={12}>
            <h2>Recibo</h2>
            {troley.map((item) => (
              <Box>
                <Text fontSize="16px">
                  {item.type} x {item.quantity}............${item.price}
                </Text>
              </Box>
            ))}
            <p></p>
            <Text textAlign="center" mt={10}>
              Total gastado:{" "}
              {troley
                .reduce(
                  (acc, item) => acc + item.price * (item.quantity || 0),
                  0
                )
                .toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                })}
            </Text>
          </Container>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>No tenes suficiente dinero</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default App;
