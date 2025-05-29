// components/SplashWrapper.jsx
import React, { useEffect, useState } from 'react';
import Splashscreen from './SplashScreen';


const SplashWrapper = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // adjust splash duration here (in ms)

    return () => clearTimeout(timeout);
  }, []);

  return showSplash ? <Splashscreen /> : children;
};

export default SplashWrapper;