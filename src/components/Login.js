import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, Text, useToast, Box, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import loginIcon from '../images/login2.jpg'; // Adjust this path to where the image is located
import backgroundImage from '../images/login1.png'; // Background image
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        setError('Invalid username or password. Please try again.');
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);

      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      onLogin(data);
      setError('');
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${data.username}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Navigate to the RideBooking page after successful login
      navigate('/ride-booking');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  const formBackground = useColorModeValue('white', 'gray.700');
  const inputBackground = useColorModeValue('gray.100', 'gray.600');
  const inputColor = useColorModeValue('black', 'white');
  const errorColor = useColorModeValue('red.500', 'red.300');

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      bgPosition="center"
      height="100vh"
    >
      <Flex
        direction="column"
        align="flex-start"
        justify="center"
        height="100%"
        p={10}
        bg="rgba(255, 255, 255, 0.6)"
      >
        <FormControl
          maxWidth="400px"
          mx="auto"
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg={formBackground}
        >
          <Box display="flex" justifyContent="center" mb={5}>
            <Image src={loginIcon} alt="Login Icon" width="100%" objectFit="cover" borderRadius="lg" />
          </Box>

          <Box display="flex" alignItems="center" mb={3}>
            <FormLabel color={inputColor} m={0}>Username</FormLabel>
          </Box>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            mb={3}
            bg={inputBackground}
            color={inputColor}
          />

          <Box display="flex" alignItems="center" mb={3}>
            <FormLabel color={inputColor} m={0}>Password</FormLabel>
          </Box>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            mb={3}
            bg={inputBackground}
            color={inputColor}
          />

          {error && <Text color={errorColor} mt={2}>{error}</Text>}

          <Button colorScheme="blue" borderRadius="2px" onClick={handleLogin} mt={3} width="100%">
            Login
          </Button>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default Login;
