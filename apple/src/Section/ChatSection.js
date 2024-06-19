import React, { useState } from "react";
//import axios from "axios";
import { ChatState } from "../Context/ChatC";
import { Box } from "@chakra-ui/react";
import SideBar from "../components/ChatSetUp/SideBar";
import MyChats from "../components/ChatSetUp/MyChats";
import ChatLocal from "../components/ChatSetUp/ChatLocal";


const ChatSection = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="92.5vh"
        padding="4px"
        position={"fixed"}
      >
      
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatLocal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatSection;
