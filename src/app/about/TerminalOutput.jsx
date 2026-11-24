import Image from "next/image";
import Link from "next/link";
import ProgressBar from "./ProgressBar";
import { getLocale } from "../../config/locale";

function TerminalOutput({ output, disableAnimations }) {
  const { about } = getLocale();
  const { progressLabel, linkText } = about.terminal;
  let image;
  let link;
  let progress;
  if (output.picture !== undefined && disableAnimations) {
    image = (
      <Image
        src={output.picture}
        alt={output.output}
        width={300}
        height={300}
        style={{ width: "300px", height: "auto", borderRadius: "8px", marginTop: "10px" }}
      />
    );
  }
  if (output.output === output.finalOutput && output.picture || output.link || output.progress) {
    if (output.progress) {
      progress = <ProgressBar 
        label={progressLabel} 
      />;
    }
    if (output.picture !== undefined) {
      image = (
        <Image
          src={output.picture}
          alt={output.output}
          width={300}
          height={300}
          style={{ width: "300px", height: "auto", borderRadius: "8px", marginTop: "10px" }}
        />
      );
    }
    if (output.link) {
      link = <Link href={output.link}>{linkText}</Link>;
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
