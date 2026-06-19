import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useActionDispatcher } from '../../hooks/useActionDispatcher';
import { useCartStore } from '../../stores/CartStore';
import { ProductItem } from '../../types/schemas';

const Card = ({ item }: { item: ProductItem }) => {
  const { handleAction } = useActionDispatcher();
  const quantity = useCartStore((state) => state.items[item.id] || 0);

  return (
    <View style={styles.card}>
      <Text>{item.name}</Text>
      <Text>In Cart: {quantity}</Text>
      <TouchableOpacity onPress={() => handleAction(item.action)}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ProductCard = memo(Card);

const styles = StyleSheet.create({ 
    card: { 
        padding: 16, 
        margin: 8, 
        backgroundColor: '#fff' 
    } 
});