import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { ProductCard } from '../core/ProductCard';
import { ProductItem } from '../../types/schemas';

const Collection = ({ data }: { data: { items: ProductItem[], collectionId: string } }) => {
  return (
    <FlatList
      horizontal
      data={data.items}
      showsHorizontalScrollIndicator={false}
      directionalLockEnabled={true}
      removeClippedSubviews={true}
      windowSize={3}
      keyExtractor={(item) => `${data.collectionId}_${item.id}`}
      renderItem={({ item }) => <ProductCard item={item} />}
    />
  );
};

export const DynamicCollection = memo(Collection, (prev, next) => prev.data.collectionId === next.data.collectionId);