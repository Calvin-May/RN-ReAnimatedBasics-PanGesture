import { View, StyleSheet } from 'react-native';
import { Card, CARD_HEIGHT, CARD_WIDTH, Cards } from '../components';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

// Nearly interchangeable from type api
interface GestureProps {
  width: number;
  height: number;
}

export const PanGesture = ({ width, height }: GestureProps) => {
  console.log({ width, height });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (eventPayload, context) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (eventPayload, context) => {
      translateX.value = context.offsetX + eventPayload.translationX;
      translateY.value = context.offsetY + eventPayload.translationY;
    },
    onEnd: (eventPayload, context) => {
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
    },
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
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedStyle}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
