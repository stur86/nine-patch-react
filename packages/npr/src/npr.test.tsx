import { expect, describe, it } from "bun:test";
import NinePatch from "./npr";
import { type NinePatchProps } from "./npr";
import { render, waitFor } from "@testing-library/react";
import { testFrameURI } from "./test_data";
import { GridStyleCalculator } from "./calc";

describe("NinePatch", () => {
    function TestComponent(props: NinePatchProps) {
        return (
            <NinePatch {...props}>
                <div style={{width: "200px", height: "100px"}} id="test-content">Test</div>
            </NinePatch>
        );
    }
    
    it("should render the correct layout", async () => {
        
        // Render the component
        const { container } = render(<TestComponent src={testFrameURI} 
            borderTop="5px" 
            borderBottom="5px"
            borderLeft="5px"
            borderRight="5px"
        />);

        // Retrieve the div element
        const div = container.querySelector(".npr-grid-rect") as HTMLDivElement;
        expect(div).not.toBeNull();
        await waitFor(() => {
            expect(div.style.display).toBe("grid");

            // It should have nine children
            const children = div.querySelectorAll(".npr-grid-cell");
            expect(children.length).toBe(9);

            // The content should be in the center
            const content = children[4].querySelector("#test-content");
            expect(content).not.toBeNull();
            expect(content?.textContent).toBe("Test");

            // All other children should be empty
            for (let i = 0; i < 9; i++) {
                if (i !== 4) {
                    const child = children[i];
                    expect(child.innerHTML).toBe("");
                }
            }
        });
    });
});