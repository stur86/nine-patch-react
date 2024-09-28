import "./App.css";
import NinePatch from "nine-patch-react/src/npr";
import cobaltUrl from "./assets/cobalt.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import exampleStrip from "./assets/NinePatchExample.svg";
import { TSXBlock } from "./ExampleBlocks";

const basicExampleCode = `
import NinePatch from "nine-patch-react/src/npr";

...

<NinePatch src='your_frame.png'>
  Content here!
</NinePatch>`;

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
          Nine Patch React provides a simple React component,{" "}
          <code>&lt;NinePatch&gt;</code>, that you can use to put any content
          inside a box rendered from an image using the "nine-patch" technique.
          This technique allows you to create a scalable box with unique borders
          and corners from a base image.
        </div>
        <div className="section">
          <h1 className="title">How it works</h1>
          Nine Patch React provides a simple React component,{" "}
          <code>&lt;NinePatch&gt;</code>, that you can use to put any content
          inside a box rendered from an image using the "nine patch" or "nine
          slice" technique. This technique allows you to create a scalable box
          with unique borders and corners from a base image.
          <div
            className="container is-flex mt-5 mb-5"
            style={{ justifyContent: "center" }}
          >
            <img
              src={exampleStrip}
              alt="Example strip"
              style={{ maxWidth: "600px" }}
            />
          </div>
          Read more on the technique on{" "}
          <a href="https://en.wikipedia.org/wiki/9-slice_scaling">
            Wikipedia: 9-slice scaling
          </a>
          .
        </div>
        <div className="section">
          <h1 className="title">Installation and usage</h1>
          To install simply run the following command in your project directory:
          {/* <CodeBlock language='bash' code={"npm install --save nine-patch-react"} /> */}
          or if you're using <a href="https://bun.sh/">Bun</a>:
          {/* <CodeBlock language='bash' code={"bun add nine-patch-react"} /> */}
          And you can use it simply like this:
          <TSXBlock code={basicExampleCode} />
        </div>
      </div>
    </>
  );
}

export default App;
