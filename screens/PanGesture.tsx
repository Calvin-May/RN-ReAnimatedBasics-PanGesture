import { View, StyleSheet } from 'react-native';

import { Card, Cards } from '../components';

// Nearly interchangeable from type api
interface GestureProps {
  width: number;
  height: number;
}

export const PanGesture = ({ width, height }: GestureProps) => {
  //console.log({ width, height });
  return (
    <View style={styles.container}>
      <Card card={Cards.Card1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
