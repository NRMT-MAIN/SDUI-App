import React, { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text, StyleSheet } from 'react-native';
import { SDUINode, CampaignPayload } from '../../types/schemas';
import { renderSDUINode } from './ComponentRegistry';
import { FullScreenOverlay } from './FullScreenOverlay';

interface SDUIEngineProps {
  payload: CampaignPayload;
}


export const SDUIEngine = React.memo(({ payload }: SDUIEngineProps) => {
  const validNodes = useMemo(() => {
    if (!Array.isArray(payload.layout_nodes)) {
      console.warn('[SDUI] Invalid layout_nodes: expected array');
      return [];
    }

    return payload.layout_nodes.filter((node): node is SDUINode => {
      if (!node || typeof node !== 'object') {
        console.warn('[SDUI] Invalid node: must be an object');
        return false;
      }

      if (!('type' in node) || !('payload' in node)) {
        console.warn('[SDUI] Invalid node structure: missing type or payload');
        return false;
      }

      return true;
    });
  }, [payload.layout_nodes]);

  const renderItem = useCallback(
    ({ item }: { item: SDUINode }) => {
      try {
        const Component = renderSDUINode(item);
        if (!Component) {
          return null;
        }
        return (
          <View style={styles.itemContainer}>
            <Component data={item.payload} />
          </View>
        );
      } catch (error) {
        console.error(`[SDUI] Error rendering node type ${item.type}:`, error);
        return null;
      }
    },
    []
  );

  const keyExtractor = useCallback((item: SDUINode, index: number) => {
    return `${item.type}-${index}`;
  }, []);

  // Empty state handling
  if (validNodes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No content available</Text>
      </View>
    );
  }

  return (
    <>
      <FullScreenOverlay overlay={payload.overlay} />
      <FlashList
        data={validNodes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        //estimatedItemSize={280}
        accessibilityRole="list"
        testID="sdui-engine-list"
      />
    </>
  );
});

SDUIEngine.displayName = 'SDUIEngine';

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 10,
    paddingBottom: 32,
    paddingHorizontal: 8,
  },
  itemContainer: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#7a7a7a',
    textAlign: 'center',
    lineHeight: 22,
  },
});