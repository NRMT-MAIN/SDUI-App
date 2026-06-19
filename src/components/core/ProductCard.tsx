import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { useActionDispatcher } from '../../hooks/useActionDispatcher';
import { useCartStore } from '../../stores/CartStore';
import { ProductItem } from '../../types/schemas';
import { useAppTheme } from '../../context/ThemeProvider';

interface ProductCardProps {
  item: ProductItem;
}

const getFallbackImageUrl = (seed: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/420`;

const Card = ({ item }: ProductCardProps) => {
  const { handleAction } = useActionDispatcher();
  const quantity = useCartStore((state) => state.items[item.id] || 0);
  const { theme } = useAppTheme();
  const entranceAnim = useRef(new Animated.Value(0)).current;
  const fallbackImageUrl = getFallbackImageUrl(item.id);
  const [imageUri, setImageUri] = useState(item.imageUrl || fallbackImageUrl);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageUri(item.imageUrl || fallbackImageUrl);
    setImageFailed(false);
  }, [fallbackImageUrl, item.imageUrl, item.id]);

  useEffect(() => {
    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entranceAnim]);

  const animatedCardStyle = {
    opacity: entranceAnim,
    transform: [
      {
        translateY: entranceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
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

  const handlePress = useCallback(() => {
    handleAction(item.action);
  }, [handleAction, item.action]);

  const handleImageError = useCallback(() => {
    if (imageUri !== fallbackImageUrl) {
      setImageUri(fallbackImageUrl);
      return;
    }

    setImageFailed(true);
  }, [fallbackImageUrl, imageUri]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.background,
          borderColor: theme.primary,
        },
        animatedCardStyle,
      ]}
      testID={`product-card-${item.id}`}
    >
      <View style={styles.imageWrap}>
        {!imageFailed ? (
          <Image source={{ uri: imageUri }} style={styles.image} onError={handleImageError} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.primary }]}>
            <Text style={[styles.placeholderText, { color: theme.background }]}>Photo unavailable</Text>
          </View>
        )}
        <View style={[styles.imageTint, { backgroundColor: theme.primary }]} pointerEvents="none" />
      </View>

      <View style={styles.content}>
        <Text style={[styles.brandTag, { color: theme.secondary }]}>Limited drop</Text>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.primary }]}>₹{item.price}</Text>
          {quantity > 0 && (
            <Text style={[styles.cartBadge, { color: theme.background, backgroundColor: theme.secondary }]}>
              In Cart {quantity}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {quantity > 0 ? `Add More (${quantity})` : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  imageWrap: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 146,
    backgroundColor: '#f0f0f0',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 146,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  imageTint: {
    ...StyleSheet.absoluteFill,
    opacity: 0.06,
  },
  content: {
    padding: 18,
    gap: 10,
  },
  brandTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  cartBadge: {
    fontSize: 11,
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  button: {
    marginTop: 2,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.4,
  },
});

export const ProductCard = memo(Card, (prevProps, nextProps) => {
  const prevQty = useCartStore.getState().items[prevProps.item.id] || 0;
  const nextQty = useCartStore.getState().items[nextProps.item.id] || 0;

  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.price === nextProps.item.price &&
    prevQty === nextQty
  );
});