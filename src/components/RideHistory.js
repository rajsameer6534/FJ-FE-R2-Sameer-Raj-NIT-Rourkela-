import React, { useEffect, useState } from 'react';
import { 
  Box, Heading, Text, VStack, HStack, Divider, Badge, Icon, Flex, Stack, useColorModeValue 
} from '@chakra-ui/react';
import { FaCarAlt, FaDollarSign, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);

  useEffect(() => {
    const storedRideHistory = JSON.parse(localStorage.getItem('rideHistory')) || [];
    setRideHistory(storedRideHistory);
  }, []);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const cardShadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Box mt={8} p={5} borderRadius="lg" bg={bgColor} boxShadow="md">
      <Heading fontSize="2xl" mb={5} textAlign="center" color={textColor}>
        Ride History
      </Heading>

      {rideHistory.length > 0 ? (
        <VStack align="stretch" spacing={5}>
          {rideHistory.map((ride, index) => (
            <Box 
              key={index} 
              p={4} 
              borderWidth="1px" 
              borderRadius="md" 
              bg={cardBg} 
              boxShadow={cardShadow} 
              transition="all 0.2s" 
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Stack spacing={3}>
                <HStack justifyContent="space-between">
                  <Flex alignItems="center">
                    <Icon as={FaCalendarAlt} mr={2} color="blue.500" />
                    <Text fontSize="lg" color={textColor}>
                      {new Date(ride.date).toLocaleDateString()}
                    </Text>
                  </Flex>

                  <Flex alignItems="center">
                    <Icon as={FaDollarSign} mr={2} color="green.500" />
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {typeof ride.fare === 'number' ? `Rs.{ride.fare.toFixed(2)}` : 'N/A'}
                    </Text>
                  </Flex>
                </HStack>

                <Divider />

                <Flex direction="column">
                  <HStack mb={2}>
                    <Icon as={FaMapMarkerAlt} color="red.500" />
                    <Text fontSize="md" color={textColor}>
                      Pickup: <strong>{ride.pickup}</strong>
                    </Text>
                  </HStack>

                  <HStack mb={2}>
                    <Icon as={FaMapMarkerAlt} color="green.500" />
                    <Text fontSize="md" color={textColor}>
                      Destination: <strong>{ride.destination}</strong>
                    </Text>
                  </HStack>
                </Flex>

                <Flex justifyContent="space-between" alignItems="center">
                  <Badge colorScheme={ride.rideType === 'premium' ? 'purple' : 'blue'} px={3} py={1}>
                    {ride.rideType.charAt(0).toUpperCase() + ride.rideType.slice(1)} Ride
                  </Badge>
                  
                  <Icon as={FaCarAlt} boxSize={6} color={ride.rideType === 'premium' ? 'purple.500' : 'blue.500'} />
                </Flex>
              </Stack>

              {index < rideHistory.length - 1 && <Divider mt={4} />}
            </Box>
          ))}
        </VStack>
      ) : (
        <Text fontSize="lg" color={textColor} textAlign="center">
          No rides found
        </Text>
      )}
    </Box>
  );
};

export default RideHistory;
