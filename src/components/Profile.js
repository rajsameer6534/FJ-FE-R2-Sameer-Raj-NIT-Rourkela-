// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';

const Profile = ({ user, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // New state for success message visibility

  // Function to handle profile updates
  const handleUpdate = () => {
    // Check if all fields are filled
    if (!firstName || !lastName || !email) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }

    // If validation passes, update the user's information
    const updatedUser = { ...user, firstName, lastName, email };
    onUpdate(updatedUser); // Call the onUpdate function to update the user info

    // Show success message, hide form permanently, and set timeout to remove the message
    setSuccess('Profile updated successfully!');
    setError('');
    setIsUpdated(true);
    setShowSuccess(true); // Show the success message

    // Remove success message after 3 seconds (3000ms)
    setTimeout(() => {
      setShowSuccess(false); // Hide success message after timeout
    }, 3000);
  };

  return (
    <Box p={5} padding="0" borderRadius="lg" overflow="hidden" boxShadow="md">
      {isUpdated ? (
        // Show success message only while it's visible
        showSuccess && (
          <Text color="green.500" fontSize="xl" textAlign="center">
            {success}
          </Text>
        )
      ) : (
        // Render the form when not updated
        <VStack spacing={4}>
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </FormControl>

          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          {/* Display error message */}
          {error && <Text color="red.500">{error}</Text>}

          <Button colorScheme="teal" onClick={handleUpdate}>
            Update Profile
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Profile;
