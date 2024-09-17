import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, HStack, Text } from '@chakra-ui/react';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {
      name: '',
      email: '',
      phone: '',
    };
    setProfile(savedProfile);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <Box mt={10} p={5} borderWidth="1px" borderRadius="lg">
      <Heading fontSize="lg" mb={5}>Manage Profile</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormControl>
        <HStack justifyContent="space-between">
          <Button colorScheme="blue" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          {isEditing && (
            <Button colorScheme="green" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProfileManagement;
