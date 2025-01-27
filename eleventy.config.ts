import "tsx/esm";
import * as sass from "sass";
import { renderToStaticMarkup } from "react-dom/server";
import fs from 'node:fs';
import { glob } from 'glob';


export default function (eleventyConfig: any) {
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

    eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx");
    eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
        key: "11ty.js",
        compile: function () {
            return async function (data: any) {
                const content = await this.defaultRenderer(data);
                const result = renderToStaticMarkup(content);
                return `<!DOCTYPE html>\n
                <html>
                    <head>
                        <link rel="stylesheet" href="/style/variables.css" />
                        <link rel="stylesheet" href="/style/main.css" />
                        <script type="text/javascript" src="/js/main.js"></script>
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
        compile: async function (inputContent: any) {
            let result = sass.compileString(inputContent);
            return async () => {
                return result.css;
            };
        }
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