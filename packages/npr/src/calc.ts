import { type Size, type Border } from './types';

const sizeStrRe = /(\d+)(px|%)/;

export function calcReferencedSize(sizestr: string, refsize: number): number {
    const match = sizestr.match(sizeStrRe);

    if (!match) {
        throw new Error('Invalid size string');
    }

    const size = parseFloat(match[1]);
    const unit = match[2];

    switch (unit) {
        case 'px':
            return size;
        case '%':
            return refsize*size/100;
        default:
            throw new Error('Invalid unit');
    }
}

export class BorderCalculator {

    _border: Border;
    _ref: Size;

    constructor(border: Border, ref: Size) {
        this._border = border;
        this._ref = ref;
    }

    get left(): number {
        return calcReferencedSize(this._border.left, this._ref.width);
    }

    get right(): number {
        return calcReferencedSize(this._border.right, this._ref.width);
    }

    get top(): number {
        return calcReferencedSize(this._border.top, this._ref.height);
    }

    get bottom(): number {
        return calcReferencedSize(this._border.bottom, this._ref.height);
    }
};

export class GridStyleCalculator {

    _imgSize: Size;
    _divSize: Size;
    _border: BorderCalculator;

    constructor(imgSize: Size, divSize: Size, border: Border) {
        this._imgSize = imgSize;
        this._divSize = divSize;
        this._border = new BorderCalculator(border, imgSize);
    }

    get gridStyle(): Record<string, string> {
        return {
            display: 'grid',
            gridTemplateColumns: `${this._border.left}px auto ${this._border.right}px`,
            gridTemplateRows: `${this._border.top}px auto ${this._border.bottom}px`
        };
    }

    getCellStyle(row: number, col: number): Record<string, string> {
        const cStyle = {
            gridRow: `${row+1} / ${row+2}`,
            gridColumn: `${col+1} / ${col+2}`
        };

        return cStyle;
    }
        
}