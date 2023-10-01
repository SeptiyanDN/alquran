import React, { useEffect, useRef, useCallback } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface MovingCircleProps {
  size?: number;
  color?: string;
  duration?: number;
  movementFactor?: number;
}

const MovingCircle: React.FC<MovingCircleProps> = ({
  size = 50,
  color = 'blue',
  duration = 5000,
  movementFactor = 0.6,
}) => {
  const position = useRef<any>(new Animated.ValueXY()).current;
  const initialPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const getRandomOffset = useCallback(() => {
    const offsetX =
      Math.random() * size * movementFactor * (Math.random() < 0.5 ? -1 : 1);
    const offsetY =
      Math.random() * size * movementFactor * (Math.random() < 0.5 ? -1 : 1);
    return {
      x: initialPosition.current.x + offsetX,
      y: initialPosition.current.y + offsetY,
    };
  }, [movementFactor, size]);

  const animate = useCallback(() => {
    const newPos = getRandomOffset();
    Animated.timing(position, {
      toValue: newPos,
      duration: duration,
      useNativeDriver: true,
    }).start(() => animate());
  }, [duration, getRandomOffset, position]);

  useEffect(() => {
    const xValue = position.x._value;
    const yValue = position.y._value;
    initialPosition.current = { x: xValue, y: yValue };
    animate();
  }, [animate, position.x, position.y]);

  const circleStyle: ViewStyle = {
    transform: [{ translateX: position.x }, { translateY: position.y }],
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  };

  return <Animated.View style={circleStyle} />;
};

export default MovingCircle;
