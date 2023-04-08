import React from "react";
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
  Input,
} from "@chakra-ui/react";
import { SiAdobe } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              <Input placeholder="Type anything...." />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" colorScheme="blue">
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
