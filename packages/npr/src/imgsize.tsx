import { useEffect, useState } from 'react';

type ImageSize = {
    width: number;
    height: number;
};

export default function useImageSize(src: string): ImageSize | null {
    const [size, setSize] = useState<ImageSize | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.decode().then(() => {
            setSize({ width: img.naturalWidth, height: img.naturalHeight });
        });
    }, [src]);

    return size;
}