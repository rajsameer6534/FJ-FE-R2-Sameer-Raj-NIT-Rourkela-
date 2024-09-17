// src/components/RideStatistics.js
import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Divider, Icon, Badge, Progress, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaCar, FaRoute, FaMoneyBillWave } from 'react-icons/fa';

const RideStatistics = ({ rideHistory }) => {
  const [rideStats, setRideStats] = useState({
    totalRides: 0,
    totalDistance: 0,
    totalAmountSpent: 0,
  });

  useEffect(() => {
    const calculateRideStats = (rides) => {
      let totalRides = rides.length;
      let totalDistance = 0;
      let totalAmountSpent = 0;

      rides.forEach(ride => {
        totalDistance += ride.distance;
        totalAmountSpent += ride.fare;
      });

      return {
        totalRides,
        totalDistance,
        totalAmountSpent,
      };
    };

    if (rideHistory.length > 0) {
      const stats = calculateRideStats(rideHistory);
      setRideStats(stats);
    }
  }, [rideHistory]); // Depend on rideHistory

  // Color modes for light and dark theme
  const boxBgColor = useColorModeValue('gray.50', 'gray.700');
  const headingColor = useColorModeValue('purple.600', 'purple.300');
  const badgeColor = useColorModeValue('green.500', 'green.300');
  
  return (
    <Box
      p={8}
      maxW="600px"
      bgGradient="linear(to-r, teal.500, blue.500)"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      _hover={{ boxShadow: "2xl", transform: "scale(1.02)", transition: "0.3s ease" }}
      transition="0.3s ease"
      overflow="hidden"
    >
      <VStack spacing={5} align="stretch">
        <Heading size="lg" mb={4} textAlign="center" color={headingColor}>
          Ride Statistics
        </Heading>
        <Divider />

        <HStack justify="space-between" align="center">
          <HStack>
            <Icon as={FaCar} w={6} h={6} color="yellow.400" />
            <Text fontSize="lg" fontWeight="bold">Total Rides:</Text>
          </HStack>
          <Badge colorScheme="green" fontSize="1.2em">{rideStats.totalRides}</Badge>
        </HStack>

        <HStack justify="space-between" align="center">
          <HStack>
            <Icon as={FaRoute} w={6} h={6} color="cyan.400" />
            <Text fontSize="lg" fontWeight="bold">Total Distance:</Text>
          </HStack>
          <Badge colorScheme="blue" fontSize="1.2em">{rideStats.totalDistance} km</Badge>
        </HStack>

        <HStack justify="space-between" align="center">
          <HStack>
            <Icon as={FaMoneyBillWave} w={6} h={6} color="green.400" />
            <Text fontSize="lg" fontWeight="bold">Total Amount Spent:</Text>
          </HStack>
          <Badge colorScheme="red" fontSize="1.2em">Rs. {rideStats.totalAmountSpent}</Badge>
        </HStack>

        <Box mt={4}>
          <Text mb={2} fontWeight="semibold">Distance Progress</Text>
          <Progress colorScheme="blue" size="lg" value={(rideStats.totalDistance / 1000) * 100} />
        </Box>

        <Box>
          <Text mb={2} fontWeight="semibold">Spending Progress</Text>
          <Progress colorScheme="red" size="lg" value={(rideStats.totalAmountSpent / 5000) * 100} />
        </Box>
      </VStack>
    </Box>
  );
};

export default RideStatistics;
