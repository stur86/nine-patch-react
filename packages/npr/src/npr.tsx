import { type PropsWithChildren, useRef } from 'react';
import { useImageSize, useElementSize } from './hooks';

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

    var w = (imgSize?.width || 0)*2;
    var h = (imgSize?.height || 0)*2;

    return <div ref={divRef} style={{width: w, height: h, backgroundColor: '#ff0000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={src}></img>
        <p>
            {divSize?.width}x{divSize?.height}
        </p>
    </div>;
}