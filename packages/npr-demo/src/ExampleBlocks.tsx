import { CodeBlock } from "react-code-block";
import "./ExampleBlocks.css";

type TSXBlockProps = {
  code: string;
};

export function TSXBlock({ code }: TSXBlockProps) {
  
    function copyToClipboard() {
        navigator.clipboard.writeText(code);
    }    

    return (
        <div className="card mt-5 mb-5">
            <span className="icon tsx-copy-icon" onClick={copyToClipboard}><i className="fa-solid fa-copy"/></span>
            <CodeBlock language="tsx" code={code}>
            <CodeBlock.Code className="bg-black">
                <CodeBlock.LineContent>
                <CodeBlock.Token />
                </CodeBlock.LineContent>
            </CodeBlock.Code>
            </CodeBlock>
        </div>
    );
}
