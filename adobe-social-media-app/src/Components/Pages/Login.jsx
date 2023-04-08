import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { SiAdobe } from "react-icons/si";

const Login = () => {
  return (
    <>
      <Box
        h="100vh"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        display="flex"
        justifyContent="space-around"
        // alignItems="center"
        // backgroundImage="url('https://t3.ftcdn.net/jpg/00/21/70/82/360_F_21708280_RFKz4O7ImQluB9FgX2mUYFUNDmlLokX6.jpg')"
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
      >
        <Box border="1px solid black" w="30%" h="100px" mt="15%">
          <Box display="flex" alignItems="center">
            <SiAdobe />
            <Text>Adobe</Text>
          </Box>
        </Box>
        <Box border="1px solid black" w="35%" h="550px" mt="30px"></Box>
      </Box>
    </>
  );
};

export { Login };
