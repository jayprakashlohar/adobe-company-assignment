import React, { useEffect, useState } from "react";
import {
  Box,
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
  Textarea,
  Select,
} from "@chakra-ui/react";
import { SiAdobe } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { fetchAllPost } from "../Redux/postSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState({ user_id: "", content: "" });

  const postData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (data.user_id) {
        const response = await axios.post(
          "https://long-rose-duck-robe.cyclic.app/posts",
          data,
          {
            headers: { authorization: token },
          }
        );
        setData({ ...data, content: "" });
        alert("Post create successfully");
        dispatch(fetchAllPost());
      } else {
        alert("Please select user");
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getallUsers();
  }, []);

  return (
    <>
      <Box
        w="full"
        p="10px"
        display="flex"
        justifyContent="space-between"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        color="#ffff"
      >
        <Link to="/">
          {" "}
          <Box>
            <SiAdobe
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </Box>
        </Link>
        <Box display="flex" gap="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
            cursor="pointer"
            p="0px 5px 0px 5px"
          >
            <Link to="/postlist">
              <Text
                fontWeight="bold"
                fontSize={{ base: "15px", sm: "20px", md: "20px", xl: "20px" }}
                fontFamily="cursive"
                _hover={{ textDecoration: "underline" }}
              >
                Post List
              </Text>
            </Link>
            <Link to="/userlist">
              <Text
                fontWeight="bold"
                fontSize={{ base: "15px", sm: "20px", md: "20px", xl: "20px" }}
                fontFamily="cursive"
                _hover={{ textDecoration: "underline" }}
              >
                User List
              </Text>
            </Link>
            <Link to="/analytics">
              <Text
                fontWeight="bold"
                fontSize={{ base: "15px", sm: "20px", md: "20px", xl: "20px" }}
                fontFamily="cursive"
                _hover={{ textDecoration: "underline" }}
              >
                Analytics
              </Text>
            </Link>

            <Text
              fontWeight="bold"
              fontSize={{ base: "15px", sm: "20px", md: "20px", xl: "20px" }}
              fontFamily="cursive"
              onClick={onOpen}
              _hover={{ textDecoration: "underline" }}
            >
              Create
            </Text>
          </Box>

          <Box>
            <FaUserCircle
              style={{
                width: "35px",
                height: "35px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Create new post</ModalHeader>
            <hr style={{ marginTop: "0px" }} />
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder="Typing..."
                value={data.content}
                onChange={(e) => setData({ ...data, content: e.target.value })}
              />
              <Box mt="20px">
                <Select
                  placeholder="Select User"
                  onChange={(e) =>
                    setData({ ...data, user_id: e.target.value })
                  }
                >
                  {userData &&
                    userData.map((user) => {
                      return <option value={user._id}>{user.name}</option>;
                    })}
                </Select>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                background="blue"
                color="#ffff"
                _hover="none"
                w="100px"
                onClick={postData}
              >
                ADD
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export { Navbar };
