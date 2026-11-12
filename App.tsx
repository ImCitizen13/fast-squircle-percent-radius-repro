import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FastSquircleView from 'react-native-fast-squircle';

// Change to 16 to verify that a numeric radius does not crash.
const RADIUS: number | `${number}%` = '40%';

const boxStyle = {
  backgroundColor: 'red',
  width: '80%',
  height: 40,
  borderRadius: RADIUS,
} as const;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        (1) FastSquircleView with borderRadius: '40%' crashes on Android with
        {'\n'}ClassCastException: String cannot be cast to Double. iOS is fine.
      </Text>
      <FastSquircleView style={boxStyle} />
      <Text style={styles.label}>(2) Plain View, same style (works):</Text>
      <View style={boxStyle} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  label: { textAlign: 'center' },
});
