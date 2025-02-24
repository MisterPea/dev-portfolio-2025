import path from "path";
import fs from "fs";
import { JSX } from "react/jsx-runtime";

/**
 * Function to integrate with 11ty shortcode
 * Shortcode must be used in base-level `.11ty.tsx` files. The output can then be passed via props to lower elements.
 * 
 * @param {string} videoPath The name of the video to implement - video should be located in `./raw_videos`
 * @param {string?} className Optional className to add on to `<figure>`
 * @param {JSX.Element} placeholder SVG-based placeholder element
 * @returns {JSX.Element} Element is `<figure>`
 */
export default function embedVideo(videoPath: string, Placeholder: any, className?: string): JSX.Element {

  // Output directory
  const outputDir = "dist/assets/videos";

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const inputPath = `./raw_videos/${videoPath}`;
  const outputPath = `./dist/assets/videos/${videoPath}`;


  fs.copyFile(inputPath, outputPath, (err) => {
    if (err) throw err;
    console.log('\u001b[' + 33 + 'm' + `Copied video: ${videoPath}` + '\u001b[0m');
  });

  return (
    <figure className={`project-video lazy${className ? " " + className : ""}`}>
      <video autoPlay muted loop playsInline preload="none">
        {/* <video autoPlay muted loop playsInline preload="auto"> */}
        <source data-src={`/assets/videos/${videoPath}`} type="video/mp4" />
      </video>
      <div className="placeholder">
        <Placeholder />
      </div>
    </figure>
  );
} 