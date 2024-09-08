import { expect, test } from "bun:test";
import useImageSize from "./imgsize";
import { render, waitFor } from "@testing-library/react";

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
