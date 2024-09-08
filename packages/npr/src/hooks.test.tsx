import { expect, test } from "bun:test";
import { useImageSize, useElementSize } from "./hooks";
import { render, waitFor } from "@testing-library/react";
import { useRef } from "react";

// A test image URI of size 20x10
const testUrl =
  ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAACVBMVEX/AAAA/9H///+eHtrpAAAAHklEQVR4" +
   "nGNgAAJGJMAAA8QJghhMSAAsQaEgZU4CAFLaAMneKosGAAAAHXRFWHRTb2Z0d2FyZQBAbHVuYXBhaW50L3BuZy1jb2RlY/VDGR4AAAAASUVORK5CYII=");

test("useImageSize", async () => {
  function TestComponent() {
    const imgSize = useImageSize(testUrl);
    return (
      <div>
        {imgSize?.width}x{imgSize?.height}
      </div>
    );
  }

  // Render the component
  const { container } = render(<TestComponent />);

  // Check if the component renders the correct size
  expect(container.textContent).toBe("x");
  // Now wait for the image to load
  waitFor(() => {
    expect(container.textContent).toBe("20x10");
  });
});

test("useElementSize", async () => {
  function TestComponent() {
    const ref = useRef<HTMLDivElement>(null);
    const divSize = useElementSize(ref);
    return <div id="test" ref={ref} style={{width: '100px', height: '50px'}}>
      {divSize?.width}x{divSize?.height}
    </div>;
  };

  // Render the component
  const { container } = render(<TestComponent />);

  // Retrieve the div element
  const div = container.querySelector("#test");
  expect(div).not.toBeNull();
  // Check if the component renders the correct size
  expect(div?.textContent).toBe("0x0");
  // Now wait for the element to resize
  waitFor(() => {
    expect(div?.textContent).toBe("100x50");
  });
});