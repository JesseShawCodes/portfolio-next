import Link from "next/link";

function TerminalOutput({ output }) {
  let image;
  let link;
  if (output.output === output.finalOutput && output.picture || output.link) {
    if (output.picture) {
      image = <img src={output.picture} alt="Output" style={{ width: "400px", borderRadius: "8px", marginTop: "10px" }} />;
    }
    if (output.link) {
      link = <Link href={output.link}>Click Here</Link>;
    }
  }
  return (
    <>
      {output.output ? <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output.output}</pre> : null}
      {link ? link : null}
      {image ? image : null}
    </>
  );
}

export default TerminalOutput;
