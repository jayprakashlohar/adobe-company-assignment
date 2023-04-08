import React from "react";
import {
  Box,
  Text,
  Heading,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SiAdobe } from "react-icons/si";
import { useState } from "react";
import { loginUser } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiHide, BiShowAlt } from "react-icons/bi";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData))
      .then((res) => {
        alert(res.response);
        if (res.response === "You are successfully logged in") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <Box
        h="100vh"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        display="flex"
        justifyContent="space-around"
        // alignItems="center"
        // backgroundImage="url('https://auth.services.adobe.com/img/canvas/TomHegen.jpg')"
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
      >
        <Box w="30%" h="100px" mt="20%">
          <Box display="flex" alignItems="center">
            <SiAdobe
              style={{ color: "#ffff", width: "50px", height: "50px" }}
            />
            <Text ml="10px" fontWeight="bold" fontSize="30px" color="#fff">
              Adobe
            </Text>
          </Box>
          <Text color="#ffff" fontSize="20px" fontWeight="500">
            Sign in or create an account
          </Text>
        </Box>

        {/* Login Box */}
        <Box
          w="35%"
          h="500px"
          mt="80px"
          background="#ffff"
          p="25px"
          borderRadius="5px"
        >
          <Heading textAlign="center" m="20px" fontFamily="cursive">
            Login here
          </Heading>
          <form onSubmit={handleSignup}>
            <FormLabel mt="10px" fontFamily="cursive">
              Email{" "}
            </FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              variant="flushed"
              required
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />

            <FormLabel mt="10px" fontFamily="cursive">
              Password{" "}
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                variant="flushed"
                required
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  background="none"
                  onClick={handleClick}
                >
                  {show ? (
                    <BiHide style={{ width: "20px", height: "20px" }} />
                  ) : (
                    <BiShowAlt style={{ width: "20px", height: "20px" }} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              type="submit"
              w="100%"
              m="auto"
              mt="40px"
              borderRadius="20px"
              fontWeight="bold"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              color="#ffff"
              _hover="none"
            >
              LOGIN
            </Button>

            <p
              style={{
                textAlign: "center",
                margin: "20px",
                fontFamily: "cursive",
              }}
            >
              Don't have an account?
              <Link to="/">
                <span
                  style={{
                    fontWeight: "bold",
                    fontFamily: "cursive",
                    cursor: "pointer",
                    color: "blue",
                  }}
                >
                  Sign up
                </span>
              </Link>
            </p>
          </form>
        </Box>
      </Box>
    </>
  );
};

export { Login };
