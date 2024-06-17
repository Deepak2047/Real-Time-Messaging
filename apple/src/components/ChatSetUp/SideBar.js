import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BellIcon, MoonIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatC";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import Load from "./Load";
import UserSeq from "../GroupItem/UserSeq";
import { getSender } from "../../Configurations/ChatLogic";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
   const { colorMode, toggleColorMode } = useColorMode();

  const {
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const Search = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const Access = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        bg="white"
        w="100%"
        p="3px 8px 3px 8px"
        borderWidth="3px"
        maxH={"45px"}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text
              display={{ base: "none", md: "flex" }}
              px={3}
              color={"#274472"}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Voyager</Text>
        <div>
          <Menu marginRight={0}>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.ROTATE_Y}
              />
              <BellIcon fontSize="2xl" m={0.5} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton >
              <MoonIcon margin={2} marginRight={3} cursor="pointer" />
           
            </MenuButton>

            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              marginLeft={0}
              marginTop={0.8}
            />
            <Button
              colorScheme="#274472"
              variant="outline"
              size="sm"
              marginLeft={2}
              onClick={logout}
            >
              Logout
            </Button>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={Search}>Go</Button>
            </Box>
            {loading ? (
              <Load />
            ) : (
              searchResult?.map((user) => (
                <UserSeq
                  key={user._id}
                  user={user}
                  handleFunction={() => Access(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
