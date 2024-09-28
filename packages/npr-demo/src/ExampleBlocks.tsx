import { CodeBlock } from "react-code-block";
import "./ExampleBlocks.css";
import { useState } from "react";

type TSXBlockProps = {
  title: string;
  code: string;
};

function CopyIcon({ onClick }: { onClick: () => void }) {
    return (
        <span className="icon tsx-copy-icon" onClick={onClick}>
            <i className="fa-solid fa-copy"/>
        </span>
    );
}

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}    


export function TSXBlock({ code, title }: TSXBlockProps) {
  

    return (
        <div className="card mt-5 mb-5 p-0">
            <div className="card-header">
                <p className="card-header-title">{title}</p>
            </div>
            <CopyIcon onClick={() => { copyToClipboard(code) }} />
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

type BashBlockProps = {
    allCodes: Record<string, string>;
};

export function BashBlock({ allCodes }: BashBlockProps) {
    const modes = Object.keys(allCodes);
    const [mode, setMode] = useState<string>(modes[0]);
    const code = allCodes[mode];

    return (
        <div className="card mt-5 mb-5 p-0">
            <div className="tabs">
                <ul>
                    {modes.map((m) => (
                        <li key={m} className={m === mode ? "is-active" : ""}>
                            <a onClick={() => setMode(m)}>{m}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <CopyIcon onClick={() => { copyToClipboard(code) }} />
            <CodeBlock language="bash" code={code}>
                <CodeBlock.Code className="bg-black">
                    <CodeBlock.LineContent>
                        <CodeBlock.Token />
                    </CodeBlock.LineContent>
                </CodeBlock.Code>
            </CodeBlock>
        </div>
    );
}