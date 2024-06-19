import React from 'react'
//import { ChatState } from '../../Context/ChatProvider';
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserSeq = ({user, handleFunction }) => {
 // const { user } = ChatState();
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      justifyItems={"center"}
       px={3}
       py={2}
      mb={2}
      borderRadius="lg"
       height={"3.5rem"}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
      />
      <Box>
        <Text marginBottom={0} marginTop={2}>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserSeq;
