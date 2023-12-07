import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LoadingScreen from './LoadingScreen';
import HomePage from './HomePage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading time with setTimeout
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HomePage />
  );
};

export default App;
