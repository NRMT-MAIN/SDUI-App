import React from 'react';
import { SDUINode } from '../../types/schemas';
import { BannerHero } from './BannerHero';
import { DynamicCollection } from './DynamicCollections';
import { ProductGridComponent } from './ProductGridComponent';


type ComponentFactory = React.FC<{ data: any }>;


class ComponentRegistryFactory {
  private registry: Map<string, ComponentFactory>;

  constructor() {
    this.registry = new Map();
    this.registerDefaultComponents();
  }

  private registerDefaultComponents(): void {
    this.register('BANNER_HERO', BannerHero);
    this.register('PRODUCT_GRID_2X2', ProductGridComponent);
    this.register('DYNAMIC_COLLECTION', DynamicCollection);
  }

  public register(type: string, component: ComponentFactory): void {
    this.registry.set(type, component);
  }

  
  public getComponent(type: string): ComponentFactory | null {
    return this.registry.get(type) ?? null;
  }


  public isRegistered(type: string): boolean {
    return this.registry.has(type);
  }

 
  public getRegisteredTypes(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const componentRegistry = new ComponentRegistryFactory();


export const renderSDUINode = (node: SDUINode): React.ComponentType<{ data: any }> | null => {
  const Component = componentRegistry.getComponent(node.type);

  if (!Component) {
    console.warn(
      `[SDUI] Unregistered component type: ${node.type}. Gracefully skipping.`
    );
    return null;
  }

  return Component;
};
