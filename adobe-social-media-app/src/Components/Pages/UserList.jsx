import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormLabel,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BiShow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserList = () => {
  const toast = useToast();
  let dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userId, setUserId] = useState("");
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const onModelOpen = (id, name, email, bio) => {
    onOpen();
    setUserId(id);
    setUpdatedData({ ...updatedData, name, email, bio });
  };

  const updateUserData = async (id) => {
    try {
      const response = await axios.put(
        `https://long-rose-duck-robe.cyclic.app/users/${id}`,
        updatedData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: response.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      getallUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const getallUsers = async () => {
    try {
      let res = await axios.get("https://long-rose-duck-robe.cyclic.app/users");
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://long-rose-duck-robe.cyclic.app/users/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "User deleted successfully",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      getallUsers();
    } catch (error) {
      console.error(error);
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
                    w={{ base: "90%", sm: "80%", md: "80%", xl: "50%" }}
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
                        onClick={() =>
                          onModelOpen(user._id, user.name, user.email, user.bio)
                        }
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                      <AiFillDelete
                        onClick={() => deleteUser(user._id)}
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
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Update Your Details</ModalHeader>
          <hr style={{ marginTop: "0px" }} />
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
            />
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={updatedData.email}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
            />
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Bio"
              value={updatedData.bio}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, bio: e.target.value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr="10px"
              colorScheme="red"
              variant="solid"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => updateUserData(userId)}
            >
              UPDATE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { UserList };
