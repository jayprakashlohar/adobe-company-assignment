// import React, { useEffect, useState } from "react";
// import { Box, Heading, Text } from "@chakra-ui/react";
// import { Navbar } from "../Navbar/Navbar";
// import axios from "axios";

// const Analytics = () => {
//   const [countUser, setCountUser] = useState(0);
//   const [countPost, setCountPost] = useState(0);
//   const [countLike, setCountLike] = useState([]);

//   const getTotalUsers = async () => {
//     try {
//       let res = await axios.get("http://localhost:8080/users/analytics/users");
//       setCountUser(res.data.count);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getTotalPost = async () => {
//     try {
//       let res = await axios.get("http://localhost:8080/posts/analytics/posts");
//       setCountPost(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const topLikes = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8080/posts/analytics/posts/top-liked"
//       );
//       console.log("res", res.data);
//     //   setCountLike(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   console.log("countLike", countLike);

//   useEffect(() => {
//     getTotalUsers();
//     getTotalPost();
//     topLikes();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Box>
//         <Box
//           w="90%"
//           m="auto"
//           h="400px"
//           mt="20px"
//           display="flex"
//           justifyContent="space-around"
//         >
//           <Box border="1px solid teal " w="40%">
//             <Heading textAlign="center" fontSize="25px " fontFamily="cursive">
//               Total Number Of Users
//             </Heading>
//             <Text
//               textAlign="center"
//               fontSize="30px"
//               fontWeight="bold"
//               color="green"
//             >
//               {countUser}
//             </Text>
//           </Box>
//           <Box border="1px solid teal " w="40%">
//             <Heading textAlign="center" fontSize="25px" fontFamily="cursive">
//               Top-Five Active Users
//             </Heading>
//           </Box>
//         </Box>
//         <Box
//           w="90%"
//           m="auto"
//           h="400px"
//           mt="20px"
//           display="flex"
//           justifyContent="space-around"
//         >
//           <Box border="1px solid teal " w="40%">
//             <Heading textAlign="center" fontSize="25px" fontFamily="cursive">
//               Total Number Of Posts
//             </Heading>
//             <Text
//               textAlign="center"
//               fontSize="30px"
//               fontWeight="bold"
//               color="green"
//             >
//               {countPost}
//             </Text>
//           </Box>
//           <Box border="1px solid teal " w="40%">
//             <Heading textAlign="center" fontSize="25px" fontFamily="cursive">
//               Top-Five Most Liked Posts
//             </Heading>
//             {countLike &&
//               countLike.map((user) => {
//                 return (
//                   <Box key={user.user_id}>
//                     <Text>{user.content}</Text>
//                   </Box>
//                 );
//               })}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export { Analytics };
