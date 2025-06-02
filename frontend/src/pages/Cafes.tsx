import {
  Button,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Axios from "axios";

// [
//     {
//         "id": 2,
//         "cafeName": "name1",
//         "cafeLocation": "location1"
//     },
//     {
//         "id": 6,
//         "cafeName": "name2",
//         "cafeLocation": "location2"
//     },
//     {
//         "id": 7,
//         "cafeName": "name3",
//         "cafeLocation": "location3"
//     }
// ]

const Cafes = () => {
  const [data, setData] = useState(null);
  // Handle edit cafe info
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [cafeName, setCafeName] = useState("");
  const [cafeLocation, setCafeLocation] = useState("");
  const [editedId, setEditedId] = useState("");

  const handleEdit = async () => {
    try {
      await fetch(`http://localhost:5002/cafes/` + editedId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cafeName: cafeName,
          cafeLocation: cafeLocation,
        }),
      });
      setCafeName("");
      setCafeLocation("");
      onClose();
      getData();
    } catch (error) {
      console.error("Error editing cafe:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5002/cafes/` + editedId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cafeName: cafeName,
          cafeLocation: cafeLocation,
        }),
      });
    } catch (error) {
      console.error("Error deleting cafe:", error);
    }
  };

  // TODO
  const handleAdd = async () => {
    try {
      await fetch(`http://localhost:5002/cafes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cafeName: cafeName,
          cafeLocation: cafeLocation,
        }),
      });
    } catch (error) {
      console.error("Error adding cafe:", error);
    }
  };

  const editIndex = (i: number) => {
    setEditedId(Object(data)[i].id);
    setCafeName(Object(data)[i].cafeName);
    setCafeLocation(Object(data)[i].cafeLocation);
  };

  const getData = async () => {
    const response = await Axios.get("http://localhost:5002/cafes");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Flex alignItems="center" direction="column" gap="2vh" padding="3vh">
      <Button
        fontFamily="darumadrop"
        fontSize="5xl"
        color="#DC6739"
        variant="plain"
      >
        <a href="/home">Café Chronicles</a>
      </Button>

      <Text fontSize="3xl"> Cafés </Text>
      {/* Flex Container */}
      <Flex
        alignItems="center"
        maxH="70vh"
        overflowY="auto"
        scrollBehavior="smooth"
        direction="column"
        width="100%"
        gap="2vh"
        padding="18px"
      >
        {data == null ||
          Object(data).map((cafe, index) => (
            <Flex
              key={index}
              direction="column"
              bgColor="white"
              width="80%"
              alignItems="center"
              justifyContent="center"
              gap="1vh"
              padding="2vh"
              borderRadius="40px"
              shadow="2xl"
            >
              <Text fontSize="2xl">{cafe.cafeName}</Text>
              <Text fontSize="lg">{cafe.cafeLocation}</Text>
              <Button
                background="#DC6739"
                onClick={() => {
                  editIndex(index);
                  onOpen();
                }}
              >
                Edit
              </Button>
              <Button
                background="#DC6739"
                onClick={() => {
                  handleDelete();
                  getData();
                }}
              >
                Delete
              </Button>
            </Flex>
          ))}
      </Flex>

      {/* Add New Cafe Button */}
      <Button
        background="#3970B5"
        color="white"
        borderRadius="50px"
        width="50%"
        onClick={() => {
          onOpen();
        }}
      >
        Add New
      </Button>

      {/* Edit cafe popup */}
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Café</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Café Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder={cafeName}
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Café Location</FormLabel>
              <Input
                placeholder={cafeLocation}
                value={cafeLocation}
                onChange={(e) => setCafeLocation(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Cafes;
