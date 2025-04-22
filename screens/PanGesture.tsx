import { View, StyleSheet } from 'react-native';
import { Card, CARD_HEIGHT, CARD_WIDTH, Cards } from '../components';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withDecay,
} from 'react-native-reanimated';

// Nearly interchangeable from type api
interface GestureProps {
  width: number;
  height: number;
}

export const PanGesture = ({ width, height }: GestureProps) => {
  console.log({ width, height });
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((eventPayload) => {
      translateX.value = clamp(
        offsetX.value + eventPayload.translationX,
        0,
        boundX,
      );
      translateY.value = clamp(
        offsetY.value + eventPayload.translationY,
        0,
        boundY,
      );
    })
    .onStart((eventPayload) => {
      console.log(eventPayload);
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    })

    .onEnd((eventPayload) => {
      translateX.value = withDecay({
        velocity: eventPayload.velocityX,
        clamp: [0, width - CARD_WIDTH],
        rubberBandEffect: true,
      });
      translateY.value = withDecay({
        velocity: eventPayload.velocityY,
        clamp: [0, height - CARD_HEIGHT],
        rubberBandEffect: true,
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
