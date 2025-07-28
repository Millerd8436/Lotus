
"use client";

import { useState, useEffect, useRef } from 'react';

const DEBOUNCE_TIME = 500; // ms

export const useMouseTracker = () => {
  const [distance, setDistance] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTimestamp = useRef(Date.now());
  const movementBuffer = useRef<{ distance: number, time: number }[]>([]);
  
  const logMovement = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const now = Date.now();
    const timeDelta = now - lastTimestamp.current;

    if (timeDelta > 0 && lastPosition.current.x !== 0) {
      const deltaX = clientX - lastPosition.current.x;
      const deltaY = clientY - lastPosition.current.y;
      const moveDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      
      setDistance(prev => prev + moveDistance);
      movementBuffer.current.push({ distance: moveDistance, time: timeDelta });
    }
    
    lastPosition.current = { x: clientX, y: clientY };
    lastTimestamp.current = now;
  };

  useEffect(() => {
    window.addEventListener('mousemove', logMovement);

    const interval = setInterval(() => {
      const buffer = movementBuffer.current;
      if (buffer.length > 0) {
        const totalDistance = buffer.reduce((acc, move) => acc + move.distance, 0);
        const totalTime = buffer.reduce((acc, move) => acc + move.time, 0);
        const avgVelocity = totalTime > 0 ? (totalDistance / totalTime) * 1000 : 0; // pixels per second
        setVelocity(avgVelocity);
      }
      movementBuffer.current = [];
    }, DEBOUNCE_TIME);

    return () => {
      window.removeEventListener('mousemove', logMovement);
      clearInterval(interval);
    };
  }, []);

  const getMetrics = () => {
    return {
      totalMouseDistance: Math.round(distance),
      averageMouseVelocity: Math.round(velocity),
    };
  };

  const resetMetrics = () => {
    setDistance(0);
    setVelocity(0);
    lastPosition.current = { x: 0, y: 0 };
    movementBuffer.current = [];
  };

  return { getMetrics, resetMetrics };
}; 