import React, {useState, useEffect} from 'react';

import Routes from './routes/Routes';
import {WithSplashScreen} from './SplachScreen';
const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Routes />
    </WithSplashScreen>
  );
};

export default App;
