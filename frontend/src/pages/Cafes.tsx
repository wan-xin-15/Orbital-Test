import { Button, Flex, Text } from "@chakra-ui/react";
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

      <Text fontSize="3xl"> Cafes List hehe </Text>
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
              <Button background="#DC6739">Edit</Button>
              <Button background="#DC6739">Delete</Button>
            </Flex>
          ))}
      </Flex>

      {/* Add New Cafe Button */}
      <Button
        background="#3970B5"
        color="white"
        borderRadius="50px"
        width="50%"
      >
        Add New
      </Button>
    </Flex>
  );
};

export default Cafes;
