const pagesUrl = process.env.GITHUB_PAGES_URL;
const basePath = pagesUrl ? new URL(pagesUrl).pathname.replace(/\/$/, "") : "";

/** @type {import("next").NextConfig} */
const config = {
  ...(pagesUrl && { output: "export", distDir: "out" }),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { qualities: [65, 75], unoptimized: Boolean(pagesUrl) },
};

export default config;
