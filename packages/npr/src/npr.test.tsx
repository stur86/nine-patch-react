import { expect, describe, it } from "bun:test";
import NinePatch from "./npr";
import { type NinePatchProps } from "./npr";
import { render, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { testFrameURI } from "./test_data";

describe("NinePatch", () => {
    function TestComponent(props: NinePatchProps) {
        return (
        <NinePatch {...props}>
            <div>Test</div>
        </NinePatch>
        );
    }
    
    it("should render the correct layout", async () => {
        
        // Render the component
        const { container } = render(<TestComponent src={testFrameURI} />);
        
        // Retrieve the div element
        const div = container.querySelector(".npr-grid-rect") as HTMLDivElement;
        expect(div).not.toBeNull();
        waitFor(() => {
            expect(div.style.display).toBe("grid");
        });
    });
});