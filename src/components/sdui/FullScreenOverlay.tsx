import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { OverlayConfig } from '../../types/schemas';

interface FullScreenOverlayProps {
  overlay: OverlayConfig | null | undefined;
}

const Overlay = ({ overlay }: FullScreenOverlayProps) => {
  if (!overlay) {
    return null;
  }

  return (
    <View
      style={[
        styles.overlayContainer,
        {
          pointerEvents: overlay.pointerEvents || 'none',
        },
      ]}
      testID="full-screen-overlay"
    >
      <LottieView
        source={{ uri: overlay.animation_url }}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export const FullScreenOverlay = memo(Overlay);
