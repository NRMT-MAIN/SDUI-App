import React, { memo, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { BannerHeroPayload } from '../../types/schemas';
import { useAppTheme } from '../../context/ThemeProvider';

interface BannerHeroProps {
  data: BannerHeroPayload;
}

const Banner = ({ data }: BannerHeroProps) => {
  const { theme } = useAppTheme();
  const entranceAnim = useRef(new Animated.Value(0)).current;
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entranceAnim]);

  const cardStyle = {
    opacity: entranceAnim,
    transform: [
      {
        translateY: entranceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
      {
        scale: entranceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  const imageSource = data.imageUrl;
  const showImage = Boolean(imageSource) && !imageFailed;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary,
          borderColor: theme.accent,
        },
        cardStyle,
      ]}
    >
      {showImage ? (
        <ImageBackground
          source={{ uri: imageSource }}
          style={styles.imageBackground}
          imageStyle={styles.image}
          onError={() => setImageFailed(true)}
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
            <Text style={[styles.kicker, { color: theme.background }]}>Featured campaign</Text>
            {data.title && (
              <Text style={[styles.title, { color: theme.background }]} numberOfLines={2}>
                {data.title}
              </Text>
            )}
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.fallback, { backgroundColor: theme.primary }]}> 
          <View style={styles.overlay} />
          <View style={styles.content}>
            <Text style={[styles.kicker, { color: theme.background }]}>Featured campaign</Text>
            {data.title && (
              <Text style={[styles.title, { color: theme.background }]} numberOfLines={2}>
                {data.title}
              </Text>
            )}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 220,
    borderRadius: 24,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    opacity: 0.95,
    resizeMode: 'stretch',
  },
  fallback: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 6,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'left',
  },
});

export const BannerHero = memo(Banner);
