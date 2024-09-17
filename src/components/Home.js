import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
  Stack,
  Icon,
  useBreakpointValue,
  ScaleFade,
  keyframes,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaCar, FaHistory, FaCreditCard, FaComments, FaInstagram, FaTwitter, FaFacebookF, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import backgroundImage from '../images/login1a.png'; // Background image for home page

// Animation for background gradient
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Home = () => {
  const textColor = useColorModeValue('gray.800', 'white');
  const bgOverlayColor = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(0, 0, 0, 0.7)');
  const buttonHoverBg = useColorModeValue('blue.600', 'teal.600');
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Background Image Section */}
      <Box
        bgImage={`url(${backgroundImage})`}
        bgSize="cover"
        bgPosition="center"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: 'linear(to-r, teal.500, blue.500, transparent)',
          zIndex: -1,
        }}
        animation={`${fadeIn} 1s ease-out`}
      >
        <Box bg={bgOverlayColor} p={10} borderRadius="lg" boxShadow="xl" textAlign="center" maxW="600px">
          <ScaleFade initialScale={0.8} in={true}>
            <Heading as="h1" size="2xl" mb={5} color={textColor} lineHeight="1.2" fontWeight="bold">
              Welcome to Ride Sharing App
            </Heading>

            <Text fontSize="lg" mb={8} color={textColor}>
              Choose your ride, book effortlessly, and travel with ease. Let's get started!
            </Text>

            <VStack spacing={4}>
              <Button
                colorScheme="blue"
                size="lg"
                as={Link}
                to="/login"
                borderRadius="full"
                boxShadow="lg"
                _hover={{ bg: buttonHoverBg, transform: 'scale(1.05)', transition: 'all 0.3s' }}
                transition="transform 0.2s"
              >
                Login
              </Button>
              <Button
                colorScheme="teal"
                size="lg"
                as={Link}
                to="/register"
                borderRadius="full"
                boxShadow="lg"
                _hover={{ bg: buttonHoverBg, transform: 'scale(1.05)', transition: 'all 0.3s' }}
                transition="transform 0.2s"
              >
                Register
              </Button>
            </VStack>
          </ScaleFade>
        </Box>
      </Box>

      {/* Features Section */}
      <Box p={10} textAlign="center" width={{ base: '90%', md: '80%' }} alignSelf="center" mt={-10} mb={10}>
        <Heading as="h2" size="lg" mb={5} color={textColor} fontWeight="bold">
          Our Features
        </Heading>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={10}
          justify="center"
          align="center"
          mt={10}
        >
          <FeatureItem
            icon={FaCar}
            title="Ride Booking"
            description="Book rides quickly with multiple options."
            colorScheme="blue"
          />
          <FeatureItem
            icon={FaHistory}
            title="Ride History"
            description="Track your past rides effortlessly."
            colorScheme="green"
          />
          <FeatureItem
            icon={FaCreditCard}
            title="Payment Integration"
            description="Secure payments with ease."
            colorScheme="purple"
          />
          <FeatureItem
            icon={FaComments}
            title="Live Chat"
            description="Chat with your driver in real-time."
            colorScheme="pink"
          />
        </Stack>
      </Box>

      {/* Footer Section */}
      <Footer />
    </Flex>
  );
};

// Feature Item Component
const FeatureItem = ({ icon, title, description, colorScheme }) => {
  const textColor = useColorModeValue('gray.800', 'white');
  const iconColor = useColorModeValue(`${colorScheme}.600`, `${colorScheme}.300`);
  const cardHoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      textAlign="center"
      p={8}
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ boxShadow: '2xl', bg: cardHoverBg, transform: 'scale(1.05)' }}
      maxW="300px"
      w="full"
      bgColor={useColorModeValue('gray.50', 'gray.900')}
    >
      <Icon as={icon} boxSize="50px" color={iconColor} mb={4} />
      <Heading as="h3" size="md" color={textColor} mb={2}>
        {title}
      </Heading>
      <Text color={textColor}>{description}</Text>
    </Box>
  );
};

// Footer Component
const Footer = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('gray.100', 'gray.300');
  const linkHoverColor = useColorModeValue('blue.400', 'teal.300');

  return (
    <Box bg={bgColor} color={textColor} py={10} px={5}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={10}
        justify="space-between"
        align="flex-start"
        maxW="1200px"
        mx="auto"
      >
        {/* Contact Section */}
        <VStack align="flex-start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Contact Us
          </Text>
          <HStack spacing={3}>
            <Icon as={FaMapMarkerAlt} />
            <Text>1234 Main St, Anytown,India</Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={FaEnvelope} />
            <Text>support@ridesharingapp.com</Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={FaWhatsapp} />
            <Text>+1 234 567 890</Text>
          </HStack>
        </VStack>

        {/* Social Media Section */}
        <VStack align="flex-start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Follow Us
          </Text>
          <HStack spacing={5}>
            <Link href="https://instagram.com" isExternal _hover={{ color: linkHoverColor }}>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
            <Link href="https://twitter.com" isExternal _hover={{ color: linkHoverColor }}>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
            <Link href="https://facebook.com" isExternal _hover={{ color: linkHoverColor }}>
              <Icon as={FaFacebookF} boxSize={6} />
            </Link>
            <Link href="https://whatsapp.com" isExternal _hover={{ color: linkHoverColor }}>
              <Icon as={FaWhatsapp} boxSize={6} />
            </Link>
          </HStack>
        </VStack>

        {/* Links Section */}
        <VStack align="flex-start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Useful Links
          </Text>
          <Link href="/about" _hover={{ color: linkHoverColor }}>
            About Us
          </Link>
          <Link href="/privacy" _hover={{ color: linkHoverColor }}>
            Privacy Policy
          </Link>
          <Link href="/terms" _hover={{ color: linkHoverColor }}>
            Terms & Conditions
          </Link>
          <Link href="/help" _hover={{ color: linkHoverColor }}>
            Help Center
          </Link>
        </VStack>
      </Stack>

      {/* Footer Bottom */}
      <Box mt={10} textAlign="center" borderTop="1px" borderColor="gray.700" pt={5}>
        <Text fontSize="sm">
          © {new Date().getFullYear()} Ride Sharing App. All Rights Reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
