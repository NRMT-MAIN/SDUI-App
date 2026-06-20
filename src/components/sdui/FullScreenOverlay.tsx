import React, { memo, useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { OverlayConfig } from '../../types/schemas';

interface FullScreenOverlayProps {
  overlay: OverlayConfig | null | undefined;
}

const Overlay = ({ overlay }: FullScreenOverlayProps) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (!overlay?.animation_url) return;

    lottieRef.current?.play();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [overlay, fadeAnim]);

  if (!overlay || !overlay.animation_url || !visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.overlayContainer,
        { opacity: fadeAnim, pointerEvents: overlay.pointerEvents || 'none' },
      ]}
      testID="full-screen-overlay"
    >
      <LottieView
        ref={lottieRef}
        source= { { uri: overlay.animation_url } }
        autoPlay={false} 
        loop={true}     
        style={styles.animation}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export const FullScreenOverlay = memo(Overlay);
