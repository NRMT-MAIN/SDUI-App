import React, { memo, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ProductCard } from '../core/ProductCard';
import { ProductItem, DynamicCollectionPayload } from '../../types/schemas';
import { useAppTheme } from '../../context/ThemeProvider';
import { useCartStore } from '../../stores/CartStore';

interface DynamicCollectionProps {
  data: DynamicCollectionPayload;
}

const Collection = ({ data }: DynamicCollectionProps) => {
  const { theme } = useAppTheme();
  const activeCollectionId = useCartStore((state) => state.activeCollectionId);
  const isActiveCollection = activeCollectionId === data.collectionId;

  const renderItem = useCallback(
    ({ item }: { item: ProductItem }) => (
      <View style={styles.flatListStyle}>
        <ProductCard item={item} />
      </View>
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: ProductItem) => `${data.collectionId}_${item.id}`,
    [data.collectionId]
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: isActiveCollection ? theme.primary : 'transparent',
        },
      ]}
    >
      {data.title && (
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.primary }]}>{data.title}</Text>
          {isActiveCollection && (
            <Text style={[styles.activeTag, { color: theme.background, backgroundColor: theme.primary }]}>Selected</Text>
          )}
        </View>
      )}
      <FlatList
        horizontal
        data={data.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        removeClippedSubviews={true}
        windowSize={3}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        initialNumToRender={3}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        testID={`dynamic-collection-${data.collectionId}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  activeTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },

  flatListStyle: {
    width: 180,
    height: 320,
    margin: 8
  },
});

export const DynamicCollection = memo(Collection, (prev, next) => {
  // Prevent unnecessary re-renders if collection ID is the same
  return prev.data.collectionId === next.data.collectionId;
});