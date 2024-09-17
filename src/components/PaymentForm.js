import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, VStack, Text, Flex, Image, Heading, Center } from '@chakra-ui/react';
import payimg from '../images/payment.jpg'; // Make sure this path is correct

// Custom styling for the CardElement
const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#a0aec0',
      },
      padding: '12px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'border-color 0.3s ease-in-out',
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
      borderColor: '#fa755a',
    },
    complete: {
      color: '#4caf50',
      iconColor: '#4caf50',
    },
  },
};

const PaymentForm = ({ fare, riderName, riderEmail, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage('Stripe or Elements not loaded.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setPaymentComplete(true);
    setLoading(false);
    onPaymentSuccess();
  };

  return (
    <Flex direction={['column', 'column', 'row']} h="100vh">
      {/* Left side with form */}
      <VStack
        spacing={6}
        align="flex-start"
        w={['100%', '100%', '50%']}
        p={[6, 10]}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        justifyContent="center"
      >
        <Heading as="h2" size="lg" mb={4} color="teal.600">
          Payment Information
        </Heading>
        <Text fontSize="md" color="gray.500">Fare per rider: Rs{fare}</Text>
        <Text fontSize="md" color="gray.500">Rider Name: Sameer</Text>
        <Text fontSize="md" color="gray.500">Rider Email: 123z@gmail.com</Text>

        {/* CardElement Box */}
        <Box
          w="100%"
          maxW="md"
          bg="gray.50"
          p={6}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="lg"
        >
          <CardElement options={cardStyle} />
        </Box>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handlePayment}
          isLoading={loading}
          disabled={!stripe || loading}
          w="100%"
        >
          Pay Now
        </Button>
        {paymentComplete && (
          <Text color="green.500">Payment Successful! You will be redirected soon.</Text>
        )}
      </VStack>

      {/* Right side with background image and slogan */}
      <Box
        w={['100%', '100%', '50%']}
        h="100%"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {/* Background Image */}
        <Image
          src={payimg}
          alt="Payment Background"
          objectFit="cover"
          w="100%"
          h="100%"
          position="absolute"
          zIndex="-1"
        />
        
        {/* Slogan */}
        <Center
          color="white"
          p={8}
          bg="rgba(0, 0, 0, 0.5)" // Adds a transparent dark overlay to make the text stand out
          borderRadius="md"
          textAlign="center"
          zIndex="1"
        >
          <Heading as="h1" fontSize={['2xl', '3xl', '4xl']} fontWeight="bold">
            "Ride with Comfort, Pay with Ease"
          </Heading>
        </Center>
      </Box>
    </Flex>
  );
};

export default PaymentForm;
