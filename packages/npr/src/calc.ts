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