import React, { useState } from "react";
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
  const [data, setData] = useState({ content: "" });

  const postData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:8080/posts", data, {
        headers: { authorization: token },
      });
      alert("Post create successfully");
      dispatch(fetchAllPost());
    } catch (error) {
      console.log(error);
    }
  };

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
        <Link to="/postlist">
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
                fontSize="20px"
                fontFamily="cursive"
                _hover={{ textDecoration: "underline" }}
              >
                Post List
              </Text>
            </Link>
            <Link to="/userlist">
              <Text
                fontWeight="bold"
                fontSize="20px"
                fontFamily="cursive"
                _hover={{ textDecoration: "underline" }}
              >
                User List
              </Text>
            </Link>

            <Text
              fontWeight="bold"
              fontSize="20px"
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
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={postData}>
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
