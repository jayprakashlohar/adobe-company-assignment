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
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({ content: "" });

  const postData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:8080/posts", data, {
        headers: { authorization: token },
      });
      alert("Post create successfully");
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
        <Box>
          <SiAdobe
            style={{ width: "35px", height: "35px", cursor: "pointer" }}
          />
        </Box>
        <Box display="flex" gap="50px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="10px"
            // border="1px solid white"
            cursor="pointer"
            p="0px 5px 0px 5px"
          >
            <AiOutlinePlusCircle
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
            />
            <Text fontWeight="bold" fontSize="20px" onClick={onOpen}>
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
