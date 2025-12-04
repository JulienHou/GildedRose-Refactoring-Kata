export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateAgedBrie(item: Item) {
    item.sellIn--;
    item.quality < MAX_QUALITY && item.quality++;
    item.sellIn < 0 && item.quality < MAX_QUALITY && item.quality++;
  }

  updateBackstagePass(item: Item) {
    item.sellIn--;
    item.quality < MAX_QUALITY && item.quality++;
    item.sellIn < 10 && item.quality < MAX_QUALITY && item.quality++;
    item.sellIn < 5 && item.quality < MAX_QUALITY && item.quality++;
    item.sellIn < 0 && (item.quality = MIN_QUALITY);
  }

  updateDefault(item: Item) {
    item.sellIn--;
    item.quality > MIN_QUALITY && item.quality--;
    item.sellIn < 0 && item.quality > 0 && item.quality--;
  }

  classifyItemType(itemType: string) {
    // Should be checked with business but there could be some clarification between the legacy code nad the original requirements
    if (itemType.includes("Aged Brie")) return "Brie";
    if (itemType.includes("Sulfuras, Hand of Ragnaros")) return "Sulfuras";
    if (itemType.includes("Backstage passes")) return "Backstage";
    return "normal";
  }

  updateQuality() {
    this.items.map((item) => {
      const itemType = this.classifyItemType(item.name);
      switch (itemType) {
        case "Brie":
          this.updateAgedBrie(item);
          break;

        case "Sulfuras":
          break;

        case "Backstage":
          this.updateBackstagePass(item);
          break;

        default:
          this.updateDefault(item);
          break;
      }
    });

    return this.items;
  }
}
