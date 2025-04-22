import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGesture } from './screens/PanGesture';

import { useState } from 'react';
import type { LayoutRectangle } from 'react-native'; // type object: {x, y, height, width}

export default function App() {
  // State to keep track of the dimensions of the parent, our Pan Gesture Component will
  //-use this state to ensure animations are locked within the proper dimensions of the parent
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    // App must be wrapped in GestureHandlerRootView in order to make use of Gesture events and hooks
    <GestureHandlerRootView>
      <View
        style={styles.container}
        // Use the onLayout event to get the Heigh/Width of the Parent component
        onLayout={({ nativeEvent: { layout } }) => {
          // nativeEvent: { layout: { width: number, height: number, x: number, y: number } }
          //-In this case we only care about width/height which will be passed as props to
          //-the PanGesture Component
          setContainer(layout);
        }}
      >
        {
          // If container != null, the layout has loaded
          //-pass the container.height and container.width as props to PanGesture
          container && <PanGesture {...container} />
        }
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
