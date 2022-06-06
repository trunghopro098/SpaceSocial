import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFPSMetric } from "./useFPSMetrics";

const styles = StyleSheet.create({
  text: { color: "black" },
  container: { width:"100%",height:50 },
});

export default function FpsCounter ({ visible }){
  const { fps, average } = useFPSMetric();
  if (!visible) return null;
  return (
    <View pointerEvents={"none"} style={styles.container}>
      <Text style={styles.text}>{fps} FPS</Text>
      <Text style={styles.text}>{average.toFixed(2)} average FPS</Text>
    </View>
  );
};