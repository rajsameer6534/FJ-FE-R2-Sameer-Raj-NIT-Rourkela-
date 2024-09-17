import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import chat from '../images/chat1.avif';
import { io } from 'socket.io-client';
import { FiPhoneCall, FiVideo, FiSend, FiLogOut } from 'react-icons/fi';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import avatar from '../images/avtar.jpg';

const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(true); // Manage chat session state
  const socketRef = useRef(null);

  // Function to initialize the socket connection
  const initializeSocket = () => {
    socketRef.current = io('http://localhost:4000');

    // Listen for messages from the server
    socketRef.current.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  };

  useEffect(() => {
    if (isChatActive) {
      initializeSocket(); // Initialize socket when chat is active
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('receiveMessage');
        socketRef.current.disconnect(); // Disconnect the socket on component unmount or when chat is inactive
      }
    };
  }, [isChatActive]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { user: user.firstName, text: message };
      socketRef.current.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  const handleExitChat = () => {
    if (socketRef.current) {
      socketRef.current.emit('exitChat'); // Notify server about exiting chat
      socketRef.current.disconnect(); // Disconnect the socket from the client side
      alert('You have exited the chat.');
      setIsChatActive(false); // Set chat as inactive
    }
  };

  const handleRestartChat = () => {
    setMessages([]); // Clear previous messages
    setIsChatActive(true); // Restart chat by reactivating the socket
  };

  const backgroundColor = useColorModeValue('whiteAlpha.900', 'gray.800');
  const textColor = useColorModeValue('gray.900', 'whiteAlpha.900');
  const cardColor = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(0, 0, 0, 0.75)'); // Added opacity

  return (
    <Box
      bgImage={chat} // Replace with your background image
      bgSize="cover"
      bgPos="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="2xl"
        bg={cardColor}
        w="full"
        maxW="500px"
        mx="auto"
      >
        {isChatActive ? (
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" mb={2}>
              <HStack spacing={3}>
              <Avatar name={user.firstName} src={avatar} size="lg" mr={4} />
                <Text fontWeight="bold" color={textColor}>
                  {user.firstName}
                </Text>
              </HStack>
              <HStack spacing={3}>
                <Tooltip label="Voice Call">
                  <IconButton
                    icon={<FiPhoneCall />}
                    colorScheme="teal"
                    aria-label="Voice Call"
                    variant="outline"
                    onClick={() => alert('Calling feature coming soon!')}
                  />
                </Tooltip>
                <Tooltip label="Video Call">
                  <IconButton
                    icon={<FiVideo />}
                    colorScheme="teal"
                    aria-label="Video Call"
                    variant="outline"
                    onClick={() => alert('Video calling feature coming soon!')}
                  />
                </Tooltip>
                <Tooltip label="Exit Chat">
                  <IconButton
                    icon={<FiLogOut />}
                    colorScheme="red"
                    aria-label="Exit Chat"
                    variant="outline"
                    onClick={handleExitChat}
                  />
                </Tooltip>
              </HStack>
            </HStack>

            <Box
              h="300px"
              overflowY="auto"
              p={3}
              bg="gray.100"
              borderRadius="lg"
              boxShadow="inner"
              mb={4}
            >
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Box key={index} mb={2} borderBottom="1px solid gray.200" pb={2}>
                    <Text fontWeight="bold" color={textColor}>
                      {msg.user}:
                    </Text>
                    <Text>{msg.text}</Text>
                  </Box>
                ))
              ) : (
                <Text textAlign="center" fontStyle="italic" color={textColor}>
                  Start a conversation!
                </Text>
              )}
            </Box>

            <HStack spacing={3}>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                bg={backgroundColor}
                borderRadius="full"
                boxShadow="md"
                focusBorderColor="teal.400"
              />
              <IconButton
                icon={<FiSend />}
                colorScheme="blue"
                aria-label="Send Message"
                onClick={handleSendMessage}
                isDisabled={!message.trim()}
              />
            </HStack>
          </VStack>
        ) : (
          <VStack spacing={6} align="center">
            <Text color={textColor}>You have exited the chat.</Text>
            <Button
              onClick={handleRestartChat}
              colorScheme="green"
              leftIcon={<BsFillChatLeftDotsFill />}
              boxShadow="md"
              _hover={{ boxShadow: 'xl' }}
            >
              Restart Chat
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
