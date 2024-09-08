import { type PropsWithChildren, useMemo } from 'react';
import useImageSize from './imgsize';

type NinePatchProps = {
    src: string;
}

export default function NinePatch(props: PropsWithChildren<NinePatchProps>) {

    const imgSize = useImageSize(props.src);

    var w = (imgSize?.width || 0)*2;
    var h = (imgSize?.height || 0)*2;

    return <div style={{width: w, height: h, backgroundColor: '#ff0000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={props.src}></img>
    </div>;
}