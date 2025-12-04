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

  updateQuality() {
    this.items.map((item) => {
      switch (item.name) {
        case "Aged Brie":
          item.sellIn--;
          item.quality < MAX_QUALITY && item.quality++;
          item.sellIn < 0 && item.quality < MAX_QUALITY && item.quality++;
          break;

        case "Sulfuras, Hand of Ragnaros":
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          item.sellIn--;
          item.quality < MAX_QUALITY && item.quality++;
          item.sellIn < 10 && item.quality < MAX_QUALITY && item.quality++;
          item.sellIn < 5 && item.quality < MAX_QUALITY && item.quality++;
          item.sellIn < 0 && (item.quality = MIN_QUALITY);
          break;

        default:
          item.sellIn--;
          item.quality > MIN_QUALITY && item.quality--;
          item.sellIn < 0 && item.quality > 0 && item.quality--;
          break;
      }
    });

    return this.items;
  }
}
