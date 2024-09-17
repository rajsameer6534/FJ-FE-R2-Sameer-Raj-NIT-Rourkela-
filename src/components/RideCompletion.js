import React, { useState } from 'react';
import { Box, Button, Text, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const RideCompletion = ({ onComplete }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (rating && comment) {
      try {
        // Replace this URL with your actual feedback API endpoint
        const response = await fetch('https://your-api-endpoint.com/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating, comment }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }

        // Notify parent component that feedback has been submitted
        onComplete();
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert('Please fill in both rating and comment.');
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="md">
      <Text fontSize="xl" mb={3}>Please provide your feedback</Text>

      <VStack spacing={3} align="stretch">
        <FormControl>
          <FormLabel>Rating (1-5)</FormLabel>
          <Input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Comment</FormLabel>
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormControl>

        {error && <Text color="red.500">{error}</Text>}

        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit Feedback
        </Button>
      </VStack>
    </Box>
  );
};

export default RideCompletion;
