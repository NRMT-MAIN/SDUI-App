// Action types
export type SDUIAction = 
  | { type: 'ADD_TO_CART'; payload: { id: string } }
  | { type: 'DEEP_LINK'; payload: { url: string } }
  | { type: 'APPLY_MYSTERY_GIFT_COUPON'; payload: { couponCode: string } }
  | { type: 'OPEN_COLLECTION'; payload: { collectionId: string } };

// Product and item types
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  action: SDUIAction;
}

// Theme configuration
export interface ThemeConfig {
  primary: string;
  background: string;
  secondary?: string;
  accent?: string;
}

// Overlay configuration
export interface OverlayConfig {
  type: 'FULL_SCREEN_OVERLAY';
  animation_url: string;
  pointerEvents?: 'none' | 'auto';
}

// Component payload types
export interface BannerHeroPayload {
  id: string;
  imageUrl: string;
  title?: string;
}

export interface ProductGridPayload {
  id: string;
  items: ProductItem[];
  columns?: number;
}

export interface DynamicCollectionPayload {
  collectionId: string;
  title?: string;
  items: ProductItem[];
}


export type SDUINode = 
  | { type: 'BANNER_HERO'; payload: BannerHeroPayload }
  | { type: 'PRODUCT_GRID_2X2'; payload: ProductGridPayload }
  | { type: 'DYNAMIC_COLLECTION'; payload: DynamicCollectionPayload };

export interface CampaignPayload {
  id: string;
  name: string;
  imageUrl?: string;
  theme: ThemeConfig;
  overlay: OverlayConfig | null;
  layout_nodes: SDUINode[];
}

export interface CampaignContext {
  activeCampaignId: string;
  campaigns: CampaignPayload[];
}