export type SDUIAction = 
  | { type: 'ADD_TO_CART'; payload: { id: string } }
  | { type: 'DEEP_LINK'; payload: { url: string } };

export interface ProductItem {
    id: string;
    name: string;
    price: number;
    action: SDUIAction;
}

export type SDUINode = 
  | { type: 'BANNER_HERO'; payload: { id: string; imageUrl: string } }
  | { type: 'DYNAMIC_COLLECTION'; payload: { collectionId: string; items: ProductItem[] } };

export interface CampaignPayload {
  theme: { primary: string; background: string };
  overlay: { type: string; animation_url: string } | null;
  layout_nodes: SDUINode[];
}