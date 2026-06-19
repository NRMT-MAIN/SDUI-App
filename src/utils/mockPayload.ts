import { CampaignPayload } from '../types/schemas';

export const fetchPayload = async (): Promise<CampaignPayload> => {
  return {
    theme: { primary: "#FFD700", background: "#0033A0" }, 
    overlay: { 
        type: "FULL_SCREEN_OVERLAY", 
        animation_url: "https://assets.example.com/paper_airplanes.json" 
    },
    layout_nodes: [
      { 
        type: "BANNER_HERO", 
        payload: { 
            id: "hero_1", 
            imageUrl: "banner.jpg" 
        } },
      { 
        type: "DYNAMIC_COLLECTION", 
        payload: { 
            collectionId: "col_1", 
            items: [
        { id: "item_1", 
          name: "Lunchbox", 
          price: 500, 
          action: { 
            type: "ADD_TO_CART", 
            payload: { id: "item_1" } 
        } }
      ]}}
    ]
  };
};