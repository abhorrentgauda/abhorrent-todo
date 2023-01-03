import { useRef, useEffect } from 'react';

const useTimer = (callback, delay, isTimer) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    if (isTimer) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [isTimer]);
};

export default useTimer;
