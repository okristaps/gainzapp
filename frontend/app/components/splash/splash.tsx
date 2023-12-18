import React, { useEffect } from "react";
import { View, Animated, Easing, StyleSheet, Text } from "react-native";
import Biceps from "assets/images/bicep.svg";
const Splash = () => {
  const imageScale = new Animated.Value(0.1);
  const imageRotation = new Animated.Value(0);
  const textBounce = new Animated.Value(0);

  useEffect(() => {
    const scaleAnimation = Animated.timing(imageScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const rotationAnimation = Animated.timing(imageRotation, {
      toValue: 720,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.parallel([scaleAnimation, rotationAnimation]).start();

    Animated.sequence([
      Animated.delay(1000),
      Animated.spring(textBounce, {
        toValue: 1,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageScale, imageRotation, textBounce]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              { scale: imageScale },
              {
                rotate: imageRotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      >
        <Biceps height={90} width={68} />
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textBounce.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: textBounce.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.text}>Gainzapp</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212121",
  },
  animatedContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Splash;
