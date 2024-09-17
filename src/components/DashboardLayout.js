import React from 'react';
import { Box, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import Profile from './Profile'; // Import your Profile component
import ProfileManagement from './ProfileManagement'; // Import ProfileManagement component
import RideHistory from './RideHistory'; // Import RideHistory component
import RideStatistics from './RideStatistics'; // Import RideStatistics component
import RideBooking from './RideBooking'; // Import RideBooking component

const DashboardLayout = ({ user, onUpdate, rideHistory, onConfirmRide }) => {
  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        md: `"header header" "sidebar main"`,
      }}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={{ base: '1fr', md: '250px 1fr' }}
      h="100vh"
      gap="4"
    >
      {/* Profile Section (Top) */}
      <GridItem area="header" bg="gray.100" p={4}>
        <Heading size="lg" textAlign="center">
          Welcome, {user.firstName}!
        </Heading>
        <Box mt={4}>
          <Profile user={user} onUpdate={onUpdate} />
        </Box>
      </GridItem>

      {/* Sidebar (Left) */}
      <GridItem area="sidebar" bg="gray.50" p={4}>
        <VStack align="stretch" spacing={6}>
          <ProfileManagement />
          <RideHistory />
          <RideStatistics rideHistory={rideHistory} />
        </VStack>
      </GridItem>

      {/* Ride Booking (Right) */}
      <GridItem area="main" bg="white" p={4} boxShadow="lg" borderRadius="md">
        <RideBooking onConfirmRide={onConfirmRide} />
      </GridItem>
    </Grid>
  );
};

export default DashboardLayout;
