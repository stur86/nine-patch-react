import { type PropsWithChildren, useRef, useEffect } from 'react';
import { useImageSize, useElementSize } from './hooks';

type NinePatchProps = {
    src: string;
}

export default function NinePatch(props: PropsWithChildren<NinePatchProps>) {

    const divRef = useRef<HTMLDivElement>(null);

    const imgSize = useImageSize(props.src);
    const divSize = useElementSize(divRef);


    var w = (imgSize?.width || 0)*2;
    var h = (imgSize?.height || 0)*2;

    return <div ref={divRef} style={{width: w, height: h, backgroundColor: '#ff0000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={props.src}></img>
        <p>
            {divSize?.width}x{divSize?.height}
        </p>
    </div>;
}