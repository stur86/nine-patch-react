import { expect, describe, it, mock, spyOn } from "bun:test";
import { useImageSize, useElementSize } from "./hooks";
import { render, waitFor } from "@testing-library/react";
import { useRef, type RefObject } from "react";
import { testFrameURI } from "./test_data";
import { renderHook } from '@testing-library/react';

describe("useElementSize", () => {

  it("should detect the correct size from the bounding rect", () => {
    class MockRef implements RefObject<HTMLElement> {
      current: HTMLElement;
      constructor(el: HTMLElement) {
        this.current = el;
      }
    }

    const divEl = document.createElement('div');
    spyOn(divEl, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 50));
    const mockRef = new MockRef(divEl);

    const { result } = renderHook(() => useElementSize(mockRef));
    expect(result.current).toEqual({width: 100, height: 50});
  });

});

describe("useImageSize", () => {
  it("should detect the correct size from the image", async () => {

    class MockImage {
      src: string;
      naturalWidth: number;
      naturalHeight: number;

      constructor() {
        this.src = '';
        this.naturalWidth = 0;
        this.naturalHeight = 0;
      }
      
      async decode() {
        const [w, h] = this.src.split('x').map((x) => parseInt(x));
        this.naturalWidth = w;
        this.naturalHeight = h;
        return;
      }
    }

    // @ts-ignore
    spyOn(window, 'Image').mockImplementation(() => new MockImage());

    let { result } = renderHook(() => useImageSize('20x10'));
    waitFor(() => {
      expect(result.current).toEqual({width: 20, height: 10});
    });

    result = renderHook(() => useImageSize('50x100')).result;
    waitFor(() => {
      expect(result.current).toEqual({width: 50, height: 100});
    });

  });
});