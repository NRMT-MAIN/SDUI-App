import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';
import { ProductItem } from '../../types/schemas';
import { useAppTheme } from '../../context/ThemeProvider';

interface ProductGridProps {
  items: ProductItem[];
  columns?: number;
}

const Grid = ({ items, columns = 2 }: ProductGridProps) => {
  const { theme } = useAppTheme();

  const rows = useMemo(() => {
    const result: ProductItem[][] = [];
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns));
    }
    return result;
  }, [items, columns]);

  const gridItemWidth = 100 / columns;

  return (
    <View style={[styles.gridContainer, { backgroundColor: theme.background }]}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((item) => (
            <View
              key={item.id}
              style={[
                styles.gridItem,
                { width: `${gridItemWidth}%` },
              ]}
            >
              <ProductCard item={item} />
            </View>
          ))}
          {/* Placeholder items for incomplete rows */}
          {row.length < columns &&
            Array.from({ length: columns - row.length }).map((_, idx) => (
              <View
                key={`placeholder-${rowIndex}-${idx}`}
                style={[
                  styles.gridItem,
                  { width: `${gridItemWidth}%` },
                  styles.placeholder,
                ]}
              />
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingBottom: 20,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  gridItem: {
    paddingHorizontal: 3,
  },
  placeholder: {
    backgroundColor: 'transparent',
  },
});

export const ProductGrid = memo(Grid, (prev, next) => {
  // Re-render only if items or columns change
  return prev.items === next.items && prev.columns === next.columns;
});
