import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import rideBookImage from '../images/ridebook.jpg';
import {
  Box, Button, Flex, Input, FormControl, FormLabel, Text, VStack, HStack, Select, Switch, SimpleGrid, Heading, useToast,
} from '@chakra-ui/react';

const rideTypes = {
  economy: 1.0,
  premium: 2.0,
};

const RideBooking = ({ onConfirmRide }) => {
  const mapRef = useRef(null);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [rideType, setRideType] = useState('economy');
  const [fare, setFare] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [numRiders, setNumRiders] = useState(1);
  const mapInstance = useRef(null);
  const pickupMarker = useRef(null);
  const destinationMarker = useRef(null);
  const routeLine = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      maptilersdk.config.apiKey = 'VrkYEvx4TEu8mN4kd9gd';
      mapInstance.current = new maptilersdk.Map({
        container: mapRef.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [16.62662018, 49.2125578],
        zoom: 14,
      });
    }
  }, []);

  const geocodeCity = async (city) => {
    const response = await fetch(`https://api.maptiler.com/geocoding/${city}.json?key=VrkYEvx4TEu8mN4kd9gd`);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const { geometry } = data.features[0];
      return geometry.coordinates;
    }
    return null;
  };

  const calculateDistance = (coord1, coord2) => {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const handleSetPickup = async () => {
    const coordinates = await geocodeCity(pickup);
    if (coordinates) {
      if (pickupMarker.current) {
        pickupMarker.current.setLngLat(coordinates);
      } else {
        pickupMarker.current = new maptilersdk.Marker({ color: 'red' })
          .setLngLat(coordinates)
          .addTo(mapInstance.current);
      }
      mapInstance.current.flyTo({ center: coordinates, zoom: 14 });
      drawRouteIfBothSet();
    } else {
      toast({
        title: 'Pickup location not found',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSetDestination = async () => {
    const coordinates = await geocodeCity(destination);
    if (coordinates) {
      if (destinationMarker.current) {
        destinationMarker.current.setLngLat(coordinates);
      } else {
        destinationMarker.current = new maptilersdk.Marker({ color: 'red' })
          .setLngLat(coordinates)
          .addTo(mapInstance.current);
      }
      mapInstance.current.flyTo({ center: coordinates, zoom: 14 });
      drawRouteIfBothSet();
    } else {
      toast({
        title: 'Destination location not found',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const drawRouteIfBothSet = () => {
    if (pickupMarker.current && destinationMarker.current) {
      const pickupCoords = pickupMarker.current.getLngLat().toArray();
      const destinationCoords = destinationMarker.current.getLngLat().toArray();

      const route = [pickupCoords, destinationCoords];
      
      if (routeLine.current) {
        mapInstance.current.removeLayer('route');
        mapInstance.current.removeSource('route');
      }

      mapInstance.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        },
      });

      mapInstance.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#007bff',  // Blue color for the route
          'line-width': 4,
        },
      });
    }
  };

  const calculateFare = () => {
    if (!pickupMarker.current || !destinationMarker.current) {
      toast({
        title: 'Please set both pickup and destination locations.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const pickupCoords = pickupMarker.current.getLngLat().toArray();
    const destinationCoords = destinationMarker.current.getLngLat().toArray();
    const distanceCovered = calculateDistance(pickupCoords, destinationCoords);
    setDistance(distanceCovered);

    const baseFare = distanceCovered * rideTypes[rideType];
    const totalFare = isSharing ? baseFare / numRiders : baseFare;
    setFare(totalFare.toFixed(2));
  };

  const handleConfirmRide = () => {
    if (!pickup || !destination || !fare) {
      toast({
        title: 'Please complete all steps to confirm your ride.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const ride = {
      pickup,
      destination,
      rideType,
      fare,
      distance,
      numRiders: isSharing ? numRiders : 1,
      date: new Date().toISOString(),
    };

    onConfirmRide(ride);
  };

  return (
    <Box
      bgImage={`url(${rideBookImage})`}
      bgSize="cover"
      bgPos="center"
      minH="100vh"
      p={8}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
        <VStack
          spacing={6}
          align="stretch"
          bg="whiteAlpha.800"
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          backdropFilter="blur(10px)"
          zIndex={2}
        >
          <Heading size="lg" color="teal.600" textAlign="center">
            Book Your Ride
          </Heading>
          <FormControl>
            <FormLabel>Pickup Location</FormLabel>
            <HStack>
              <Input value={pickup} onChange={(e) => setPickup(e.target.value)} bg="white" />
              <Button colorScheme="teal" onClick={handleSetPickup}>Set Pickup</Button>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Destination</FormLabel>
            <HStack>
              <Input value={destination} onChange={(e) => setDestination(e.target.value)} bg="white" />
              <Button colorScheme="teal" onClick={handleSetDestination}>Set Destination</Button>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Ride Type</FormLabel>
            <Select value={rideType} onChange={(e) => setRideType(e.target.value)} bg="white">
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel>Sharing Mode</FormLabel>
            <Switch isChecked={isSharing} onChange={(e) => setIsSharing(e.target.checked)} />
          </FormControl>

          {isSharing && (
            <FormControl>
              <FormLabel>Number of Riders</FormLabel>
              <Input
                type="number"
                value={numRiders}
                onChange={(e) => setNumRiders(e.target.value)}
                min={1}
                bg="white"
              />
            </FormControl>
          )}

          <Button colorScheme="teal" onClick={calculateFare}>Calculate Fare</Button>

          {fare && (
            <Text fontSize="lg" fontWeight="bold">
              Estimated Fare: ₹{fare} for {distance} km
            </Text>
          )}

          <Button colorScheme="teal" onClick={handleConfirmRide}>Confirm Ride</Button>
        </VStack>

        <Box ref={mapRef} h="500px" borderRadius="lg" boxShadow="lg" />
      </SimpleGrid>
    </Box>
  );
};

export default RideBooking;
