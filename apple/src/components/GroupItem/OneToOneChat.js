import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatC";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../Configurations/ChatLogic";
import Profile from "../ChatSetUp/Profile";
import UGroup from "../ChatSetUp/UGroup";
import axios from "axios";
import "./style.css";
import ScrollChats from "./ScrollChats";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "./Animation.json";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const OneToOneChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Typing = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 6000; //ms
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const SendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        Toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "19px", md: "19px" }}
            px={0.5}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            marginBottom={0}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              backgroundColor={"transparent"}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UGroup
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            marginTop={0}
          >
            {loading ? (
              <Spinner size="lg" alignSelf="center" margin="auto" />
            ) : (
              <div className="messages">
                <ScrollChats messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={SendMessage} isRequired mt={3}>
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={"27.5px"}
                    width={60}
                    style={{ marginLeft: 0, marginBottom: 0, marginTop: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}

              <Input
                variant="filled"
                bg="#E0E0E0"
                border="1.2px solid black"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={Typing}
                width={"98%"}
                marginLeft={"8px"}
                marginRight={"8px"}
                marginBottom={"4.8px"}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} opacity={0.5}>
            Start Messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default OneToOneChat;
