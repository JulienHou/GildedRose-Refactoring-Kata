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
          item.quality < 50 && item.quality++;
          item.sellIn < 0 && item.quality < 50 && item.quality++;
          break;

        case "Sulfuras, Hand of Ragnaros":
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          item.sellIn--;
          item.quality < 50 && item.quality++;
          item.sellIn < 10 && item.quality < 50 && item.quality++;
          item.sellIn < 5 && item.quality < 50 && item.quality++;
          item.sellIn < 0 && (item.quality = 0);
          break;

        default:
          item.sellIn--;
          item.quality > 0 && item.quality--;
          item.sellIn < 0 && item.quality > 0 && item.quality--;
          break;
      }
    });

    return this.items;
  }
}
