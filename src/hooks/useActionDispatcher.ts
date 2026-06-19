import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { useCartStore } from '../stores/CartStore';
import { SDUIAction } from '../types/schemas';

export const useActionDispatcher = () => {
  const incrementItem = useCartStore((state) => state.incrementItem);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const setActiveCollection = useCartStore((state) => state.setActiveCollection);

  const handleAction = useCallback((action: SDUIAction) => {
    if (!action) {
      console.warn('[ActionDispatcher] Action is null or undefined');
      return;
    }

    try {
      switch (action.type) {
        case 'ADD_TO_CART':
          if (!action.payload?.id) {
            console.warn('[ActionDispatcher] ADD_TO_CART: Missing item ID');
            return;
          }
          incrementItem(action.payload.id);
          console.log(`[ActionDispatcher] Added to cart: ${action.payload.id}`);
          break;

        case 'DEEP_LINK':
          if (!action.payload?.url) {
            console.warn('[ActionDispatcher] DEEP_LINK: Missing URL');
            return;
          }
          Linking.canOpenURL(action.payload.url)
            .then((canOpen) => {
              if (!canOpen) {
                Alert.alert('Unable to open link', action.payload.url);
                return;
              }

              return Linking.openURL(action.payload.url);
            })
            .catch((error) => {
              console.error('[ActionDispatcher] Error opening deep link:', error);
              Alert.alert('Unable to open link', action.payload.url);
            });
          break;

        case 'APPLY_MYSTERY_GIFT_COUPON':
          if (!action.payload?.couponCode) {
            console.warn('[ActionDispatcher] APPLY_MYSTERY_GIFT_COUPON: Missing coupon code');
            return;
          }
          if (applyCoupon(action.payload.couponCode)) {
            Alert.alert('Coupon applied', `${action.payload.couponCode} added to your cart.`);
          } else {
            Alert.alert('Coupon already applied', action.payload.couponCode);
          }
          break;

        case 'OPEN_COLLECTION':
          if (!action.payload?.collectionId) {
            console.warn('[ActionDispatcher] OPEN_COLLECTION: Missing collection ID');
            return;
          }
          setActiveCollection(action.payload.collectionId);
          Alert.alert('Collection selected', `Showing ${action.payload.collectionId}`);
          break;

        default:
          // Exhaustive check - TypeScript will warn if new action types are added
            const _exhaustive: never = (action as never);
          console.warn(`[ActionDispatcher] Unknown action type: ${_exhaustive}`);
      }
    } catch (error) {
      console.error('[ActionDispatcher] Error handling action:', error);
    }
  }, [incrementItem]);

  return { handleAction };
};