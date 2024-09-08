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
        img.onload = () => {
            setSize({ width: img.width, height: img.height });
        };
    }, [src]);

    return size;
}