import { useEffect, useState, useRef } from 'react';

type Size = {
    width: number;
    height: number;
};

export function useImageSize(src: string): Size | null {
    const [size, setSize] = useState<Size | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.decode().then(() => {
            setSize({ width: img.naturalWidth, height: img.naturalHeight });
        });
    }, [src]);

    return size;
}

export function useElementSize(ref: React.RefObject<HTMLElement>): Size | null {
    const [size, setSize] = useState<Size | null>(null);
    const obsRef = useRef<ResizeObserver>(new ResizeObserver(updateSize));

    function updateSize() {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const newSize = {
                width: rect.width,
                height: rect.height,
            };
            if (size === null || size.width !== newSize.width || size.height !== newSize.height) {
                setSize(newSize);
            }
        }
    }

    useEffect(() => {
        if (ref.current) {
            obsRef.current.observe(ref.current);
            updateSize();
        }
        else {
            obsRef.current.disconnect();
        }
    }, [ref.current]);


    return size;
}