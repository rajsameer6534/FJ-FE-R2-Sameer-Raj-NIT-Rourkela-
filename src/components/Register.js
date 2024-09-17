import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import backgroundImage from '../images/login1.png'; // Background image

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Dummy registration logic (replace with API call in a real-world scenario)
    if (!username || !password || !email || !firstName || !lastName) {
      setError('Please fill in all fields');
      return;
    }
    const userData = {
      id: Math.floor(Math.random() * 1000), // Random ID for demo purposes
      username,
      password,
      email,
      firstName,
      lastName,
      image: `https://dummyjson.com/icon/${username}/128`, // Placeholder image URL
    };
    onRegister(userData); // Callback to add user
  };

  const formBackground = useColorModeValue('white', 'gray.700'); // White in light mode, gray in dark mode
  const formColor = useColorModeValue('black', 'white'); // Black text in light mode, white text in dark mode

  return (
    <Box
      bgImage={`url(${backgroundImage})`}  // Background Image
      bgSize="cover"
      bgPosition="center"
      height="100vh"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100%"
        p={10}
        bg="rgba(255, 255, 255, 0.6)" // Semi-transparent white overlay
      >

        {/* Register Form */}
        <Flex
          direction="row"
          justify="flex-end"
          width="100%"
          p={10}
          align="center"
        >
          <Box
            p={5}
            maxW="400px"
            borderWidth="1px"
            borderRadius="lg"
            bg={formBackground} // Dynamic background color
            boxShadow="md"
          >
            <VStack spacing={4} align="flex-start">
              <Heading as="h2" size="xl" mb={4} color={formColor}>
                Create Your Account
              </Heading>

              <FormControl id="username">
                <FormLabel color={formColor}>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  bg={formBackground}
                  color={formColor}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel color={formColor}>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg={formBackground}
                  color={formColor}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel color={formColor}>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  bg={formBackground}
                  color={formColor}
                />
              </FormControl>

              <FormControl id="firstName">
                <FormLabel color={formColor}>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  bg={formBackground}
                  color={formColor}
                />
              </FormControl>

              <FormControl id="lastName">
                <FormLabel color={formColor}>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  bg={formBackground}
                  color={formColor}
                />
              </FormControl>

              {error && <Text color="red.500">{error}</Text>}

              <Button colorScheme="teal" onClick={handleRegister} width="100%">
                Register
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Register;
