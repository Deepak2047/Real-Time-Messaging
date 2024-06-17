import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserIcon = ({ user, handleFunction, admin }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      color="teal"
      cursor="pointer"
      onClick={handleFunction}
      border="2px solid teal"
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserIcon
