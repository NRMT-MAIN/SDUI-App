import { CampaignPayload, CampaignContext } from '../types/schemas';

// Campaign 1: Back to School Mega-Sale
const backToSchoolCampaign: CampaignPayload = {
  id: 'back-to-school',
  name: 'Back to School Mega-Sale',
  imageUrl: 'https://i.pinimg.com/736x/d3/23/4b/d3234b716e87efa89651203df43ed7dd.jpg',
  theme: {
    primary: '#FFD700',
    background: '#FFF5E6',
    secondary: '#0033A0',
    accent: '#FF6B35',
  },
  overlay: {
    type: 'FULL_SCREEN_OVERLAY',
    animation_url: '',
    pointerEvents: 'none',
  },
  layout_nodes: [
    {
      type: 'BANNER_HERO',
      payload: {
        id: 'bts_hero_1',
        imageUrl: 'https://i.pinimg.com/736x/d3/23/4b/d3234b716e87efa89651203df43ed7dd.jpg',
        title: 'Back to School Sale',
      },
    },
    {
      type: 'PRODUCT_GRID_2X2',
      payload: {
        id: 'bts_grid_1',
        columns: 2,
        items: [
          {
            id: 'product_lunch_1',
            name: 'Premium Lunchbox',
            price: 499,
            imageUrl: 'https://picsum.photos/seed/back-to-school-lunchbox/500/500',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_lunch_1' } },
          },
          {
            id: 'product_bag_1',
            name: 'School Backpack',
            price: 799,
            imageUrl: 'https://picsum.photos/seed/back-to-school-backpack/500/500',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_bag_1' } },
          },
          {
            id: 'product_lunch_2',
            name: 'Stainless Tiffin',
            price: 399,
            imageUrl: 'https://picsum.photos/seed/back-to-school-tiffin/500/500',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_lunch_2' } },
          },
          {
            id: 'product_bag_2',
            name: 'Sports Bag',
            price: 599,
            imageUrl: 'https://picsum.photos/seed/back-to-school-sports-bag/500/500',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_bag_2' } },
          },
        ],
      },
    },
    {
      type: 'DYNAMIC_COLLECTION',
      payload: {
        collectionId: 'bts_collection_1',
        title: 'Lunchboxes & Bags',
        items: [
          {
            id: 'bts_item_1',
            name: 'Insulated Lunchbox',
            price: 649,
            imageUrl: 'https://picsum.photos/seed/back-to-school-insulated-lunchbox/420/420',
            action: { type: 'ADD_TO_CART', payload: { id: 'bts_item_1' } },
          },
          {
            id: 'bts_item_2',
            name: 'Travel Backpack',
            price: 1299,
            imageUrl: 'https://picsum.photos/seed/back-to-school-travel-backpack/420/420',
            action: { type: 'ADD_TO_CART', payload: { id: 'bts_item_2' } },
          },
          {
            id: 'bts_item_3',
            name: 'Lunch Bag',
            price: 349,
            imageUrl: 'https://picsum.photos/seed/back-to-school-lunch-bag/420/420',
            action: { type: 'ADD_TO_CART', payload: { id: 'bts_item_3' } },
          },
          {
            id: 'bts_item_4',
            name: 'School Bag',
            price: 899,
            imageUrl: 'https://picsum.photos/seed/back-to-school-school-bag/420/420',
            action: { type: 'ADD_TO_CART', payload: { id: 'bts_item_4' } },
          },
          {
            id: 'bts_item_5',
            name: 'Water Bottle',
            price: 249,
            imageUrl: 'https://picsum.photos/seed/back-to-school-water-bottle/420/420',
            action: { type: 'ADD_TO_CART', payload: { id: 'bts_item_5' } },
          },
        ],
      },
    },
  ],
};

// Campaign 2: Summer Playhouse Festival
const summerPlayhouseCampaign: CampaignPayload = {
  id: 'summer-playhouse',
  name: 'Summer Playhouse Festival',
  imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=320&h=240&fit=crop',
  theme: {
    primary: '#00B4D8',
    background: '#E0F7FF',
    secondary: '#0077B6',
    accent: '#00D4FF',
  },
  overlay: {
    type: 'FULL_SCREEN_OVERLAY',
    animation_url: '',
    pointerEvents: 'none',
  },
  layout_nodes: [
    {
      type: 'BANNER_HERO',
      payload: {
        id: 'summer_hero_1',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop',
        title: 'Summer Festival',
      },
    },
    {
      type: 'PRODUCT_GRID_2X2',
      payload: {
        id: 'summer_grid_1',
        columns: 2,
        items: [
          {
            id: 'product_beach_1',
            name: 'Beach Ball',
            price: 299,
            imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_beach_1' } },
          },
          {
            id: 'product_zoo_1',
            name: 'Petting Zoo Ticket',
            price: 1299,
            imageUrl: 'https://images.unsplash.com/photo-1478098711619-69891b0ec21a?w=200&h=200&fit=crop',
            action: { type: 'OPEN_COLLECTION', payload: { collectionId: 'zoo_tickets' } },
          },
          {
            id: 'product_splash_1',
            name: 'Water Splash Kit',
            price: 599,
            imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_splash_1' } },
          },
          {
            id: 'product_swim_1',
            name: 'Swimming Goggles',
            price: 399,
            imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=200&h=200&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_swim_1' } },
          },
        ],
      },
    },
    {
      type: 'DYNAMIC_COLLECTION',
      payload: {
        collectionId: 'summer_collection_1',
        title: 'Summer Essentials',
        items: [
          {
            id: 'summer_item_1',
            name: 'Beach Umbrella',
            price: 899,
            imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'summer_item_1' } },
          },
          {
            id: 'summer_item_2',
            name: 'Sunscreen SPF 50',
            price: 349,
            imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'summer_item_2' } },
          },
          {
            id: 'summer_item_3',
            name: 'Cool Vest',
            price: 1199,
            imageUrl: 'https://images.unsplash.com/photo-1595777707802-a9f1d5c89fa6?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'summer_item_3' } },
          },
          {
            id: 'summer_item_4',
            name: 'Hydration Pack',
            price: 649,
            imageUrl: 'https://images.unsplash.com/photo-1602143407151-7e36ee6485da?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'summer_item_4' } },
          },
          {
            id: 'summer_item_5',
            name: 'Hat Collection',
            price: 449,
            imageUrl: 'https://images.unsplash.com/photo-1552062407-c2625db77860?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'summer_item_5' } },
          },
        ],
      },
    },
  ],
};

// Campaign 3: Mystery Gift Carnival
const mysteryGiftCampaign: CampaignPayload = {
  id: 'mystery-gift',
  name: 'Mystery Gift Carnival',
  imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=320&h=240&fit=crop',
  theme: {
    primary: '#FF0000',
    background: '#FFE0E0',
    secondary: '#CC0000',
    accent: '#FF6B6B',
  },
  overlay: {
    type: 'FULL_SCREEN_OVERLAY',
    animation_url: '',
    pointerEvents: 'none',
  },
  layout_nodes: [
    {
      type: 'BANNER_HERO',
      payload: {
        id: 'mystery_hero_1',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=200&fit=crop',
        title: 'Mystery Gift Carnival',
      },
    },
    {
      type: 'PRODUCT_GRID_2X2',
      payload: {
        id: 'mystery_grid_1',
        columns: 2,
        items: [
          {
            id: 'product_mystery_1',
            name: 'Mystery Box Red',
            price: 999,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_mystery_1' } },
          },
          {
            id: 'product_mystery_2',
            name: 'Lucky Gift Pack',
            price: 1499,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_mystery_2' } },
          },
          {
            id: 'product_mystery_3',
            name: 'Surprise Bundle',
            price: 1299,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'product_mystery_3' } },
          },
          {
            id: 'product_mystery_4',
            name: 'Carnival Combo',
            price: 1799,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop',
            action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'MYSTERY25' } },
          },
        ],
      },
    },
    {
      type: 'DYNAMIC_COLLECTION',
      payload: {
        collectionId: 'mystery_collection_1',
        title: 'Mystery Gifts & Surprises',
        items: [
          {
            id: 'mystery_item_1',
            name: 'Golden Mystery',
            price: 2499,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'mystery_item_1' } },
          },
          {
            id: 'mystery_item_2',
            name: 'Premium Surprise',
            price: 2999,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'mystery_item_2' } },
          },
          {
            id: 'mystery_item_3',
            name: 'Lucky Hamper',
            price: 1999,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'mystery_item_3' } },
          },
          {
            id: 'mystery_item_4',
            name: 'Deluxe Gift Box',
            price: 3499,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150&h=150&fit=crop',
            action: { type: 'APPLY_MYSTERY_GIFT_COUPON', payload: { couponCode: 'DELUXE50' } },
          },
          {
            id: 'mystery_item_5',
            name: 'Gift Certificate',
            price: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150&h=150&fit=crop',
            action: { type: 'ADD_TO_CART', payload: { id: 'mystery_item_5' } },
          },
        ],
      },
    },
  ],
};

export const getAllCampaigns = (): CampaignContext => {
  return {
    activeCampaignId: 'back-to-school',
    campaigns: [backToSchoolCampaign, summerPlayhouseCampaign, mysteryGiftCampaign],
  };
};

export const getCampaignById = (id: string): CampaignPayload | undefined => {
  const context = getAllCampaigns();
  return context.campaigns.find((c) => c.id === id);
};

export const fetchPayload = async (campaignId?: string): Promise<CampaignPayload> => {
  await new Promise<void>((resolve: (value?: void) => void) => setTimeout(() => resolve(), 300));

  const targetId = campaignId || 'back-to-school';
  const campaign = getCampaignById(targetId);

  if (!campaign) {
    throw new Error(`Campaign ${targetId} not found`);
  }

  return campaign;
};