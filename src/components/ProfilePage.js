import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ProfileManagement from './ProfileManagement';
import RideStatistics from './RideStatistics';

const ProfilePage = () => {
  return (
    <Box mt={10} p={5}>
      <Heading as="h1" fontSize="xl" mb={5}>User Profile</Heading>
      <ProfileManagement />
      <RideStatistics />
    </Box>
  );
};

export default ProfilePage;
