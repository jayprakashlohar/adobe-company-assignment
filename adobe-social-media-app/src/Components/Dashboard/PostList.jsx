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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "../Redux/postSlice";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import { BiShow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const PostList = () => {
  let dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let data = useSelector((state) => state.post.allPost);
  // console.log("data", data);

  // const getUserName = async (id) => {
  //   try {
  //     let res = await axios.get(`http://localhost:8080/users/${id}`);
  //     let { name } = res.data;
  //     console.log("res", res);
  //     return name;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const likePost = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${id}/like`,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };
  const dislikePost = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${id}/unlike`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/posts/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Post deleted successfully");
      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(fetchAllPost());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllPost());
  }, []);

  return (
    <>
      <Navbar />
      <Box h="100vh" mt="50px">
        <Box>
          {data &&
            data.map((post) => {
              return (
                <Box
                  key={post._id}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  color="#ffff"
                  m="auto"
                  w={{ base: "90%", sm: "90%", md: "45%", xl: "45%" }}
                  p="10px 10px 0px 10px"
                  mb="20px"
                  borderRadius="5px"
                >
                  {/* <p>{post.created_at}</p> */}
                  <Text
                    fontWeight="600"
                    fontSize="20px"
                    fontFamily="cursive"
                    textAlign="center"
                  >
                    {post.content}
                  </Text>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="5px"
                    p="10px 0px 5px 5px"
                  >
                    <AiFillLike
                      onClick={() => likePost(post._id)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />

                    <p>{post.likes}likes</p>
                    <AiFillDislike
                      onClick={() => dislikePost(post._id)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />
                    <Box display="flex" ml="65%" gap="10px">
                      <BiShow
                        style={{
                          width: "23px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />

                      <AiFillEdit
                        onClick={onOpen}
                        style={{
                          width: "23px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />

                      <AiFillDelete
                        onClick={() => deletePost(post._id)}
                        style={{
                          width: "23px",
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
          <ModalHeader textAlign="center">Update Your Post</ModalHeader>
          <hr style={{ marginTop: "0px" }} />
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Typing..."
              // value={data.content}
              // onChange={(e) =>
              //   setData({ ...data, content: e.target.value })
              // }
            />
          </ModalBody>

          <ModalFooter>
            <Button mr="10px" onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">UPDATE</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { PostList };
