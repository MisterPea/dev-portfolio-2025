import "tsx/esm";
import * as sass from "sass";
import { renderToStaticMarkup } from "react-dom/server";
import fs from 'node:fs';
import path, { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

import createResponsiveImages from "./utils/imageProcessor";
import embedVideo from "./utils/videoProcessor";
import { JSX } from "react";

export default function (eleventyConfig: any) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);



    /* 
    This block and the following .beforeWatch handle 
    the reload of layouts when components are updated
    */
    eleventyConfig.addWatchTarget("./src/components");

    // Dependency map: key is the component, value is an array of layouts
    const dependencyMap: Record<string, string[]> = {};

    // Build the dependency map by scanning layouts
    async function buildDependencyMap() {
        const layoutFiles = await glob("./src/**/*.11ty.tsx");
        layoutFiles.forEach((layoutFile) => {
            const content = fs.readFileSync(layoutFile, "utf-8");
            const matches = content.match(/<([A-Za-z0-9_]+)\s*\/>/g); // Match JSX-style components
            if (matches) {
                matches.forEach((match: string) => {
                    const componentName = match.replace(/[<\/>\s]/g, ""); // Extract component name
                    const componentPath = `./src/components/${componentName}.tsx`; // Create component path
                    if (!dependencyMap[componentPath]) {
                        dependencyMap[componentPath] = [];
                    }
                    if (!dependencyMap[componentPath].includes(layoutFile)) {
                        dependencyMap[componentPath].push(`./${layoutFile}`);
                    }
                });
            }
        });
    }

    // Initial dependency map build
    buildDependencyMap();

    eleventyConfig.on("eleventy.beforeWatch", async (changedFiles: string[]) => {
        // For each changed file, check if it's a component
        for (const filePath of changedFiles) {
            if (dependencyMap[filePath]) {
                for (const layout of dependencyMap[filePath]) {
                    console.log(`Forcing rebuild of layout: ${layout}`);
                    fs.utimesSync(layout, new Date(), new Date()); // Update the timestamp to force rebuild
                }
            }
        }
    });

    // This takes a specified image from /raw_images, resizes it and
    // converts it to .webp
    eleventyConfig.addShortcode('getImageLinks', function (src: string, className: string, alt: string, imageWidth: string, placeholder?: any) {
        const output = createResponsiveImages(src, className, alt, imageWidth, placeholder);
        return output;
    });

    // Takes specified video from /raw_videos, copies it and returns appropriate tags with video embedded
    eleventyConfig.addShortcode('embedVideo', function (src: string, placeholder: JSX.Element, className?: string,) {
        const output = embedVideo(src, placeholder, className,);
        return output;
    });

    const slugLookup = {
        "word-salad-sifter": "Project : Word Salad Sifter Project",
    };

    eleventyConfig.addPassthroughCopy({ "src/fonts": "assets/fonts" });

    eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx");
    eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
        key: "11ty.js",
        compile: function () {
            return async function (data: any) {
                const title = slugLookup[data.page.fileSlug] || 'The Development and Design Portfolio of Perry Angelora';
                const content = await this.defaultRenderer(data);
                const result = renderToStaticMarkup(content);
                return `<!DOCTYPE html>\n
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>${title}</title>
                        <meta name="description" content="Perry's Portfolio - Developer / Designer / Technologist">
                        <meta name="google" content="nositelinkssearchbox">
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="preload" href="/assets/fonts/rubik-v28-latin-300.woff2" as="font" type="font/woff2" crossorigin="anonymous">
                        <link rel="preload" href="/assets/fonts/rubik-v28-latin-500.woff2" as="font" type="font/woff2" crossorigin="anonymous">
                        <link rel="preload" href="/assets/fonts/rubik-v28-latin-regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
                        <link rel="preload" href="/style/main.css" as="style">
                        <link rel="stylesheet" href="/style/fonts.css">
                        <link rel="stylesheet" href="/style/variables.css">
                        <link rel="stylesheet" href="/style/main.css">
                        <script defer>
                            (function () {
                                let prefersDarkMode = localStorage.getItem("prefersDarkMode");
                                if (!prefersDarkMode) {
                                    prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                                    localStorage.setItem("prefersDarkMode", prefersDarkMode);
                                }
                                document.querySelector('html').setAttribute("data-color-scheme", prefersDarkMode);
                            })();
                        </script>
                        <script src="/js/main.js" defer></script>
                    </head>
                    <body>
                    ${result}
                    </body>
                </html>`;
            };
        }
    });

    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: async function (inputContent: any, inputPath: any) {
            if (!inputPath.endsWith("main.scss") && !inputPath.endsWith('variables.scss') && !inputPath.endsWith('fonts.scss')) {
                return;
            }
            let parsedPath = path.parse(inputPath);
            let result = sass.compileString(inputContent, {
                loadPaths: [parsedPath.dir || '.', this.config.dir.includes],

            });
            this.addDependencies(inputPath, result.loadedUrls);
            return async (data: string) => result.css;
        },
    });

    const cssPath = join(__dirname, "src/style/inline.css");
    let inlineCSS = "";
    try {
        inlineCSS = readFileSync(cssPath, "utf-8");
    } catch (err) {
        console.warn("⚠️ Warning: inline.css not found or couldn't be read.");
    }

    // Transform HTML output to inject the CSS inside <body>
    eleventyConfig.addTransform("inject-inline-css", function (content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            return content.replace(
                /<body([^>]*)>/,
                `<body$1>\n<style>\n${inlineCSS}\n</style>\n`
            );
        }
        return content;
    });

    eleventyConfig.setServerOptions({
        showVersion: true,
        showAllHosts: true,
        enabled: true,
        domdiff: false,
    });

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    };
}