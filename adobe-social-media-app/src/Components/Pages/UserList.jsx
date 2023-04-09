import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BiShow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserList = () => {
  const [userData, setUserData] = useState([]);

  const getallUsers = async () => {
    try {
      let res = await axios.get("http://localhost:8080/users");
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getallUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Box>
        <Heading
          textAlign="center"
          m="20px"
          fontSize="30px"
          fontFamily="cursive"
        >
          List Of Users
        </Heading>

        <Box>
          {userData &&
            userData.map((user) => {
              return (
                <Box key={user._id}>
                  <Box
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    borderRadius="5px"
                    w="50%"
                    m="auto"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    color="#ffff"
                    fontFamily="cursive"
                    p="10px"
                    mb="20px"
                  >
                    <Box>
                      <Text>Name : {user.name}</Text>
                      <Text>Email : {user.email}</Text>
                    </Box>
                    <Box display="flex" gap="20px">
                      <Link to={`/singleuser/${user._id}`}>
                        {" "}
                        <BiShow
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                      <AiFillEdit
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                      <AiFillDelete
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export { UserList };
