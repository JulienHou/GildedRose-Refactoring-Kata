import { Item, GildedRose, MIN_QUALITY, MAX_QUALITY } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("Normal item", () => {
    const name = "normal item";
    it("should be properly initiated", () => {
      const sellIn = 5;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.items;

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn);
      expect(items[0].quality).toBe(quality);
    });

    it("should decrease quality", () => {
      const sellIn = 5;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality - 1);
    });

    it("quality should not be negative", () => {
      const sellIn = 2;
      const quality = 1;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 3);
      expect(items[0].quality).toBe(MIN_QUALITY);
    });

    it("sellIn negative should degrade quality twice faster", () => {
      const sellIn = 0;
      const quality = 5;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality - 2);
    });
  });

  describe("Aged Brie", () => {
    const name = "Aged Brie";
    it("should be properly initiated", () => {
      const sellIn = 5;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.items;

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn);
      expect(items[0].quality).toBe(quality);
    });

    it("should improve quality", () => {
      const sellIn = 5;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality + 1);
    });

    it("quality should not be more than 50", () => {
      const sellIn = 2;
      const quality = 49;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 3);
      expect(items[0].quality).toBe(50);
    });

    it("sellIn negative should improve quality twice faster", () => {
      const sellIn = 0;
      const quality = 5;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality + 2);
    });

    it("sellIn negative should improve quality twice faster but no more than 50", () => {
      const sellIn = 0;
      const quality = 50;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(MAX_QUALITY);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    const name = "Sulfuras, Hand of Ragnaros";
    const quality = 80;
    it("should be properly initiated", () => {
      const sellIn = 5;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.items;

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn);
      expect(items[0].quality).toBe(quality);
    });

    it("should not change quality and sellIn", () => {
      const sellIn = 5;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn);
      expect(items[0].quality).toBe(quality);
    });

    it("should not change quality and sellIn over time", () => {
      const sellIn = -1;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn);
      expect(items[0].quality).toBe(quality);
    });
  });

  describe("Backstage pass", () => {
    const name = "Backstage passes to a TAFKAL80ETC concert";
    it("should be properly initiated", () => {
      const sellIn = 5;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.items;

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn);
      expect(items[0].quality).toBe(quality);
    });

    it("should improve quality by 1 when more than 10 days", () => {
      const sellIn = 12;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality + 1);
    });

    it("should improve quality by 2 when between 10 and 5 days", () => {
      const sellIn = 10;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality + 2);
    });

    it("should improve quality by when less than 5 days", () => {
      const sellIn = 5;
      const quality = 10;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(quality + 3);
    });

    it("quality should not be negative", () => {
      const sellIn = 1;
      const quality = 0;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 3);
      expect(items[0].quality).toBe(MIN_QUALITY);
    });

    it("quality should drop to 0 when sellIn <= 0", () => {
      const sellIn = 0;
      const quality = 30;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(MIN_QUALITY);
    });

    it("should improve quality but no more than 50", () => {
      const sellIn = 6;
      const quality = 50;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 1);
      expect(items[0].quality).toBe(MAX_QUALITY);
    });
  });
});
