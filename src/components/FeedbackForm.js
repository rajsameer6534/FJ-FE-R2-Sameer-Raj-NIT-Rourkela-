import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Card,
  CardBody,
  Heading,
  VStack,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Feedback from '../images/feedback.jpg';

const FeedbackForm = ({ onComplete }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Validate input
    if (!rating || !comment) {
      setError('Rating and comment are required.');
      return;
    }

    // Save feedback locally (e.g., local storage or in-memory state)
    const feedback = { rating, comment, date: new Date().toISOString() };
    let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedback);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

    // Notify parent component of successful feedback submission
    setFeedbackSubmitted(true);

    // Navigate to chat page after feedback is submitted
    setTimeout(() => {
      onComplete(); // Trigger navigation to chat
    }, 2000);
  };

  const backgroundColor = useColorModeValue('whiteAlpha.900', 'gray.800');
  const cardColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  return (
    <Box
      bgImage={Feedback} // Change this to your desired background image URL
      bgSize="cover"
      bgPos="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <Card
        bg={cardColor}
        maxW="500px"
        w="100%"
        borderRadius="xl"
        boxShadow="2xl"
        overflow="hidden"
        p={6}
      >
        <CardBody>
          {feedbackSubmitted ? (
            <VStack spacing={6} textAlign="center">
              <Heading color="green.400" size="lg">Thank you for your feedback!</Heading>
              <Text fontSize="lg" color={textColor}>
                We appreciate you taking the time to share your thoughts with us.
              </Text>
            </VStack>
          ) : (
            <>
              <Heading mb={6} size="lg" color={textColor} textAlign="center">
                Share Your Feedback
              </Heading>
              <FormControl mb={4}>
                <FormLabel color={textColor}>Rating (1 to 5)</FormLabel>
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  placeholder="Enter your rating"
                  focusBorderColor="teal.400"
                  bg={backgroundColor}
                />
              </FormControl>

              <FormControl mb={6}>
                <FormLabel color={textColor}>Comment</FormLabel>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your feedback here"
                  focusBorderColor="teal.400"
                  bg={backgroundColor}
                />
              </FormControl>

              {error && <Text color="red.500" mb={4}>{error}</Text>}

              <Button
                mt={4}
                colorScheme="teal"
                size="lg"
                w="full"
                onClick={handleSubmit}
                _hover={{ bg: 'teal.600' }}
                transition="all 0.2s"
                boxShadow="lg"
              >
                Submit Feedback
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default FeedbackForm;
