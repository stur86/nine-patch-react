import "./App.css";
import NinePatch from "nine-patch-react/src/npr";
import cobaltUrl from "./assets/cobalt.png";
// import copperUrl from "./assets/copper.png";
// import goldBlueUrl from "./assets/gold_and_blue.png";
import bubblegumUrl from "./assets/bubblegum.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import exampleStrip from "./assets/NinePatchExample.svg";
import { TSXBlock, BashBlock, TSXCompareBlock } from "./ExampleBlocks";

const basicExampleCode = `
import NinePatch from "nine-patch-react/src/npr";

...

<NinePatch src='your_frame.png'>
  Content here!
</NinePatch>`;

function ImgBlock({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
    className="container is-flex mt-5 mb-5"
    style={{ justifyContent: "center" }}
  >
    <img
      src={src}
      alt={alt}
      style={{ maxWidth: "600px" }}
    />
  </div>
  );
}

function App() {

  return (
    <>
      <nav className="navbar is-warning">
        <div className="navbar-brand is-inline-block">
          <span className="navbar-item has-text-weight-bold is-size-4">
            Nine Patch React
          </span>
        </div>
        <div className="navbar-end is-inline-block">
          <a
            className="navbar-item"
            href="https://github.com/stur86/nine-patch-react"
          >
            <span className="is-hidden-touch">Fork me on GitHub</span>
            <span className="icon is-size-4">
              <i className="fab fa-github"></i>
            </span>
          </a>
        </div>
      </nav>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <NinePatch
              src={cobaltUrl}
              scale={2}
              pixelPerfect={true}
              borderBottom="15px"
              borderTop="15px"
            >
              <div className="title" id="hero-title">
                Nine Patch React
              </div>
            </NinePatch>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="section">
          <p className="mb-5">
            Nine Patch React provides a simple React component,{" "}
            <code>&lt;NinePatch&gt;</code>, that you can use to put any content
            inside a box rendered from an image using the "nine-patch" technique.
            This technique allows you to create a scalable box with unique borders
            and corners from a base image.
          </p>
          <h2 className="subtitle">Contents</h2>
          <ol>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#installation">Installation and usage</a></li>
            <li><a href="#showcase">Showcase</a></li>
          </ol>
        </div>
        <div className="section" id="how-it-works">
          <h1 className="title">How it works</h1>
          Nine Patch React provides a simple React component,{" "}
          <code>&lt;NinePatch&gt;</code>, that you can use to put any content
          inside a box rendered from an image using the "nine patch" or "nine
          slice" technique. This technique allows you to create a scalable box
          with unique borders and corners from a base image.
          <ImgBlock src={exampleStrip} alt="Example strip" />
          Read more on the technique on
          <a href="https://en.wikipedia.org/wiki/9-slice_scaling">
            Wikipedia: 9-slice scaling
          </a>
          .
        </div>
        <div className="section" id="installation">
          <h1 className="title">Installation and usage</h1>
          To install simply run the following command in your project directory:
          <BashBlock allCodes={{ npm: "npm install --save nine-patch-react", bun: "bun add nine-patch-react", yarn: "yarn add nine-patch-react" }} />
          And you can use it simply like this:
          <TSXBlock title="simple.tsx" code={basicExampleCode} />
        </div>
        <div className="section" id="showcase">
          <h1 className="title">Showcase</h1>
          Here is an example of a simple pixel art frame:
          <ImgBlock src={cobaltUrl} alt="Cobalt frame" />
          You can use it to create a text box, like this:
          <TSXCompareBlock title="Simple text box">
            <NinePatch src={cobaltUrl} pixelPerfect={true}>
              <span className="pixel-text">Hello, world!</span>
            </NinePatch>
          </TSXCompareBlock>
          The text box size is controlled by its contents and the container it's in. For example:
          <TSXCompareBlock title="Smaller text box">
            <div style={{maxWidth: "500px"}}>
              <NinePatch src={cobaltUrl} pixelPerfect={true}>
                <span className="pixel-text">Hello, world!</span>
              </NinePatch>
            </div>
          </TSXCompareBlock>
          The border variables control how much of the frame is considered to constitute the "border" of the frame. Since
          the content is only inserted in the central cell of the nine patches, the border will also behave as a sort of padding.
          In order for the frame to visualize correctly the important thing is that the border here includes the actual edge, which
          is only 4 pixels wide. This gives us some leeway. Normally the border is set to 33% of the image size. It can be expressed
          in pixels or as a percentage of the image size. We can make it smaller to get a tighter fit:
          <TSXCompareBlock title="Compact text box">
            <div style={{maxWidth: "500px"}}>
              <NinePatch src={cobaltUrl} pixelPerfect={true} borderBottom="16px" borderLeft="16px" borderRight="16px" borderTop="16px">
                <span className="pixel-text">Hello, world!</span>
              </NinePatch>
            </div>
          </TSXCompareBlock>
          We can also use the <code>scale</code> option to make the image bigger and get a proper "pixel art" look. It's important to use
          the <code>pixelPerfect</code> option to get the best result and avoid unwanted smoothing. Here's an example:
          <TSXCompareBlock title="Thicker text box">
            <div style={{maxWidth: "500px"}}>
              <NinePatch src={cobaltUrl} pixelPerfect={true} scale={3} borderBottom="6px" borderLeft="6px" borderRight="6px" borderTop="6px">
                <span className="pixel-text">Hello, world!</span>
              </NinePatch>
            </div>
          </TSXCompareBlock>

          And of course, you can also use this to work with regular art.
          In that case you won't need the <code>pixelPerfect</code> option.
          <ImgBlock src={bubblegumUrl} alt="Bubblegum frame" />

          <TSXCompareBlock title="Cute text box">
            <NinePatch src={bubblegumUrl} scale={0.6} borderBottom="20%" borderLeft="30%" borderRight="30%" borderTop="20%">
              <span className="cute-text">Hello, world!</span>
            </NinePatch>
          </TSXCompareBlock>
          
        </div>
      </div>
    </>
  );
}

export default App;
