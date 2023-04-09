import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import { FaUserCircle } from "react-icons/fa";

const SingleUser = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <Box h="100vh">
        <Box w="80%" border="1px solid teal" m="auto" h="550px" mt="25px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="50px"
          >
            <FaUserCircle style={{ width: "120px", height: "120px" }} />
            <Text>User Name</Text>
            <Button>EDIT PROFILE</Button>
            <Button>LOGOUT</Button>
          </Box>

          <Box display="flex" justifyContent="center" gap="20px" ml="110px">
            <Text fontWeight="bold">Posts</Text>
            <Text fontWeight="bold"> followers</Text>
            <Text fontWeight="bold">following</Text>
          </Box>

          <Box mt="10px" ml="45%">
            <Text fontWeight="bold">Bio</Text>
          </Box>
          <Box borderTop="1px solid gray" w="90%" m="auto" mt="20px"></Box>
          <Box>all post</Box>
        </Box>
      </Box>
    </>
  );
};

export { SingleUser };
