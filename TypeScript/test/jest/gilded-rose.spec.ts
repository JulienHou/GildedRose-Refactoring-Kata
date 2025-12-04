import { Item, GildedRose } from "@/gilded-rose";

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
      const sellIn = 5;
      const quality = 2;
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(name);
      expect(items[0].sellIn).toBe(sellIn - 3);
      expect(items[0].quality).toBe(0);
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
      const sellIn = 6;
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
  });
});
