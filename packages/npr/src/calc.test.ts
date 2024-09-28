import { calcReferencedSize, GridStyleCalculator, BorderCalculator } from "./calc";
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

describe("BorderCalculator", () => {
    it("should calculate border sizes correctly", () => {
        const border = new BorderCalculator({
            left: "10%",
            right: "20%",
            top: "30%",
            bottom: "40%"
        }, {width: 100, height: 200});

        expect(border.left).toBe(10);
        expect(border.right).toBe(20);
        expect(border.top).toBe(60);
        expect(border.bottom).toBe(80);
        expect(border.width).toBe(30);
        expect(border.height).toBe(140);
    });

    it("should work with pixel sizes", () => {
        const border = new BorderCalculator({
            left: "10px",
            right: "20px",
            top: "30px",
            bottom: "40px"
        }, {width: 100, height: 200});

        expect(border.left).toBe(10);
        expect(border.right).toBe(20);
        expect(border.top).toBe(30);
        expect(border.bottom).toBe(40);
        expect(border.width).toBe(30);
        expect(border.height).toBe(70);
    });
});

describe("GridStyleCalculator", () => {
    it("should calculate grid and cell styles correctly", () => {
        const grid = new GridStyleCalculator(
        {width: 100, height: 200}, 
        {width: 240, height: 320}, 
        {
            left: "10%",
            right: "20%",
            top: "30%",
            bottom: "40%"
        });

        expect(grid.gridStyle).toEqual({
            display: "grid",
            gridTemplateColumns: "10px auto 20px",
            gridTemplateRows: "60px auto 80px"
        });

        // Now for cell styles
        expect(grid.getCellStyle(0, 0)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "1 / 2",
            gridColumn: "1 / 2",
            backgroundPosition: "left top",
            backgroundSize: "100px 200px"
        });
        expect(grid.getCellStyle(1, 0)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "2 / 3",
            gridColumn: "1 / 2",
            backgroundPosition: "left center",
            backgroundSize: "100px 600px"
        });
        expect(grid.getCellStyle(2, 0)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "3 / 4",
            gridColumn: "1 / 2",
            backgroundPosition: "left bottom",
            backgroundSize: "100px 200px"
        });
        expect(grid.getCellStyle(0, 1)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "1 / 2",
            gridColumn: "2 / 3",
            backgroundPosition: "center top",
            backgroundSize: "300px 200px"
        });
        expect(grid.getCellStyle(1, 1)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "2 / 3",
            gridColumn: "2 / 3",
            backgroundPosition: "center center",
            backgroundSize: "300px 600px"
        });
        expect(grid.getCellStyle(2, 1)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "3 / 4",
            gridColumn: "2 / 3",
            backgroundPosition: "center bottom",
            backgroundSize: "300px 200px"
        });
        expect(grid.getCellStyle(0, 2)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "1 / 2",
            gridColumn: "3 / 4",
            backgroundPosition: "right top",
            backgroundSize: "100px 200px"
        });
        expect(grid.getCellStyle(1, 2)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "2 / 3",
            gridColumn: "3 / 4",
            backgroundPosition: "right center",
            backgroundSize: "100px 600px"
        });
        expect(grid.getCellStyle(2, 2)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "3 / 4",
            gridColumn: "3 / 4",
            backgroundPosition: "right bottom",
            backgroundSize: "100px 200px"
        });
    });

    it("should deal with scaling", () => {
        const grid = new GridStyleCalculator(
            {width: 100, height: 200}, 
            {width: 240, height: 320}, 
            {
                left: "10%",
                right: "20%",
                top: "30%",
                bottom: "40%"
        }, 1.5);

        expect(grid.gridStyle).toEqual({
            display: "grid",
            gridTemplateColumns: "15px auto 30px",
            gridTemplateRows: "90px auto 120px"
        });

        // Grab a corner cell
        expect(grid.getCellStyle(0, 0)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "1 / 2",
            gridColumn: "1 / 2",
            backgroundPosition: "left top",
            backgroundSize: "150px 300px"
        });
        // Grab a side cell
        expect(grid.getCellStyle(1, 0)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "2 / 3",
            gridColumn: "1 / 2",
            backgroundPosition: "left center",
            backgroundSize: "150px 600px"
        });
        // Other side
        expect(grid.getCellStyle(0, 1)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "1 / 2",
            gridColumn: "2 / 3",
            backgroundPosition: "center top",
            backgroundSize: "300px 300px"
        });
        // Grab the center cell
        expect(grid.getCellStyle(1, 1)).toEqual({
            backgroundRepeat: "no-repeat",
            gridRow: "2 / 3",
            gridColumn: "2 / 3",
            backgroundPosition: "center center",
            backgroundSize: "300px 600px"
        });
    });
});