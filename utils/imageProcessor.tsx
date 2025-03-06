import sharp from "sharp";
import path from "path";
import fs from "fs";
import sizeOf from 'image-size';
import { JSX } from "react/jsx-runtime";

// Output directory
const outputDir = "dist/assets/images";

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define breakpoints and multipliers
const breakpoints = [
  { name: "large", width: 1920 },
  { name: "medium", width: 1280 },
  { name: "small", width: 640 },
];

const multipliers = [1, 2, 3];

/**
 * Function to integrate with 11ty shortcode.
 * Shortcode must be used in base-level `.11ty.tsx` files. The output can then be passed via props to lower elements.
 * 
 * @param {string} imagePath The name of the image to implement - images should be located in `./raw_images`
 * @param {string} className Optional class names to append to the current - included class name is `img-main`
 * @param {string} alt Alternate image text
 * @param {string} imageWidth How much of the screen width will the image occupy. Default is `100vw`
 * @returns {JSX.Element} Element is `<picture>`
 */
export default function createResponsiveImages(imagePath: string, className: string, alt: string, imageWidth: string = '100vw', Placeholder: any): JSX.Element {
  const { height, width } = sizeOf(`./raw_images/${imagePath}`);
  const multiple = height / width;
  const w = breakpoints[0].width;
  const h = Math.round(w * multiple);

  const gen = generateResponsiveImages(imagePath);
  let result = gen.next();
  while (!result.done) {
    result = gen.next();
  }

  const htmlTags = _createImageTags(result.value, className, alt, imageWidth, h, w);
  return htmlTags;

  function _createImageTags(images: string[][], className = "", alt = "", sizes = "100vw", height: number, width: number) {
    return (
      <picture className={`img-main lazy${className ? ' ' + className : ''}`}>
        {breakpoints.map((breakpoint, i) => (
          <source key={i} sizes={sizes} data-srcset={images[i].join(", ")} media={`(min-width: ${breakpoint.width}px)`} />
        ))}
        <img className="img-tag" src={null} data-src={images[0][0].split(" ")[0]} alt={alt} data-width={`${width}`} data-height={`${height}`} />
        {Placeholder && <div className="placeholder"><Placeholder /></div>}
      </picture>
    );
  };

  function generateResponsiveImages(imagePath: string) {
    const inputPath = `./raw_images/${imagePath}`;
    const filename = path.parse(imagePath).name;
    const ext = '.webp';
    const outputImages: string[][] = [];

    function* iterate() {
      try {
        for (const breakpoint of breakpoints) {
          const sources: string[] = [];
          outputImages.push(sources);

          for (const multiplier of multipliers) {
            const width = breakpoint.width * multiplier;
            const outputFilename = `${filename}-${breakpoint.name}-${multiplier}x${ext}`;
            const outputPath = path.join(outputDir, outputFilename);
            sources.push(`/assets/images/${outputFilename} ${multiplier}x`);

            yield sharp(inputPath)
              .resize(width)
              .webp()
              .toFile(outputPath, async (err, info) => {
                if (err) {
                  console.error("Error processing image:", err);
                }
              });
          }
        }
      } finally {
        console.log('\u001b[' + 34 + 'm' + `Image tags created for: ${filename}${ext}` + '\u001b[0m');
        return outputImages;
      }
    }
    return iterate();
  }
}




