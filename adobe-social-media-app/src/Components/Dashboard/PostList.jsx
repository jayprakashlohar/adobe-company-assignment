import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "../Redux/postSlice";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
// import { BsThreeDots } from "react-icons/bs";

const PostList = () => {
  let dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchAllPost());
  }, []);


  

  return (
    <>
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
                  w="40%"
                  mb="20px"
                  borderRadius="5px"
                >
                  {/* <BsThreeDots
                    style={{
                      flot: "right",
                      padding: "10px",
                      color: "black",
                    }}
                  /> */}
                  <Box>{/* <Text>{getUserName(post.user_id)}</Text> */}</Box>
                  <Text
                    fontWeight="bold"
                    fontSize="25px"
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
                    <AiOutlineHeart
                      onClick={() => likePost(post._id)}
                      style={{
                        width: "23px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                    />
                    <p>{post.likes}likes</p>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export { PostList };
