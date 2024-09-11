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
    
    get width(): number {
        return this.left+this.right;
    }

    get height(): number {
        return this.top+this.bottom;
    }
};

export class GridStyleCalculator {

    _imgSize: Size;
    _divSize: Size;
    _border: BorderCalculator;
    _scale: number;

    constructor(imgSize: Size, divSize: Size, border: Border, scale: number = 1.0) {
        this._imgSize = imgSize;
        this._divSize = divSize;
        this._border = new BorderCalculator(border, imgSize);
        this._scale = scale;
    }

    get gridStyle(): Record<string, string> {
        return {
            display: 'grid',
            gridTemplateColumns: `${this._border.left*this._scale}px auto ${this._border.right*this._scale}px`,
            gridTemplateRows: `${this._border.top*this._scale}px auto ${this._border.bottom*this._scale}px`
        };
    }

    getCellStyle(row: number, col: number): Record<string, string> {

        const bPosV = ['top', 'center', 'bottom'][row];
        const bPosH = ['left', 'center', 'right'][col];

        let bSizeH = `${this._imgSize.width*this._scale}px`;
        let bSizeV = `${this._imgSize.height*this._scale}px`;

        // Size must be adjusted for non-corner cells
        if (row === 1) {
            const targH = this._divSize.height-this._border.height;
            const baseH = this._imgSize.height-this._border.height;
            bSizeV = `${this._imgSize.height*targH/baseH}px`
        }

        if (col === 1) {
            const targW = this._divSize.width-this._border.width;
            const baseW = this._imgSize.width-this._border.width;
            bSizeH = `${this._imgSize.width*targW/baseW}px`
        }

        const cStyle = {
            backgroundRepeat: 'no-repeat',
            gridRow: `${row+1} / ${row+2}`,
            gridColumn: `${col+1} / ${col+2}`,
            backgroundPosition: `${bPosH} ${bPosV}`,
            backgroundSize: `${bSizeH} ${bSizeV}`
        };

        return cStyle;
    }
        
}