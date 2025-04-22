import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGesture } from './screens/PanGesture';

import { useState } from 'react';
import type { LayoutRectangle } from 'react-native';

export default function App() {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    <GestureHandlerRootView>
      <View
        style={styles.container}
        onLayout={({ nativeEvent: { layout } }) => {
          setContainer(layout);
        }}
      >
        {container && <PanGesture {...container} />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
