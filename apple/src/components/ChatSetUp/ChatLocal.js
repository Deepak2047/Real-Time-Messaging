import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatC";
import OneToOneChat from "../GroupItem/OneToOneChat";

const ChatLocal = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={"0.36rem"}
      background={"white"}
      width={{ base: "100%", md: "68.6%" }}
      borderRadius="lg"
      borderWidth="1px"
      height="100%"
      justifyContent={"center"}
    >
      <OneToOneChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatLocal;
