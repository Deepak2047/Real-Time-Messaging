import React from 'react'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  TabPanel,
} from "@chakra-ui/react";

import Login from '../components/UserIdentity/Login';
import Signup from '../components/UserIdentity/Signup';

import  { useEffect } from "react";
import { useHistory } from "react-router-dom";

const HomeSection = () => {
   const history = useHistory();

   useEffect(() => {
     const user = JSON.parse(localStorage.getItem("userInfo"));
     

     if (user) history.push("/chats");
     
   }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        justifyContent={"center"}
        bg={"white"}
        w={"80%"}
        p={"1.6"}
        m="70px 0 15px 0"
        borderRadius={"4px"}
        borderWidth={"1px"}
        fontFamily={'"Poppins", sans-serif'}
      >
        <Text
          fontSize={"1.6rem"}
          textAlign={"center"}
          paddingBottom={"4px"}
        >
          Voyager
         
        </Text>
        <Tabs variant="soft-rounded" colorScheme="green" color={"black"} mt={'1.5em'}>
          <TabList >
            <Tab width="50%" >Log in</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
             <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomeSection
