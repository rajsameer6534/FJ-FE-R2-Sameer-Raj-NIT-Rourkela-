import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  useColorMode,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  HStack,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon, PhoneIcon, ChatIcon } from '@chakra-ui/icons';
import { FaUserAlt } from 'react-icons/fa'; // For more advanced icons
import logoIcon from '../images/head1.png';

const Header = ({ onLoginClick, onSignupClick, user, onLogout }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="header"
      py={4}
      px={{ base: 4, md: 6 }}
      borderBottom="1px solid"
      borderColor="gray.200"
      bgGradient={colorMode === 'light' ? 'linear(to-r, teal.500, green.500)' : 'linear(to-r, gray.800, blackAlpha.800)'}
      boxShadow="lg"
      position="sticky" // Sticky behavior
      top="0"
      zIndex="1000"
      w="100%"
    >
      <Flex alignItems="center" justify="space-between">
        {/* Left Side - Logo */}
        <Flex alignItems="center">
          <Image src={logoIcon} alt="App Logo" boxSize={{ base: '40px', md: '50px' }} />
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" ml={3} color="white">
            Ride Sharing App
          </Text>
        </Flex>

        {/* Mobile Menu Icon for Small Screens */}
        {isMobile ? (
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" color="white" />
            <MenuList>
              <MenuItem onClick={() => alert('Ride option clicked')}>Ride</MenuItem>
              <MenuItem onClick={() => alert('Drive option clicked')}>Drive</MenuItem>
              <MenuItem onClick={toggleColorMode}>
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </MenuItem>
              {user ? (
                <>
                  <MenuItem>Hello, {user.firstName}!</MenuItem>
                  <MenuItem color="red.500" onClick={onLogout}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={onLoginClick}>Support</MenuItem>
                  <MenuItem onClick={onSignupClick}>Toll Free</MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        ) : (
          <HStack spacing={6}>
            {/* Center - Navigation for Desktop */}
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => alert('Ride option clicked')}
            >
              Ride
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => alert('Drive option clicked')}
            >
              Drive
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={toggleColorMode}
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            >
              {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
            <Button
              leftIcon={<ChatIcon />}
              colorScheme="blue"
              borderRadius="full"
              boxShadow="md"
              onClick={() => alert('Support')}
            >
              Support
            </Button>
            <Button
              leftIcon={<PhoneIcon />}
              colorScheme="green"
              borderRadius="full"
              boxShadow="md"
              onClick={() => alert('Toll Free')}
            >
              Toll Free
            </Button>

            {user ? (
              <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar size="sm" name={user.firstName} />
                </MenuButton>
                <MenuList>
                  <Text px={4} py={2}>Hello, {user.firstName}!</Text>
                  <MenuDivider />
                  <MenuItem color="red.500" onClick={onLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                leftIcon={<FaUserAlt />}
                variant="ghost"
                color="white"
                onClick={onLoginClick}
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                Login
              </Button>
            )}
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
