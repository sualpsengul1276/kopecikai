import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useAppStore } from '../store/appStore';
import { palette } from '../theme/colors';

interface ProgressBarProps {
  progress: number; // 0-1
  height?: number;
}

export function ProgressBar({ progress, height = 6 }: ProgressBarProps) {
  const theme = useAppStore((s) => s.theme);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: progress,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();
  }, [progress]);

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            borderRadius: height / 2,
            backgroundColor: theme.primary,
            width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: palette.gray100,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {},
});
