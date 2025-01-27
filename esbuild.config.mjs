import * as esbuild from 'esbuild';

const isDev = process.env.NODE_ENV === "development";

async function build() {
  const context = await esbuild.context( {
    entryPoints: ["src/js/main.ts"],
    bundle: true,
    outdir: "dist/js", // Output directory
    minify: !isDev,
    sourcemap: isDev,
    target: "es2020",
    platform: "browser",
    logLevel: "info",
    outExtension: { ".js": ".js" }
  } );

  if ( isDev ) {
    console.log( "Starting watch mode..." );
    await context.watch();
  } else {
    console.log( "Building for production..." );
    await context.rebuild();
    context.dispose();
  }
}

// Run the build function
build().catch( ( e ) => {
  console.error( e );
  process.exit( 1 );
} );