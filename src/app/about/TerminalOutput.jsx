import Link from "next/link";
import ProgressBar from "./ProgressBar";

function TerminalOutput({ output, disableAnimations }) {
  let image;
  let link;
  let progress;
  if (output.picture !== undefined && disableAnimations) {
    image = <img src={output.picture} alt={output.output} style={{ width: "300px", borderRadius: "8px", marginTop: "10px" }} />;
  }
  if (output.output === output.finalOutput && output.picture || output.link || output.progress) {
    if (output.progress) {
      progress = <ProgressBar 
        label={"Hi. Thanks for visiting my portfolio. Let me get things set up here..."} 
      />;
    }
    if (output.picture !== undefined) {
      image = <img src={output.picture} alt={output.output} style={{ width: "300px", borderRadius: "8px", marginTop: "10px" }} />;
    }
    if (output.link) {
      link = <Link href={output.link}>Click Here</Link>;
    }
  }
  return (
    <>
      {progress ? progress : null}
      {output.output ? <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output.output}</pre> : null}
      {link ? link : null}
      {image ? image : null}
    </>
  );
}

export default TerminalOutput;
