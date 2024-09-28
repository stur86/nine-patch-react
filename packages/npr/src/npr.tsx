import { type PropsWithChildren, useRef } from 'react';
import { useImageSize, useElementSize } from './hooks';
import { GridStyleCalculator } from './calc';

export type NinePatchProps = {
    src: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderBottom?: string;
    scale?: number;
    pixelPerfect?: boolean;
}

export default function NinePatch({
    children,
    src,
    scale = 1,
    borderLeft = '33%',
    borderRight = '33%',
    borderTop = '33%',
    borderBottom = '33%',
    pixelPerfect = false
}: PropsWithChildren<NinePatchProps>) {

    const divRef = useRef<HTMLDivElement>(null);

    const imgSize = useImageSize(src);
    const divSize = useElementSize(divRef);
    
    let styleCalc = null;
    if (
        imgSize !== null &&
        divSize !== null
    ) {
        styleCalc = new GridStyleCalculator(imgSize, divSize, {
            left: borderLeft,
            right: borderRight,
            top: borderTop,
            bottom: borderBottom
        }, scale);
    }

    const contStyle = {...styleCalc?.gridStyle};
    // Pixel perfect scaling
    if (pixelPerfect) {
        contStyle["image-rendering"] = "pixelated";
    }
    

    return <div className='npr-grid-rect' ref={divRef} style={contStyle}>
        {
            [0, 1, 2].map(x => {
                return [0, 1, 2].map(y => {
                    return <div className='npr-grid-cell' key={`${x}-${y}`}
                    style={{backgroundImage: `url(${src})`, ...styleCalc?.getCellStyle(x, y)}}>
                        {(x === 1 && y === 1) ? children : null}
                    </div>;
                });
            })
        }
    </div>;
}