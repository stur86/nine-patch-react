import { calcReferencedSize } from "./calc";
import { describe, it, expect } from "bun:test";


describe("calcReferencedSize", () => {
    it("should calculate pixel size correctly", () => {
        expect(calcReferencedSize("10px", 100)).toBe(10);
        expect(calcReferencedSize("20px", 100)).toBe(20);
    });

    it("should calculate percentage size correctly", () => {
        expect(calcReferencedSize("10%", 100)).toBe(10);
        expect(calcReferencedSize("20%", 500)).toBe(100);
    });

    it("should throw an error for invalid size strings", () => {
        expect(() => calcReferencedSize("10", 100)).toThrow();
        expect(() => calcReferencedSize("10em", 100)).toThrow();
    });
});
