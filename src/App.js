import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Heading, VStack, Text, Button, useToast, Avatar, Flex, Spacer, useColorModeValue, Stack, useBreakpointValue } from '@chakra-ui/react';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import RideHistory from './components/RideHistory';
import RideStatistics from './components/RideStatistics';
import RideBooking from './components/RideBooking';
import PaymentForm from './components/PaymentForm';
import FeedbackForm from './components/FeedbackForm';
import Chat from './components/Chat';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './components/Home';
import Header from './components/Header';
import 'leaflet/dist/leaflet.css';
import './App.css';
import avatar from './assets/images/avtar.jpg';

const stripePromise = loadStripe('pk_test_51Pz2P6HCDKFHUFFBH4qb6QxMOeHRi6Pc0bTt3OSEVlXQoIMAx5Ssdt2KVGlLnnp4Jl0mCAehu77rvQXFWiAHeB3g00UNWzqtbl');

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showRideHistory, setShowRideHistory] = useState(false);
  const [showRideStatistics, setShowRideStatistics] = useState(false);
  const [rideHistory, setRideHistory] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const toast = useToast();
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const storedRideHistory = JSON.parse(localStorage.getItem('rideHistory')) || [];
    setRideHistory(storedRideHistory);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    toast({
      title: 'Login Successful.',
      description: `Welcome back, ${userData.firstName}!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRegister = (newUser) => {
    setUser(newUser);
    setShowRegister(false);
    toast({
      title: 'Registration Successful.',
      description: `Welcome, ${newUser.firstName}!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsEditingProfile(false);
    setShowRideHistory(false);
    setShowRideStatistics(false);
    setRideHistory([]);
    setShowPaymentForm(false);
    setIsPaymentComplete(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    toast({
      title: 'Logged Out.',
      description: 'You have been logged out successfully.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    navigate('/'); // Redirect to home page
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleSignupClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");

  // Responsive styles
  const isMobile = useBreakpointValue({ base: true, md: false }); // Detect mobile view
  
  return (
    <Box className="app-container">
      <Heading className="app-heading"></Heading>
      <Header user={user} onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        {/* Show FeedbackForm or Chat in separate pages, not alongside RideBooking */}
        <Route path="/feedback" element={<FeedbackForm onComplete={() => navigate('/chat')} />} />
        <Route path="/chat" element={<Chat user={user} />} />
      </Routes>

      {!user ? (
        !showLogin && !showRegister && <Text></Text>
      ) : (
        <VStack spacing={5} align="stretch" mt={5}>
          <Flex
            direction={isMobile ? "column" : "row"} // Stack items vertically on mobile
            bg={bg}
            p={4}
            alignItems="center"
            justifyContent="space-between"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            mt={6}
            mb={4}
            w="full"
            maxW="100%"
            mx="auto"
            minH="80px"
            px={6}
          >
            <Flex alignItems="center">
              <Avatar name={user.firstName} src={avatar} size="lg" mr={isMobile ? 0 : 4} mb={isMobile ? 4 : 0} />
              <Text fontSize="2xl" fontWeight="bold" color={textColor} textAlign={isMobile ? "center" : "left"}>
                Welcome, {user.firstName}!
              </Text>
            </Flex>

            <Spacer />

            <Flex direction={isMobile ? "column" : "row"} gap={isMobile ? 2 : 4} mt={isMobile ? 4 : 0}>
              <Button
                colorScheme="blue"
                onClick={() => setIsEditingProfile(true)}
                _hover={{ bg: "blue.500" }}
              >
                Edit Profile
              </Button>

              <Button
                colorScheme="green"
                onClick={() => setShowRideStatistics(!showRideStatistics)}
                _hover={{ bg: "green.500" }}
              >
                {showRideStatistics ? "Hide Ride Statistics" : "View Ride Statistics"}
              </Button>

              <Button
                colorScheme="green"
                onClick={() => setShowRideHistory(!showRideHistory)}
                _hover={{ bg: "green.500" }}
              >
                {showRideHistory ? "Hide Ride History" : "View Ride History"}
              </Button>

              <Button colorScheme="red" onClick={handleLogout} _hover={{ bg: "red.500" }}>
                Logout
              </Button>
            </Flex>
          </Flex>

          {isEditingProfile && <Profile user={user} onUpdate={(updatedUser) => setUser(updatedUser)} />}
          {showRideStatistics && <RideStatistics rideHistory={rideHistory} />}
          {showRideHistory && <RideHistory />}
          {!showPaymentForm ? (
            <RideBooking
              onConfirmRide={(ride) => {
                const updatedRideHistory = [...rideHistory, ride];
                setRideHistory(updatedRideHistory);
                localStorage.setItem('rideHistory', JSON.stringify(updatedRideHistory));
                setCurrentRide(ride);
                setShowPaymentForm(true);
                toast({
                  title: 'Ride Confirmed.',
                  description: `Your ride from ${ride.pickup} to ${ride.destination} has been confirmed.`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              }}
            />
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm
                fare={currentRide?.fare}
                numRiders={currentRide?.numRiders}
                onPaymentSuccess={() => {
                  setShowPaymentForm(false);
                  setIsPaymentComplete(true);
                  navigate('/feedback'); // Navigate to feedback page on payment success
                  toast({
                    title: 'Payment Successful.',
                    description: 'Your payment was processed successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              />
            </Elements>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default App;
