const pagesUrl = process.env.GITHUB_PAGES_URL;
const basePath = pagesUrl ? new URL(pagesUrl).pathname.replace(/\/$/, "") : "";

/** @type {import("next").NextConfig} */
const config = {
  ...(pagesUrl && { output: "export", distDir: "out" }),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    qualities: [65, 75],
    ...(pagesUrl && {
      loader: "custom",
      loaderFile: "./app/static-image-loader.ts",
      deviceSizes: [640, 828, 1080, 1536],
      imageSizes: [256, 384],
    }),
  },
};

export default config;
