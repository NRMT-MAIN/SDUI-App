import React, { memo } from 'react';
import { ProductGrid } from '../core/ProductGrid';
import { ProductGridPayload } from '../../types/schemas';
import { StyleSheet, View } from 'react-native';

interface ProductGridComponentProps {
  data: ProductGridPayload;
}

const GridComponent = ({ data }: ProductGridComponentProps) => {
  return <View style={styles.card}>
    <ProductGrid items={data.items} columns={data.columns || 2} />
  </View>;
};


const styles = StyleSheet.create({
  card: {       
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: '100%',
    height: 120,         // fixed image height
    resizeMode: 'cover', // ensures full coverage
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  price: {
    fontSize: 13,
    color: '#444',
    marginVertical: 4,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export const ProductGridComponent = memo(GridComponent);
