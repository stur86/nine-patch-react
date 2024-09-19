const basePath = import.meta.path.replace("index.ts", "");
const testFramePath = basePath + "testframe_20x10.png";

async function loadFileAsBytestring(path: string): Promise<string> {
    const file = Bun.file(path);
    const bytes = await file.bytes();
    let textstr = "";
    for (const byte of bytes) {
        textstr += ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }
    return textstr;
}

export const testFrameBytes = await loadFileAsBytestring(testFramePath);
export const testFrameURI = "data:image/png;base64," + testFrameBytes;