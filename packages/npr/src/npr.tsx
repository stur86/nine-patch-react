import { type PropsWithChildren, useRef } from 'react';
import { useImageSize, useElementSize } from './hooks';
import { GridStyleCalculator } from './calc';

type NinePatchProps = {
    src: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderBottom?: string;
}

export default function NinePatch({
    children,
    src,
    borderLeft = '33%',
    borderRight = '33%',
    borderTop = '33%',
    borderBottom = '33%'
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
        });
    }
    

    return <div className='npr-grid-rect' ref={divRef} style={styleCalc?.gridStyle}>
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