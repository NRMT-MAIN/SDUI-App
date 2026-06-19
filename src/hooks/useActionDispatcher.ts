import { useCallback } from 'react';
import { useCartStore } from '../stores/CartStore';
import { SDUIAction } from '../types/schemas';

export const useActionDispatcher = () => {
  const incrementItem = useCartStore((state) => state.incrementItem);

  const handleAction = useCallback((action: SDUIAction) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        incrementItem(action.payload.id);
        break;
      case 'DEEP_LINK':
        console.log(`Navigating to ${action.payload.url}`);
        break;
    }
  }, [incrementItem]);

  return { handleAction };
};